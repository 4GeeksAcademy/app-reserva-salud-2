"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from datetime import datetime
from dotenv import load_dotenv
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from sqlalchemy import func
from api.models import Appointment, GenderEnum, Speciality, db, User, Professional, Comment, Availability, State, City,Data_Pay_Mp
from api.utils import generate_sitemap, APIException, generate_recurrent_dates
from flask_cors import CORS
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import os

from flask_mail import Mail, Message

import cloudinary
import cloudinary.uploader
import cloudinary.api
import os

# Cloudinary configuration      
cloudinary.config( 
    cloud_name = os.getenv("CLOUDINARY_NAME"),
    api_key = os.getenv("CLOUDINARY_API_KEY"),
    api_secret = os.getenv("CLOUDINARY_SECRET"),
    secure=True
)
import mercadopago
api = Blueprint('api', __name__)
###library para generar un uuid v4 ###
import uuid
import os
import requests

# Allow CORS requests to this API
CORS(api)
### genero String unico para el  ###
idempotency_key = str(uuid.uuid4())
##endpoint prueba pago mp###
access_token = os.getenv("ACCESS_TOKEN_MP")
sdk = mercadopago.SDK(access_token)

@api.route('/create_preference', methods=['POST'])
def create_preference():
  preference_data = request.json

  preference_response = sdk.preference().create(preference_data)
  preference = preference_response["response"]
  print(preference)
  
  return jsonify(preference), preference_response["status"]

@api.route('/get_preference/<preference_id>', methods=['GET'])
def get_preference(preference_id):
  preference_response = sdk.preference().get(preference_id)
  preference = preference_response["response"]
  
  return jsonify(preference), preference_response["status"]

@api.route('/get_payment/<payment_id>', methods=['GET'])
def get_payment(payment_id):
  payment_response = sdk.payment().get(payment_id)
  payment = payment_response["response"]
  
  return jsonify(payment), payment_response["status"]

@api.route('/process_payment', methods=['POST'])
def create_payment():
    # print(request.json)
    # Generar una clave del tipo string única para x-idempotency-key
    idempotency_key = str(uuid.uuid4())
   
    request_options = mercadopago.config.RequestOptions()
    request_options.custom_headers = {
      'x-idempotency-key': idempotency_key
    }

    # Extraer los datos de la solicitud
    payer=request.json.get("payer")
    payment_data = {
      "transaction_amount": float(request.json.get("transaction_amount")),
      "token": request.json.get("token"),
      "description": request.json.get("description"),
      "installments": int(request.json.get("installments")),
      "payment_method_id": request.json.get("payment_method_id"),
      "payer": {
        "email": payer["email"],
        "identification": {
          "type": payer["identification"]["type"], 
          "number": payer["identification"]["number"]
        },
        "first_name": request.json.get("name")
      }
    }
    print("mostrando datos a enviar a mp:",payment_data)
    try:
      # Procesar el pago con Mercado Pago
      payment_response = sdk.payment().create(payment_data, request_options)
      payment = payment_response.get("response")
      print(payment)
      return jsonify(payment), 200
    except Exception as e:
      print(f"Error al procesar el pago: {e}")
      return jsonify({"error": str(e)}), 500
#enviar pago procesado correctamenta a bd
@api.route('/data_pay_mp', methods=['POST'])
def save_payment_mp():
  try:
    # Obtener los datos del cuerpo de la solicitud http
    data = request.json

    authorization_code = data.get('authorization_code')
    date_approved = data.get('date_approved')
    date_created = data.get('date_created')
    id_payment = data.get('id')
    transaction_amount = data.get('transaction_amount')
    installments = data.get('installments')
    status = data.get('status')
    metadata = data.get('metadata')

    # Accede al email dentro de 'payer'
    email_client = data.get('payer').get('email')

    # Crear una nueva instancia del modelo Data_Pay_Mp con los datos recibidos desde el front
    # print("mostrando:", professional_id)
    payment = Data_Pay_Mp(
      professional_id=metadata.get("appointment").get("professional").get("id"),
      authorization_code=authorization_code,
      date_approved=date_approved,
      date_created=date_created,
      id_payment=id_payment,
      transaction_amount=transaction_amount,
      installments=installments,
      status=status,
      email_client=email_client
    )
    
    # Crear una nueva instancia del modelo Appointment con los datos recibidos desde el front
    new_appointment = Appointment(
      user_id=metadata.get("user").get("id"),
      availability_id=metadata.get("appointment").get("availability_id"),
      professional_id=metadata.get("appointment").get("professional").get("id"),
      date=metadata.get("appointment").get("date"),
      is_confirmed=True,
      is_done=False,
      type=metadata.get("appointment").get("reservation_type")
    )
    
    payment.appointment = new_appointment
    
    # Deshabilitar la disponibilidad tomada
    availability = Availability.query.get(metadata.get("appointment").get("availability_id"))
    availability.is_available = False

    # Guardar los datos en la base de datos
    db.session.add(payment)
    db.session.commit()
    
    return jsonify({"message": "Payment data saved successfully", "payment": payment.serialize()}), 201
  except Exception as e:
    return jsonify({"error": str(e)}), 500
      
@api.route('/refund_payment', methods=['POST'])
def refund_payment():
  try:
    # Obtener usuario autenticado
    payment_id = request.json.get('payment_id')
    
    payment = Data_Pay_Mp.query.filter_by(id_payment=payment_id).first()
    if not payment:
      raise APIException("Pago no encontrado", status_code=404)
    
    # Obtener los datos del pago
    payment_response = sdk.payment().get(payment_id)
    
    # Obtener la cantidad total del pago
    total_amount = payment_response.get("response").get('transaction_amount')

    # Creando el reembolso
    refund_response = sdk.refund().create(payment_id, { "amount": total_amount })
    
    # Verificar si el reembolso fue exitoso
    if refund_response.get("response").get("status") == "approved":
      # Habilitar la disponibilidad tomada
      availability = Availability.query.get(payment.appointment.availability.id)
      availability.is_available = True
      
      # Eliminar la reserva
      db.session.delete(payment.appointment)
      db.session.delete(payment)
      db.session.commit()
      
    # Devolver la respuesta del reembolso
    return jsonify(refund_response.get("response")), refund_response["status"]
  except Exception as e:
    print(str(e))
    return jsonify({"error": str(e)}), 500
       
@api.route('/payments/<id_payment>', methods=['GET'])
def get_payment_client(id_payment):
    try:
        # Utiliza el SDK para obtener la información del pago
        payment_response = sdk.payment().get(id_payment)
        
        # Verifica si la respuesta contiene el pago
        if payment_response["status"] == 200:
            payment_data = payment_response["response"]
            return jsonify(payment_data), 200
        else:
            return jsonify({"error": "No se pudo obtener el pago"}), payment_response["status"]

    except Exception as e:
        print(str(e))
        return jsonify({"error": str(e)}), 500

@api.route('/upload', methods=['POST'])
def upload_file():
  if 'file' not in request.files:
      raise APIException("No file part", status_code=400)
  
  file = request.files['file']
  
  if file:
    try:
      result = cloudinary.uploader.upload(file)
      return jsonify({ 'url': result['secure_url'] }), 200
    except Exception as e:
      print(e)
      raise APIException("Ocurrió un error al subir el archivo", status_code=400)
  else:
      raise APIException("No hay archivo seleccionado", status_code=400)


@api.route('/users', methods=['GET', 'POST'])
def handle_users():
    if request.method == 'POST':
        request_body = request.json
        
        first_name = request_body.get("first_name")
        last_name = request_body.get("last_name")
        email = request_body.get("email")
        password = request_body.get("password")
        birth_date = request_body.get("birth_date")
        state_id = request_body.get("state_id")
        is_active = request_body.get("is_active")
        
        # Check if required fields are not empty
        if not email or not password:
            raise APIException("Faltan campos requeridos", status_code=400)
        
        if User.query.filter_by(email=email).first() or Professional.query.filter_by(email=email).first():
            raise APIException("Este correo ya lo está usando un profesional o un usuario", status_code=400)
        
        # Create user in the database
        try:
          new_user = User(first_name=first_name, last_name=last_name, email=email, password=password, birth_date=birth_date, state_id=state_id, is_active=is_active)
          db.session.add(new_user)
          db.session.commit()
        except Exception as e:
          raise APIException("Ha ocurrido un error al intentar crear el usuario", status_code=400)
          
        return jsonify({ "message": "Usuario creado satisfactoriamente", "user_id": new_user.id }), 201
    elif request.method == 'GET':
        users = User.query.all()
        users = list(map(lambda x: x.serialize(), users))
        return jsonify(users), 200
      
@api.route('/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_user(user_id):
  if request.method == 'GET':
    user = User.query.get(user_id)
    if user is None:
        raise APIException("Usuario no encontrado", status_code=404)
    return jsonify(user.serialize()), 200
  elif request.method == 'PUT':
    request_body = request.json
    
    user = User.query.get(user_id)
    
    if user is None:
        raise APIException("Usuario no encontrado", status_code=404)
    
    user.first_name = request_body.get("first_name", user.first_name)
    user.last_name = request_body.get("last_name", user.last_name)
    user.email = request_body.get("email", user.email)
    if request_body.get("password"):
      user.password = generate_password_hash(request_body.get("password")).decode('utf-8')
    user.birth_date = request_body.get("birth_date", user.birth_date)
    user.state_id = request_body.get("state_id", user.state_id)
    user.city_id = request_body.get("city_id", user.city_id)
    user.is_active = request_body.get("is_active", user.is_active)
    
    db.session.commit()
    
    return jsonify({ "message": "Usuario actualizado satisfactoriamente" }), 200
  elif request.method == 'DELETE':
    user = User.query.get(user_id)
    
    if user is None:
        raise APIException("User not found", status_code=404)
    
    db.session.delete(user)
    db.session.commit()
    
    return jsonify({ "message": "Usuario eliminado stisfactoriamente" }), 200

# Create a new user appointment
@api.route('/users/appointments', methods=['GET', 'POST'])
@jwt_required()
def handle_user_appointments():
  current_user_id = get_jwt_identity()
  if request.method == 'POST':
    request_body = request.json
    
    availability_id = request_body.get("availability_id")
    date = request_body.get("date")
    is_confirmed = request_body.get("is_confirmed")
    is_done = request_body.get("is_done")
    type = request_body.get("type")
    
    if not availability_id or not date:
      raise APIException("Faltan campos requeridos", status_code=400)
   
    if type and type not in ['remote', 'presential']:
      raise APIException("Valor incorrecto", status_code=400)
    
    # Validate if availability exists
    availability = Availability.query.get(availability_id)
    if not availability:
      raise APIException("Disponibilidad no encontrada", status_code=404)
    
    # Verify if availability is already booked
    if not availability.is_available:
        raise APIException("Esta disponibilidad ya fue tomada", status_code=400)
        
    data_pay_mp = Data_Pay_Mp.query.filter_by(appointment_id=availability_id).first()
        
    # Create appointment in the database
    try:
      new_appointment = Appointment(
        user_id=current_user_id,
        professional_id=availability.professional_id,
        availability_id=availability_id,
        date=date,
        is_confirmed=is_confirmed,
        is_done=is_done,
        type=type,
        
      )
      db.session.add(new_appointment)
      db.session.commit()
    except Exception as e:
      raise APIException(f"Ha ocurrido un error mientras intentabamos crear la reserva {e}", status_code=400)
    
    availability.is_available = False
    db.session.commit()
    
    return jsonify({ "message": "Reserva creada satisfactoriamente" }), 201
  elif request.method == 'GET':
    user = User.query.get(current_user_id)
    return jsonify(user.get_appointments()), 200
 
@api.route('/users/<int:user_id>/appointments/<int:appointment_id>', methods=['GET', 'DELETE'])
def handle_user_appointment(user_id, appointment_id):
  if request.method == 'GET':
    appointment = Appointment.query.filter_by(user_id=user_id, id=appointment_id).first()
    if appointment is None:
      raise APIException("La reserva del usuario no se encuentra", status_code=404)
    return jsonify(appointment.serialize()), 200
  elif request.method == 'DELETE':
    appointment = Appointment.query.filter_by(user_id=user_id, id=appointment_id).first()
    
    if appointment is None:
      raise APIException("No se encuentra esta reserva", status_code=404)
    
    availability = Availability.query.get(appointment.availability_id)
    
    availability.is_available = True
    
    db.session.delete(appointment)
    db.session.commit()
    
    return jsonify({ "message": "La reserva se eliminó correctamente" }), 200

@api.route('/professionals', methods=['GET', 'POST'])
def handle_professionals():
    if request.method == 'POST':
      request_body = request.json
        
      first_name = request_body.get("first_name")
      last_name = request_body.get("last_name")
      email = request_body.get("email")
      password = request_body.get("password")
      birth_date = request_body.get("birth_date")
      gender = request_body.get("gender")
      certificate = request_body.get("certificate")
      profile_picture = request_body.get("profile_picture")
      telephone = request_body.get("telephone")
      is_active = request_body.get("is_active")
      is_validated = request_body.get("is_validated")
      city_id = request_body.get("state")
      
      # Check if required fields are not empty
      if not email or not password:
        raise APIException("Faltan campos requeridos", status_code=400)
        
      if Professional.query.filter_by(email=email).first() or User.query.filter_by(email=email).first():
        raise APIException("El email ya está registrado", status_code=400)
        
      # Create professional in the database
      try:
        new_professional = Professional(
          first_name=first_name,
          last_name=last_name,
          email=email,
          password=password,
          birth_date=birth_date,
          gender=gender,
          certificate=certificate,
          profile_picture=profile_picture,
          telephone=telephone,
          is_active=is_active,
          is_validated=is_validated,
          city_id=city_id
        )
        
        db.session.add(new_professional)
        db.session.commit()
      except Exception as e:
        raise APIException("Ha ocurrido un error mientras intentabamos crear el profesional", status_code=400)
          
      return jsonify({ "message": "Profesional creado satisfactoriamente", "professional_id": new_professional.id }), 201
    elif request.method == 'GET':
      professionals = Professional.query.all()
      professionals = list(map(lambda x: x.serialize(), professionals))
      return jsonify(professionals), 200
    
@api.route('/professionals/<int:professional_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_professional(professional_id):
  if request.method == 'GET':
    professional = Professional.query.get(professional_id)
    if professional is None:
      raise APIException("Profesional no encontrado", status_code=404)
    return jsonify(professional.serialize()), 200
  elif request.method == 'PUT':
    request_body = request.json
    
    professional = Professional.query.get(professional_id)
    
    if professional is None:
      raise APIException("Profesional no encontrado", status_code=404)
    
    speciality = Speciality.query.get(request_body.get("speciality_id"))
    if speciality is None:
      raise APIException("Especialidad no encontrada", status_code=404)
    professional.specialities.append(speciality)
    
    professional.first_name = request_body.get("first_name", professional.first_name)
    professional.last_name = request_body.get("last_name", professional.last_name)
    professional.email = request_body.get("email", professional.email)
    if request_body.get("password"):
      professional.password = generate_password_hash(request_body.get("password")).decode('utf-8')
    professional.birth_date = request_body.get("birth_date", professional.birth_date)
    
    gender = request_body.get("gender", professional.gender)
    if gender and gender not in GenderEnum.__members__:
      raise APIException("Género incorrecto", status_code=400)
    professional.gender = GenderEnum[gender] if gender else professional.gender
    
    professional.gender = request_body.get("gender", professional.gender)
    professional.telephone = request_body.get("telephone", professional.telephone)
    professional.is_active = request_body.get("is_active", professional.is_active)
    professional.is_validated = request_body.get("is_validated", professional.is_validated)
    professional.city_id = request_body.get("city_id", professional.city_id)
    professional.profile_picture = request_body.get("profile_picture", professional.profile_picture)
    
    db.session.commit()
    
    return jsonify({ "message": "El profesional ha sido actualizado correctamente" }), 200
  elif request.method == 'DELETE':
    professional = Professional.query.get(professional_id)
    
    if professional is None:
      raise APIException("Professional not found", status_code=404)
    
    db.session.delete(professional)
    db.session.commit()
    
    return jsonify({ "message": "El profesional fue eliminado correctamente" }), 200

@api.route('/professionals/<int:professional_id>/availabilities', methods=['GET'])
def get_professional_appointments(professional_id):
  professional = Professional.query.get(professional_id)
  return jsonify(professional.serialize_availabilities()), 200

@api.route('/professionals/availabilities', methods=['GET', 'POST'])
@jwt_required()
def handle_professional_availabilities():
  current_professional_id = get_jwt_identity()
  if request.method == 'POST':
    request_body = request.json
    
    date = request_body.get("date")
    start_time = request_body.get("start_time")
    end_time = request_body.get("end_time")
    weekly = request_body.get("weekly")
    is_remote = request_body.get("is_remote", False)
    is_presential = request_body.get("is_presential", False)
    
    # Check if one of is_remote or is_presential is true
    if not is_remote and not is_presential:
      raise APIException("Alguno de 'is_remote' o 'is_presential' debe ser verdadero", status_code=400)

    # Check if required fields are not empty
    if not date or not start_time or not end_time:
      raise APIException("Faltan campos requeridos", status_code=400)
    
    # Check if date is in the correct format
    try:
      start_time = datetime.strptime(start_time, "%H:%M:%S").time()
      end_time = datetime.strptime(end_time, "%H:%M:%S").time()
    except Exception as e:
      raise APIException("Formato de tiempo incorrecto", status_code=400)
    
    # Check if start_time is less than end_time
    if end_time <= start_time:
      raise APIException("La hora de fin debe ser mayor que la hora de comienzo", status_code=400)
    
    # Check if availability already exists
    exist_availability = Availability.query.filter_by(professional_id=current_professional_id, date=date, start_time=start_time, end_time=end_time).first()
    
    if exist_availability:
      raise APIException("Disponibilidad ya existe", status_code=400)
    
    # Check if availability overlaps with an existing one
    overlapping_availability = Availability.query.filter(
      Availability.date == date,
      Availability.professional_id == current_professional_id,
      ((Availability.start_time <= start_time) & (Availability.end_time > start_time)) |
      ((Availability.start_time < end_time) & (Availability.end_time >= end_time)) |
      ((Availability.start_time >= start_time) & (Availability.end_time <= end_time))
    ).first()
    
    if overlapping_availability:
      raise APIException("La disponibilidad se sobrepone sobre otras", status_code=400)
    
    # Create availability in the database
    try:
      new_availability = Availability(
        professional_id=current_professional_id,
        date=date,
        start_time=start_time,
        end_time=end_time,
        weekly=weekly,
        is_remote=is_remote,
        is_presential=is_presential
      )
      
      print(new_availability.weekly)
      
      if new_availability.weekly:
        print("Generando fechas recurrentes")
        new_availability.generate_recurrent_availability()
      
      db.session.add(new_availability)
      db.session.commit()
    except Exception as e:
      raise APIException(f"Ha ocurrido un error mientras intentamos crear la disponibilidad {e}", status_code=400)
    
    return jsonify({ "message": "Disponibilidad creada correctamente" }), 201
  elif request.method == 'GET':
    availabilities = Availability.query.filter_by(professional_id=current_professional_id).all()
    availabilities = list(map(lambda x: x.serialize(), availabilities))
    return jsonify({ "availabilities": availabilities }), 200
  
@api.route('/professionals/<int:professional_id>/availabilities/<int:availability_id>', methods=['GET', 'DELETE'])
def handle_professional_availability(professional_id, availability_id):
  if request.method == 'GET':
    availability = Availability.query.filter_by(professional_id=professional_id, id=availability_id).first()
    if availability is None:
      raise APIException("No se encuentra la disponibilidad para este profesional", status_code=404)
    return jsonify(availability.serialize()), 200
  elif request.method == 'DELETE':
    availability = Availability.query.filter_by(professional_id=professional_id, id=availability_id).first()
    
    if availability is None:
      raise APIException("No se encuentra la disponibilidad para este profesional", status_code=404)
    
    db.session.delete(availability)
    db.session.commit()
    
    return jsonify({ "message": "Disponibilidad eliminada correctamente" }), 200
  
@api.route('/professionals/appointments', methods=['GET', 'DELETE'])
@jwt_required()
def handle_professional_appointments():
  current_professional_id = get_jwt_identity()

  professional = Professional.query.get(current_professional_id)
  if professional is None:
    raise APIException("Profesional no encontrado", status_code=404)
  
  appointments = Appointment.query.filter_by(professional_id=current_professional_id).all()
  if appointments is None:
    raise APIException("Reserva del profesional no encontrada", status_code=404)
  
  appointments = list(map(lambda x: x.serialize(), appointments))
  return jsonify(appointments), 200
    
    
@api.route('/professionals/appointments/<int:appointment_id>', methods=['DELETE'])
@jwt_required()
def delete_professional_appointment(appointment_id):
  current_professional_id = get_jwt_identity()
  
  appointment = Appointment.query.filter_by(professional_id=current_professional_id, id=appointment_id).first()
  
  if appointment is None:
    raise APIException("La reserva del profesional no se encuentra", status_code=404)
  
  availability = Availability.query.get(appointment.availability_id)
  
  availability.is_available = True
  
  db.session.delete(appointment)
  db.session.commit()
  
  return jsonify({ "message": "Reserva eliminada correctamente" }), 200

@api.route('/comments', methods=['GET', 'POST'])
def handle_comments():
  if request.method == 'POST':
    request_body = request.json
    
    user_id = request_body.get("user_id")
    professional_id = request_body.get("professional_id")
    comment = request_body.get("comment")
    score = request_body.get("score")
    
    if not user_id or not professional_id or not score:
      raise APIException("Faltan campos requeridos", status_code=400)
    
    new_comment = Comment(user_id=user_id, professional_id=professional_id, comment=comment, score=score)
    db.session.add(new_comment)
    db.session.commit()
    
    return jsonify({ "message": "Comentario creado satisfactoriamente" }), 201
  elif request.method == 'GET':
    comments = Comment.query.all()
    comments = list(map(lambda x: x.serialize(), comments))
    return jsonify(comments), 200

@api.route('/comments/<int:comment_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_comment(comment_id):
  if request.method == 'GET':
    comment = Comment.query.get(comment_id)
    if comment is None:
      raise APIException("Comentario no encontrado", status_code=404)
    return jsonify(comment.serialize()), 200
  elif request.method == 'PUT':
    request_body = request.json
    
    comment = Comment.query.get(comment_id)
    
    if comment is None:
      raise APIException("Comentario no encontrado", status_code=404)
    
    comment.comment = request_body.get("comment", comment.comment)
    comment.score = request_body.get("score", comment.score)
    
    db.session.commit()
    
    return jsonify({ "message": "Comentario editado correctamente" }), 200
  elif request.method == 'DELETE':
    comment = Comment.query.get(comment_id)
    
    if comment is None:
      raise APIException("Comentario no encontrado", status_code=404)
    
    db.session.delete(comment)
    db.session.commit()
    
    return jsonify({ "message": "Comentario eliminado correctamente" }), 200

##order professional by score comments
@api.route('/get_professionals_comments_score', methods=['GET'])
def get_professionals_ordered_by_avg_score():
    try:
        # Realiza una consulta que agrupe los comentarios por profesional y calcule el promedio de los scores
        results = (
            db.session.query(
                Professional.id.label('professional_id'),
                func.avg(Comment.score).label('average_score'),
                Professional.first_name,
                Professional.last_name,
                Professional.email,
                Professional.profile_picture,
                City.name.label('city_name')
            )
            .join(Comment, Comment.professional_id == Professional.id)  # Join con la tabla de comentarios
            .join(City, City.id == Professional.city_id)  # Join con la tabla de ciudades
            .group_by(Professional.id, Professional.first_name, Professional.last_name, Professional.email, Professional.profile_picture, City.name)
            .order_by(func.avg(Comment.score).desc())  # Ordena los resultados por promedio de score de mayor a menor
            .all()
        )

        # Convertir los resultados en un array de diccionarios con los datos deseados
        professionals_data = [
            {
                "professional_id": r.professional_id,
                "average_score": round(r.average_score, 2),  # Redondear el promedio a dos decimales
                "first_name": r.first_name,
                "last_name": r.last_name,
                "email": r.email,
                "profile_picture": r.profile_picture,
                "city_name": r.city_name
            }
            for r in results
        ]
        print(professionals_data)
        # Devolver los datos como un JSON
        return jsonify(professionals_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

##order professional by score comments
@api.route('/get_professionals_comments_score', methods=['GET'])
def get_professionals_ordered_by_avg_score():
    try:
        # Realiza una consulta que agrupe los comentarios por profesional y calcule el promedio de los scores
        results = (
            db.session.query(
                Professional.id.label('professional_id'),
                func.avg(Comment.score).label('average_score'),
                Professional.first_name,
                Professional.last_name,
                Professional.email,
                Professional.profile_picture,
                City.name.label('city_name')
            )
            .join(Comment, Comment.professional_id == Professional.id)  # Join con la tabla de comentarios
            .join(City, City.id == Professional.city_id)  # Join con la tabla de ciudades
            .group_by(Professional.id, Professional.first_name, Professional.last_name, Professional.email, Professional.profile_picture, City.name)
            .order_by(func.avg(Comment.score).desc())  # Ordena los resultados por promedio de score de mayor a menor
            .all()
        )

        # Convertir los resultados en un array de diccionarios con los datos deseados
        professionals_data = [
            {
                "professional_id": r.professional_id,
                "average_score": round(r.average_score, 2),  # Redondear el promedio a dos decimales
                "first_name": r.first_name,
                "last_name": r.last_name,
                "email": r.email,
                "profile_picture": r.profile_picture,
                "city_name": r.city_name
            }
            for r in results
        ]
        print(professionals_data)
        # Devolver los datos como un JSON
        return jsonify(professionals_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/states', methods=['GET', 'POST'])
def handle_states():
  if request.method == 'POST':
    request_body = request.json
    
    name = request_body.get("name")
    
    if not name:
      raise APIException("Faltan campos requeridos", status_code=400)
    
    if State.query.filter_by(name=name).first():
      raise APIException("El departamento ya existe", status_code=400)
    
    try:
      new_state = State(name=name)
      db.session.add(new_state)
      db.session.commit()
    except Exception as e:
      raise APIException("Ha ocurrido un error mientras intentamos crear el departamento", status_code=400)
    
    return jsonify({ "message": "Departamento creado correctamente" }), 201
  elif request.method == 'GET':
    states = State.query.all()
    states = list(map(lambda x: x.serialize(), states))
    return jsonify(states), 200
  
@api.route('/states/<int:state_id>/cities', methods=['GET'])
def handle_state_cities(state_id):
  state = State.query.get(state_id)
  return jsonify(state.get_cities()), 200
  
@api.route('/specialities', methods=['GET', 'POST'])
def handle_specialities():
  if request.method == 'POST':
    request_body = request.json
    
    name = request_body.get("name")
    
    if not name:
      raise APIException("Faltan campos requeridos", status_code=400)
    
    if Speciality.query.filter_by(name=name).first():
      raise APIException("Especialidad ya existe", status_code=400)
    
    try:
      new_speciality = Speciality(name=name)
      db.session.add(new_speciality)
      db.session.commit()
    except Exception as e:
      raise APIException("Ha ocurrido un error mientras intentabamos crear una especialidad", status_code=400)
    
    return jsonify({ "message": "Especialidad creada satisfactoriamente" }), 201
  elif request.method == 'GET':
    specialities = Speciality.query.all()
    specialities = list(map(lambda x: x.serialize(), specialities))
    return jsonify(specialities), 200
  
@api.route('/cities', methods=['GET'])
def handle_cities():
  cities = City.query.all()
  cities = list(map(lambda x: x.serialize(), cities))
  return jsonify(cities), 200

@api.route('/states/<int:state_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_state(state_id):
  if request.method == 'GET':
    state = State.query.get(state_id)
    if state is None:
      raise APIException("Departamento no encontrado", status_code=404)
    return jsonify(state.serialize()), 200
  elif request.method == 'PUT':
    request_body = request.json
    
    state = State.query.get(state_id)
    
    if state is None:
      raise APIException("Departamento no encontrado", status_code=404)
    
    state.name = request_body.get("name", state.name)
    
    db.session.commit()
    
    return jsonify({ "message": "Departamento editado correctamente" }), 200
  elif request.method == 'DELETE':
    state = State.query.get(state_id)
    
    if state is None:
      raise APIException("Departamento no encontrado", status_code=404)
    
    db.session.delete(state)
    db.session.commit()
    
    return jsonify({ "message": "Departamento eliminado correctamente" }), 200

# Login con JWT
@api.route('/login', methods=['POST'])
def login():
  request_body = request.get_json()
  email = request_body.get("email")
  password = request_body.get("password")
  
  if not email or not password:
    raise APIException("Faltan campos requeridos", status_code=400)
  
  user = User.query.filter_by(email=email).first()
  professional = Professional.query.filter_by(email=email).first()
  
  # Chequear si el usuario o el profesional existen
  if user:
    # Si existe el usuario, chequear si la contraseña es correcta
    if not check_password_hash(user.password, password):
      raise APIException("Las credenciales del usuario son incorrectas", status_code=400)
    
    # Chequear si el usuario está activo
    if not user.is_active:
      raise APIException("El usuario no está activo", status_code=400)
    
    # Devolver un token de acceso
    access_token = create_access_token(identity=user.id)
    return jsonify({ "message": "Inicio de sesión exitoso ", "token": access_token, "user": user.serialize() }), 200
  elif professional:
    # Si existe el profesional, chequear si la contraseña es correcta
    print(check_password_hash(professional.password, password))
    if not check_password_hash(professional.password, password):
      raise APIException("Las credenciales del profesional son incorrectas", status_code=400)
    
    # Chequear si el profesional está activo
    if not professional.is_active:
      raise APIException("El profesional aún no está activo, contacta con el administrador", status_code=400)
    
    # Devolver un token de acceso
    access_token = create_access_token(identity=professional.id)
    return jsonify({ "message": "Inicio de sesión exitoso", "token": access_token, "professional": professional.serialize() }), 200
  else:
    # Si no existe el usuario o el profesional, devolver un error
    raise APIException("Usuario o profesional no encontrado", status_code=404)

@api.route('/verify_token', methods=['GET'])
@jwt_required()
def verify_token():
    id = get_jwt_identity()
    user = User.query.get(id)
    professional = Professional.query.get(id)
    
    if user:
      return jsonify({ "status": 200, "message": "El token es valido", "user": user.serialize() }), 200
    elif professional:
      return jsonify({ "status": 200, "message": "El token es valido", "professional": professional.serialize() }), 200
    

# Recuperar contraseña
@api.route('/reset-password', methods=['POST'])
def reset_password():
    request_body = request.get_json()
    email = request_body.get("email")

    # Verificar si el correo electrónico existe en la bd
    user = User.query.filter_by(email=email).first()
    if not user:
      return jsonify({'message': 'El correo no está registrado'}), 404

    # Crear mensaje (doc)
    msg = Message(
      'Restablecimiento de Contraseña',
      sender='reservasaluduy@gmail.com',
      recipients=[email])

    msg.html = (
        '<html>'
        '<body>'
        '<p>Recibimos la solicitud para restablecer tu contraseña en Reserva Salud.</p>'
        '<p>Haz clic en el siguiente enlace para proceder con el restablecimiento de tu contraseña:</p>'
        f'<p><a href="{os.getenv("FRONTEND_URL")}/restablecer?email={email}">Restablecer mi contraseña</a></p>'
        '<p>Si no realizaste esta solicitud, ignora este mensaje.</p>'
        '</body>'
        '</html>'
      )

    try:
      current_app.mail.send(msg)
      return jsonify({'message': 'Correo de restablecimiento enviado con éxito'}), 200
    except Exception as e:
      print(e)
      return jsonify({'error': 'Error al enviar el correo de recuperación'}), 500
    

@api.route('/new-password', methods=['POST'])
def update_password():
    email = request.json.get('email')
    new_password = request.json.get('new_password')

    if not new_password:
        return jsonify({'message': 'La contraseña no puede estar vacía.'}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'El correo no está registrado'}), 404

    try:
      hashed_password = generate_password_hash(new_password).decode('utf-8')

      user.password = hashed_password
      db.session.commit()

      return jsonify({'message': 'Contraseña actualizada exitosamente'}), 200
    except Exception as e:
        return jsonify({'message': 'Error al actualizar la contraseña: {}'.format(str(e))}), 500

# Enviar correo de verificación de usuario
@api.route('/verify-email', methods=['POST'])
def verify_email():
    request_body = request.get_json()
    email = request_body.get("email")

    # Verificar si el correo electrónico existe en la bd
    user = User.query.filter_by(email=email).first()
    if not user:
      return jsonify({'message': 'El correo no está registrado'}), 404

    # Crear mensaje (doc)
    msg = Message(
      'Validación de correo',
      sender='reservasaluduy@gmail.com',
      recipients=[email])

    msg.html = (
        '<html>'
        '<body>'
        '<p>¡Hola! Gracias por registrarte en Reserva Salud.</p>'
        '<p>Haz clic en el siguiente enlace para verificar tu correo electrónico:</p>'
        f'<p><a href="{os.getenv("FRONTEND_URL")}/activate-user?email={email}">Activar mi cuenta</a></p>'
        '<p>Si no realizaste esta solicitud, ignora este mensaje.</p>'
        '</body>'
        '</html>'
      )

    try:
      current_app.mail.send(msg)
      return jsonify({'message': 'Correo de verificación enviado con éxito'}), 200
    except Exception as e:
      print(e)
      return jsonify({'error': 'Error al enviar el correo de verificación'}), 500

# Activar usuario
@api.route('/activate-user', methods=['POST'])
def activate_user():
    email = request.json.get('email')

    user = User.query.filter_by(email=email).first()
    if not user:
      return jsonify({'message': 'El correo no está registrado'}), 404

    try:
      user.is_active = True
      db.session.commit()
      return jsonify({'message': 'Cuenta activada con éxito'}), 200
    except Exception as e:
      return jsonify({'message': 'Error al activar la cuenta: {}'.format(str(e))}), 500
"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from datetime import datetime
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import Appointment, GenderEnum, Speciality, db, User, Professional, Comment, Availability, State, City
from api.utils import generate_sitemap, APIException, generate_recurrent_dates
from flask_cors import CORS
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
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

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

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
      raise APIException("An error ocurred while uploading the file", status_code=400)
  else:
      raise APIException("No selected file", status_code=400)

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
            raise APIException("Missing required fields", status_code=400)
        
        if User.query.filter_by(email=email).first() or Professional.query.filter_by(email=email).first():
            raise APIException("Professional or User with this email already exist", status_code=400)
        
        # Create user in the database
        try:
          new_user = User(first_name=first_name, last_name=last_name, email=email, password=password, birth_date=birth_date, state_id=state_id, is_active=is_active)
          db.session.add(new_user)
          db.session.commit()
        except Exception as e:
          raise APIException("An error ocurred while creating the user", status_code=400)
          
        return jsonify({ "message": "User created successfully", "user_id": new_user.id }), 201
    elif request.method == 'GET':
        users = User.query.all()
        users = list(map(lambda x: x.serialize(), users))
        return jsonify(users), 200
      
@api.route('/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_user(user_id):
  if request.method == 'GET':
    user = User.query.get(user_id)
    if user is None:
        raise APIException("User not found", status_code=404)
    return jsonify(user.serialize()), 200
  elif request.method == 'PUT':
    request_body = request.json
    
    user = User.query.get(user_id)
    
    if user is None:
        raise APIException("User not found", status_code=404)
    
    user.first_name = request_body.get("first_name", user.first_name)
    user.last_name = request_body.get("last_name", user.last_name)
    user.email = request_body.get("email", user.email)
    if request_body.get("password"):
      user.password = generate_password_hash(request_body.get("password")).decode('utf-8')
    user.birth_date = request_body.get("birth_date", user.birth_date)
    user.state_id = request_body.get("state_id", user.state_id)
    user.is_active = request_body.get("is_active", user.is_active)
    
    db.session.commit()
    
    return jsonify({ "message": "User updated successfully" }), 200
  elif request.method == 'DELETE':
    user = User.query.get(user_id)
    
    if user is None:
        raise APIException("User not found", status_code=404)
    
    db.session.delete(user)
    db.session.commit()
    
    return jsonify({ "message": "User deleted successfully" }), 200

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
      raise APIException("Missing required fields", status_code=400)
   
    if type and type not in ['remote', 'presential']:
      raise APIException("Invalid type value", status_code=400)
    
    # Validate if availability exists
    availability = Availability.query.get(availability_id)
    if not availability:
      raise APIException("Availability not found", status_code=404)
    
    # Verify if availability is already booked
    if not availability.is_available:
        raise APIException("This availability is already booked", status_code=400)
    
    # Create appointment in the database
    try:
      new_appointment = Appointment(
        user_id=current_user_id,
        availability_id=availability_id,
        date=date,
        is_confirmed=is_confirmed,
        is_done=is_done,
        type=type
      )
      db.session.add(new_appointment)
      db.session.commit()
    except Exception as e:
      raise APIException(f"An error ocurred while creating the appointment {e}", status_code=400)
    
    availability.is_available = False
    db.session.commit()
    
    return jsonify({ "message": "Appointment created successfully" }), 201
  elif request.method == 'GET':
    user = User.query.get(current_user_id)
    return jsonify(user.get_appointments()), 200
 
@api.route('/users/<int:user_id>/appointments/<int:appointment_id>', methods=['GET', 'DELETE'])
def handle_user_appointment(user_id, appointment_id):
  if request.method == 'GET':
    appointment = Appointment.query.filter_by(user_id=user_id, id=appointment_id).first()
    if appointment is None:
      raise APIException("User appointment not found", status_code=404)
    return jsonify(appointment.serialize()), 200
  elif request.method == 'DELETE':
    appointment = Appointment.query.filter_by(user_id=user_id, id=appointment_id).first()
    
    if appointment is None:
      raise APIException("User appointment not found", status_code=404)
    
    db.session.delete(appointment)
    db.session.commit()
    
    return jsonify({ "message": "Appointment deleted successfully" }), 200

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
      speciality = request_body.get("speciality")
      certificate = request_body.get("certificate")
      profile_picture = request_body.get("profile_picture")
      telephone = request_body.get("telephone")
      appointment_type = request_body.get("appointment_type")
      is_active = request_body.get("is_active")
      is_validated = request_body.get("is_validated")
      state_id = request_body.get("state")
      
      # Check if required fields are not empty
      if not email or not password:
        raise APIException("Missing required fields", status_code=400)
        
      if Professional.query.filter_by(email=email).first() or User.query.filter_by(email=email).first():
        raise APIException("Professional or User with this email already exist", status_code=400)
        
      # Create professional in the database
      try:
        new_professional = Professional(
          first_name=first_name,
          last_name=last_name,
          email=email,
          password=password,
          birth_date=birth_date,
          gender=gender,
          speciality=speciality,
          certificate=certificate,
          profile_picture=profile_picture,
          telephone=telephone,
          appointment_type=appointment_type,
          is_active=is_active,
          is_validated=is_validated,
          state_id=state_id
        )
        
        db.session.add(new_professional)
        db.session.commit()
      except Exception as e:
        raise APIException("An error ocurred while creating the professional", status_code=400)
          
      return jsonify({ "message": "Professional created successfully", "professional_id": new_professional.id }), 201
    elif request.method == 'GET':
      professionals = Professional.query.all()
      professionals = list(map(lambda x: x.serialize(), professionals))
      return jsonify(professionals), 200
    
@api.route('/professionals/<int:professional_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_professional(professional_id):
  if request.method == 'GET':
    professional = Professional.query.get(professional_id)
    if professional is None:
      raise APIException("Professional not found", status_code=404)
    return jsonify(professional.serialize()), 200
  elif request.method == 'PUT':
    request_body = request.json
    
    professional = Professional.query.get(professional_id)
    
    if professional is None:
      raise APIException("Professional not found", status_code=404)
    
    professional.first_name = request_body.get("first_name", professional.first_name)
    professional.last_name = request_body.get("last_name", professional.last_name)
    professional.email = request_body.get("email", professional.email)
    if request_body.get("password"):
      professional.password = generate_password_hash(request_body.get("password")).decode('utf-8')
    professional.birth_date = request_body.get("birth_date", professional.birth_date)
    
    gender = request_body.get("gender", professional.gender)
    if gender and gender not in GenderEnum.__members__:
      raise APIException("Invalid gender value", status_code=400)
    professional.gender = GenderEnum[gender] if gender else professional.gender
    
    professional.gender = request_body.get("gender", professional.gender)
    professional.speciality = request_body.get("speciality", professional.speciality)
    professional.telephone = request_body.get("telephone", professional.telephone)
    professional.appointment_type = request_body.get("appointment_type", professional.appointment_type)
    professional.is_active = request_body.get("is_active", professional.is_active)
    professional.is_validated = request_body.get("is_validated", professional.is_validated)
    professional.state_id = request_body.get("state_id", professional.state_id)
    
    db.session.commit()
    
    return jsonify({ "message": "Professional updated successfully" }), 200
  elif request.method == 'DELETE':
    professional = Professional.query.get(professional_id)
    
    if professional is None:
      raise APIException("Professional not found", status_code=404)
    
    db.session.delete(professional)
    db.session.commit()
    
    return jsonify({ "message": "Professional deleted successfully" }), 200

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
      raise APIException("One of is_remote or is_presential must be true", status_code=400)

    # Check if required fields are not empty
    if not date or not start_time or not end_time:
      raise APIException("Missing required fields", status_code=400)
    
    # Check if date is in the correct format
    try:
      start_time = datetime.strptime(start_time, "%H:%M:%S").time()
      end_time = datetime.strptime(end_time, "%H:%M:%S").time()
    except Exception as e:
      raise APIException("Invalid time format", status_code=400)
    
    # Check if start_time is less than end_time
    if end_time <= start_time:
      raise APIException("End time must be greater than start time", status_code=400)
    
    # Check if availability already exists
    exist_availability = Availability.query.filter_by(professional_id=current_professional_id, date=date, start_time=start_time, end_time=end_time).first()
    
    if exist_availability:
      raise APIException("Availability already exists", status_code=400)
    
    # Check if availability overlaps with an existing one
    overlapping_availability = Availability.query.filter(
      Availability.date == date,
      Availability.professional_id == current_professional_id,
      ((Availability.start_time <= start_time) & (Availability.end_time > start_time)) |
      ((Availability.start_time < end_time) & (Availability.end_time >= end_time)) |
      ((Availability.start_time >= start_time) & (Availability.end_time <= end_time))
    ).first()
    
    if overlapping_availability:
      raise APIException("Availability overlaps with an existing one", status_code=400)
    
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
        print("Generating recurrent availability")
        new_availability.generate_recurrent_availability()
      
      db.session.add(new_availability)
      db.session.commit()
    except Exception as e:
      raise APIException(f"An error ocurred while creating the availability {e}", status_code=400)
    
    return jsonify({ "message": "Availability created successfully" }), 201
  elif request.method == 'GET':
    professional = Professional.query.get(current_professional_id)
    return jsonify(professional.serialize_availabilities()), 200
  
@api.route('/professionals/<int:professional_id>/availabilities/<int:availability_id>', methods=['GET', 'DELETE'])
def handle_professional_availability(professional_id, availability_id):
  if request.method == 'GET':
    availability = Availability.query.filter_by(professional_id=professional_id, id=availability_id).first()
    if availability is None:
      raise APIException("Professional availability not found", status_code=404)
    return jsonify(availability.serialize()), 200
  elif request.method == 'DELETE':
    availability = Availability.query.filter_by(professional_id=professional_id, id=availability_id).first()
    
    if availability is None:
      raise APIException("Professional availability not found", status_code=404)
    
    db.session.delete(availability)
    db.session.commit()
    
    return jsonify({ "message": "Availability deleted successfully" }), 200

@api.route('/comments', methods=['GET', 'POST'])
def handle_comments():
  if request.method == 'POST':
    request_body = request.json
    
    user_id = request_body.get("user_id")
    professional_id = request_body.get("professional_id")
    comment = request_body.get("comment")
    score = request_body.get("score")
    
    if not user_id or not professional_id or not score:
      raise APIException("Missing required fields", status_code=400)
    
    new_comment = Comment(user_id=user_id, professional_id=professional_id, comment=comment, score=score)
    db.session.add(new_comment)
    db.session.commit()
    
    return jsonify({ "message": "Comment created successfully" }), 201
  elif request.method == 'GET':
    comments = Comment.query.all()
    comments = list(map(lambda x: x.serialize(), comments))
    return jsonify(comments), 200

@api.route('/comments/<int:comment_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_comment(comment_id):
  if request.method == 'GET':
    comment = Comment.query.get(comment_id)
    if comment is None:
      raise APIException("Comment not found", status_code=404)
    return jsonify(comment.serialize()), 200
  elif request.method == 'PUT':
    request_body = request.json
    
    comment = Comment.query.get(comment_id)
    
    if comment is None:
      raise APIException("Comment not found", status_code=404)
    
    comment.comment = request_body.get("comment", comment.comment)
    comment.score = request_body.get("score", comment.score)
    
    db.session.commit()
    
    return jsonify({ "message": "Comment updated successfully" }), 200
  elif request.method == 'DELETE':
    comment = Comment.query.get(comment_id)
    
    if comment is None:
      raise APIException("Comment not found", status_code=404)
    
    db.session.delete(comment)
    db.session.commit()
    
    return jsonify({ "message": "Comment deleted successfully" }), 200

@api.route('/states', methods=['GET', 'POST'])
def handle_states():
  if request.method == 'POST':
    request_body = request.json
    
    name = request_body.get("name")
    
    if not name:
      raise APIException("Missing required fields", status_code=400)
    
    if State.query.filter_by(name=name).first():
      raise APIException("State already exists", status_code=400)
    
    try:
      new_state = State(name=name)
      db.session.add(new_state)
      db.session.commit()
    except Exception as e:
      raise APIException("An error ocurred while creating the state", status_code=400)
    
    return jsonify({ "message": "State created successfully" }), 201
  elif request.method == 'GET':
    states = State.query.all()
    states = list(map(lambda x: x.serialize(), states))
    return jsonify(states), 200
  
@api.route('/specialities', methods=['GET', 'POST'])
def handle_specialities():
  if request.method == 'POST':
    request_body = request.json
    
    name = request_body.get("name")
    
    if not name:
      raise APIException("Missing required fields", status_code=400)
    
    if Speciality.query.filter_by(name=name).first():
      raise APIException("Speciality already exists", status_code=400)
    
    try:
      new_speciality = Speciality(name=name)
      db.session.add(new_speciality)
      db.session.commit()
    except Exception as e:
      raise APIException("An error ocurred while creating the speciality", status_code=400)
    
    return jsonify({ "message": "Speciality created successfully" }), 201
  elif request.method == 'GET':
    specialities = Speciality.query.all()
    specialities = list(map(lambda x: x.serialize(), specialities))
    return jsonify(specialities), 200

@api.route('/states/<int:state_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_state(state_id):
  if request.method == 'GET':
    state = State.query.get(state_id)
    if state is None:
      raise APIException("State not found", status_code=404)
    return jsonify(state.serialize()), 200
  elif request.method == 'PUT':
    request_body = request.json
    
    state = State.query.get(state_id)
    
    if state is None:
      raise APIException("State not found", status_code=404)
    
    state.name = request_body.get("name", state.name)
    
    db.session.commit()
    
    return jsonify({ "message": "State updated successfully" }), 200
  elif request.method == 'DELETE':
    state = State.query.get(state_id)
    
    if state is None:
      raise APIException("State not found", status_code=404)
    
    db.session.delete(state)
    db.session.commit()
    
    return jsonify({ "message": "State deleted successfully" }), 200

# Login con JWT
@api.route('/login', methods=['POST'])
def login():
  request_body = request.get_json()
  email = request_body.get("email")
  password = request_body.get("password")
  
  if not email or not password:
    raise APIException("Required fields are missing", status_code=400)
  
  user = User.query.filter_by(email=email).first()
  professional = Professional.query.filter_by(email=email).first()
  
  # Chequear si el usuario o el profesional existen
  if user:
    # Si existe el usuario, chequear si la contraseña es correcta
    if not check_password_hash(user.password, password):
      raise APIException("User credentials incorrect", status_code=400)
    # Devolver un token de acceso
    access_token = create_access_token(identity=user.id)
    return jsonify({ "message": "Login successful", "token": access_token, "user": user.serialize() }), 200
  elif professional:
    # Si existe el profesional, chequear si la contraseña es correcta
    print(check_password_hash(professional.password, password))
    if not check_password_hash(professional.password, password):
      raise APIException("Professional credentials incorrect", status_code=400)
    # Devolver un token de acceso
    access_token = create_access_token(identity=professional.id)
    return jsonify({ "message": "Login successful", "token": access_token, "professional": professional.serialize() }), 200
  else:
    # Si no existe el usuario o el profesional, devolver un error
    raise APIException("User or Professional not found", status_code=404)

@api.route('/verify_token', methods=['GET'])
@jwt_required()
def verify_token():
    id = get_jwt_identity()
    user = User.query.get(id)
    professional = Professional.query.get(id)
    
    if user:
      return jsonify({ "status": 200, "message": "Token is valid", "user": user.serialize() }), 200
    elif professional:
      return jsonify({ "status": 200, "message": "Token is valid", "professional": professional.serialize() }), 200
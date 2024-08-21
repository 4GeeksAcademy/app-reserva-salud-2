"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint

from api.models import db, User, Professional, Comment, Availability
from api.utils import generate_sitemap, APIException, generate_recurrent_dates
from flask_cors import CORS
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required
import os
import requests

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/users', methods=['GET', 'POST'])
def handle_users():
    if request.method == 'POST':
        request_body = request.json
        
        name = request_body.get("name")
        email = request_body.get("email")
        password = request_body.get("password")
        birth_date = request_body.get("birth_date")
        state_id = request_body.get("state_id")
        
        # Check if required fields are not empty
        if not email or not password:
            raise APIException("Missing required fields", status_code=400)
        
        if User.query.filter_by(email=email).first():
            raise APIException("User already exists", status_code=400)
        
        # Create user in the database
        try:
          new_user = User(name=name, email=email, password=password, birth_date=birth_date, state_id=state_id)
          db.session.add(new_user)
          db.session.commit()
        except Exception as e:
          raise APIException("An error ocurred while creating the user", status_code=400)
          
        return jsonify({ "message": "User created successfully" }), 201
    elif request.method == 'GET':
        users = User.query.all()
        users = list(map(lambda x: x.serialize(), users))
        return jsonify(users), 200
      
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
          
      return jsonify({ "message": "Professional created successfully" }), 201
    elif request.method == 'GET':
      professionals = Professional.query.all()
      professionals = list(map(lambda x: x.serialize(), professionals))
      return jsonify(professionals), 200
    
@api.route('/professionals/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_professional(id):
  if request.method == 'GET':
    professional = Professional.query.get(id)
    if professional is None:
      raise APIException("Professional not found", status_code=404)
    return jsonify(professional.serialize()), 200
    
@api.route('/professionals/<int:id>/availabilities', methods=['GET', 'POST'])
def handle_professional_availabilities(id):
  if request.method == 'POST':
    request_body = request.json
    
    date = request_body.get("date")
    start_time = request_body.get("start_time")
    end_time = request_body.get("end_time")
    weekly = request_body.get("weekly")
    is_remote = request_body.get("is_remote", False)
    is_presential = request_body.get("is_presential", False)
    
    
    if not is_remote and not is_presential:
      raise APIException("One of is_remote or is_presential must be true", status_code=400)
    
    if not date or not start_time or not end_time:
      raise APIException("Missing required fields", status_code=400)
    
    print(generate_recurrent_dates(date))
    
    exist_availability = Availability.query.filter_by(professional_id=id, date=date, start_time=start_time, end_time=end_time).first()
    
    if exist_availability:
      raise APIException("Availability already exists", status_code=400)
    
    try:
      new_availability = Availability(
        professional_id=id,
        date=date,
        start_time=start_time,
        end_time=end_time,
        weekly=weekly,
        is_remote=is_remote,
        is_presential=is_presential
      )
      
      db.session.add(new_availability)
      db.session.commit()
    except Exception as e:
      raise APIException(f"An error ocurred while creating the availability {e}", status_code=400)
    
    return jsonify({ "message": "Availability created successfully" }), 201
  elif request.method == 'GET':
    professional = Professional.query.get(id)
    return jsonify(professional.serialize_availabilities()), 200
  
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
        raise APIException("Credentials incorrect", status_code=400)
      # Devolver un token de acceso
      access_token = create_access_token(identity=user.id)
    elif professional:
      # Si existe el profesional, chequear si la contraseña es correcta
      if not check_password_hash(professional.password, password):
        raise APIException("Credentials incorrect", status_code=400)
      # Devolver un token de acceso
      access_token = create_access_token(identity=professional.id)
    else:
      # Si no existe el usuario o el profesional, devolver un error
      raise APIException("User or Professional not found", status_code=404)
    
    return jsonify({ "message": "Login successful", "token": access_token }), 200

@api.route('/verify_token', methods=['GET'])
@jwt_required()
def verify_token():
    return jsonify({ "status": 200, "message": "Token is valid" }), 200
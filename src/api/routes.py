"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint

from api.models import db, User, Professional, StateEnum, Comment
from api.utils import generate_sitemap, APIException, encode_credentials
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
        
        first_name = request_body.get("first_name")
        last_name = request_body.get("last_name")
        email = request_body.get("email")
        password = request_body.get("password")
        birth_date = request_body.get("birth_date")
        state = request_body.get("state")
        
        # Check if required fields are not empty
        if not first_name or not last_name or not email or not password or not birth_date or not state:
            raise APIException("Missing required fields", status_code=400)
        
        if User.query.filter_by(email=email).first():
            raise APIException("User already exists", status_code=400)
          
        print(StateEnum._member_names_)
        
        if state not in StateEnum._member_names_: 
            raise APIException("Invalid state", status_code=400)
        
        # Create user in the database
        try:
          new_user = User(first_name=first_name, last_name=last_name, email=email, password=password, state=state)
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
      state = request_body.get("state")
      profile_picture = request_body.get("profile_picture")
      birth_date = request_body.get("birth_date")
      telephone = request_body.get("telephone")
      title = request_body.get("title")
      url_calendly = request_body.get("url_calendly")
      is_active = request_body.get("is_active")
      is_validated = request_body.get("is_validated")
        
      # Check if required fields are not empty
      if not first_name or not last_name or not email or not password or not state or not birth_date or not telephone or not title or not url_calendly:
        raise APIException("Missing required fields", status_code=400)
        
      if User.query.filter_by(email=email).first():
        raise APIException("User with this email already exists", status_code=400)
      
      if Professional.query.filter_by(email=email).first():
        raise APIException("Professional already exists", status_code=400)
      
      # Check if state is valid
      if state not in StateEnum.__members__: 
        raise APIException("Invalid state", status_code=400)
        
      # Create professional in the database
      try:
        new_professional = Professional(first_name=first_name, last_name=last_name, email=email, password=password, state=state, profile_picture=profile_picture, birth_date=birth_date, telephone=telephone, title=title, url_calendly=url_calendly, is_active=is_active, is_validated=is_validated)
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
    
    usuario = User.query.filter_by(email=email).first()
    
    if usuario is None:
        raise APIException("User not found", status_code=404)
    
    if not check_password_hash(usuario.password, password):
        raise APIException("Password incorrect", status_code=400)
    
    # Implementar JWT
    access_token = create_access_token(identity=usuario.id)
    
    return jsonify({ "message": "Login successful", "token": access_token }), 200

@api.route('/verify_token', methods=['GET'])
@jwt_required()
def verify_token():
    return jsonify({ "status": 200, "message": "Token is valid" }), 200

@api.route('/calendly/token', methods=['POST'])
def get_calendly_token():
    code = request.json.get('code', None)
    
    client_id = os.getenv('CALENDLY_CLIENT_ID')
    client_secret = os.getenv('CALENDLY_CLIENT_SECRET')
    redirect_uri = os.getenv('CALENDLY_REDIRECT_URI')
    
    if not code:
        raise APIException("Missing code", status_code=400)
    
    encode_authentication = encode_credentials(client_id, client_secret)
    
    try:
        response = requests.post('https://auth.calendly.com/oauth/token', json={
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': redirect_uri,
        }, headers={
            'Authorization': f'Basic {encode_authentication}',
        })
        response.raise_for_status()
        return jsonify(response.json()), 200
    except requests.exceptions.RequestException as e:
        return jsonify({ "message": "Error al obtener el token de Calendly" }), 400
# @api.route('/usuario', methods=['POST'])
# def crear_usuario():
#     request_body = request.get_json()
    
#     nombre = request_body.get("nombre")
#     apellido = request_body.get("apellido")
#     email = request_body.get("email")
#     password = request_body.get("password")
    
#     # Comprobar que los campos requeridos no estén vacíos
#     if not nombre or not apellido or not email or not password:
#         raise APIException("Faltan campos requeridos", status_code=400)
    
#     # Crear usuario en la base de datos
#     usuario = Usuario(nombre=nombre, apellido=apellido, email=email, password=password_hash)
#     db.session.add(usuario)
#     db.session.commit()
    
#     return jsonify({ "message": "Usuario creado satisfactoriamente" }), 201

# @api.route('/usuario/<int:id>', methods=['GET'])
# def obtener_usuario(id):
#     usuario = Usuario.query.get(id)
#     if usuario is None:
#         raise APIException("User not found", status_code=404)
#     return jsonify(usuario.serialize()), 200

# @api.route('/usuario/<int:id>', methods=['PUT'])
# def actualizar_usuario(id):
#     usuario = Usuario.query.get(id)
    
#     if usuario is None:
#         raise APIException("User not found", status_code=404)
    
#     request_body = request.get_json()
    
#     nombre = request_body.get("nombre")
#     apellido = request_body.get("apellido")
#     email = request_body.get("email")
#     clave = request_body.get("clave")
    
#     if nombre:
#         usuario.nombre = nombre
#     if apellido:
#         usuario.apellido = apellido
#     if email:
#         usuario.email = email
#     if clave:
#         usuario.clave = clave
    
#     db.session.commit()
    
#     return jsonify({ "message": "User successfully updated" }), 200

# @api.route('/usuario/<int:id>', methods=['DELETE'])
# def eliminar_usuario(id):
#     usuario = Usuario.query.get(id)
    
#     if usuario is None:
#         raise APIException("User not found", status_code=404)
    
#     db.session.delete(usuario)
#     db.session.commit()
    
#     return jsonify({ "message": "User successfully deleted" }), 200

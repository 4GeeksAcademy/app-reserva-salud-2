"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint

from api.models import db, Usuario
from api.utils import generate_sitemap, APIException, encode_credentials
from flask_cors import CORS
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required
import os
import requests

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/usuario', methods=['GET'])
def obtener_usuarios():
    usuarios = Usuario.query.all()
    usuarios = list(map(lambda x: x.serialize(), usuarios))
    return jsonify(usuarios), 200

@api.route('/usuario', methods=['POST'])
def crear_usuario():
    request_body = request.get_json()
    
    nombre = request_body.get("nombre")
    apellido = request_body.get("apellido")
    email = request_body.get("email")
    password = request_body.get("password")
    
    # Comprobar que los campos requeridos no estén vacíos
    if not nombre or not apellido or not email or not password:
        raise APIException("Faltan campos requeridos", status_code=400)
    
    # Hashear contraseña antes de guardarla
    password_hash = generate_password_hash(password, 10).decode('utf-8')
    
    # Crear usuario en la base de datos
    usuario = Usuario(nombre=nombre, apellido=apellido, email=email, password=password_hash)
    db.session.add(usuario)
    db.session.commit()
    
    return jsonify({ "message": "Usuario creado satisfactoriamente" }), 201

@api.route('/usuario/<int:id>', methods=['GET'])
def obtener_usuario(id):
    usuario = Usuario.query.get(id)
    if usuario is None:
        raise APIException("User not found", status_code=404)
    return jsonify(usuario.serialize()), 200

@api.route('/usuario/<int:id>', methods=['PUT'])
def actualizar_usuario(id):
    usuario = Usuario.query.get(id)
    
    if usuario is None:
        raise APIException("User not found", status_code=404)
    
    request_body = request.get_json()
    
    nombre = request_body.get("nombre")
    apellido = request_body.get("apellido")
    email = request_body.get("email")
    clave = request_body.get("clave")
    
    if nombre:
        usuario.nombre = nombre
    if apellido:
        usuario.apellido = apellido
    if email:
        usuario.email = email
    if clave:
        usuario.clave = clave
    
    db.session.commit()
    
    return jsonify({ "message": "User successfully updated" }), 200

@api.route('/usuario/<int:id>', methods=['DELETE'])
def eliminar_usuario(id):
    usuario = Usuario.query.get(id)
    
    if usuario is None:
        raise APIException("User not found", status_code=404)
    
    db.session.delete(usuario)
    db.session.commit()
    
    return jsonify({ "message": "User successfully deleted" }), 200

# Login con JWT
@api.route('/login', methods=['POST'])
def login():
    request_body = request.get_json()
    email = request_body.get("email")
    password = request_body.get("password")
    
    if not email or not password:
        raise APIException("Required fields are missing", status_code=400)
    
    usuario = Usuario.query.filter_by(email=email).first()
    
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

# Endpoint para obtener el access token de calendly
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
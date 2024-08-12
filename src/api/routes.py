"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint

from api.models import db, Usuario
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/usuario', methods=['GET'])
def obtener_usuarios():
    usuarios = Usuario.query.all()
    usuarios = list(map(lambda x: x.serialize(), usuarios))
    return jsonify(usuarios), 200

# @api.route('/users', methods=['GET'])
# def get_users():
    
#     users = User.query.all()
    
#     users = list(map(lambda x: x.serialize(), users))
    
#     return jsonify(users), 200

@api.route('/usuario', methods=['POST'])
def get_user_login():
    #obtengo los datos de la solicitud https,los convierto a formato json y los almaceno en formato diccionario de python
    request_data_api= request.get_json()
    #obtengo los datos necesarios del diccionario para realizar la verificacion del login
    user_email = request_data_api.get('email')
    password= request_data_api.get('password')    
    
    user_app= Usuario.query.filter_by(email=user_email).first()
    
    if not user_app:
        return jsonify({"message": "user app not found"}), 404
    
    if user_app.password != password:
        return jsonify({"message": "password invalid, check!!"}), 401
    
    # Implementar JWT
    # asigno el access token al email del usuario
    access_token = create_access_token(identity=user_app.email)
    #Convierto el diccionario de python en una respuesta https json
    return jsonify({ "message": "Login exitoso", "token": access_token }), 200    
   

# @api.route('/roles', methods=['GET'])
# def get_roles():
#     roles = Role.query.all()
    
#     roles = list(map(lambda x: x.serialize(), roles))
    
#     return jsonify(roles), 200

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
    
#     # Hashear contraseña antes de guardarla
#     password_hash = generate_password_hash(password, 10).decode('utf-8')
    
#     # Crear usuario en la base de datos
#     usuario = Usuario(nombre=nombre, apellido=apellido, email=email, password=password_hash)
#     db.session.add(usuario)
#     db.session.commit()
    
#     return jsonify({ "message": "Usuario creado satisfactoriamente" }), 201

@api.route('/usuario/<int:id>', methods=['GET'])
def obtener_usuario(id):
    usuario = Usuario.query.get(id)
    if usuario is None:
        raise APIException("Usuario no encontrado", status_code=404)
    return jsonify(usuario.serialize()), 200

@api.route('/usuario/<int:id>', methods=['PUT'])
def actualizar_usuario(id):
    usuario = Usuario.query.get(id)
    
    if usuario is None:
        raise APIException("Usuario no encontrado", status_code=404)
    
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
    
    return jsonify({ "message": "Usuario actualizado satisfactoriamente" }), 200

@api.route('/usuario/<int:id>', methods=['DELETE'])
def eliminar_usuario(id):
    usuario = Usuario.query.get(id)
    
    if usuario is None:
        raise APIException("Usuario no encontrado", status_code=404)
    
    db.session.delete(usuario)
    db.session.commit()
    
    return jsonify({ "message": "Usuario eliminado satisfactoriamente" }), 200

# @api.route('/login', methods=['POST'])
# def login():
#     request_body = request.get_json()
    
#     email = request_body.get("email")
#     password = request_body.get("password")
    
#     if not email or not password:
#         raise APIException("Faltan campos requeridos", status_code=400)
    
#     usuario = Usuario.query.filter_by(email=email).first()
    
#     if usuario is None:
#         raise APIException("Usuario no encontrado", status_code=404)
    
#     if not check_password_hash(usuario.password, password):
#         raise APIException("Contraseña incorrecta", status_code=400)
    
#     # Implementar JWT
#     access_token = create_access_token(identity=usuario.id)
    
#     return jsonify({ "message": "Login exitoso", "token": access_token }), 200

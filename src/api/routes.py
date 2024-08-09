"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint

from api.models import db, Usuario
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


# @api.route('/users', methods=['GET'])
# def get_users():
    
#     users = User.query.all()
    
#     users = list(map(lambda x: x.serialize(), users))
    
#     return jsonify(users), 200

@api.route('/usuario', methods=['POST'])
def get_user_login():
   
    request_data_api= request.get_json()
    
    user_email = request_data_api.get('email')
    password= request_data_api.get('password')    
    
    user_app= Usuario.query.filter_by(email=user_email).first()
    
    if not user_app:
        return jsonify({"message": "user app not found"}), 404
    
    if user_app.password != password:
        return jsonify({"message": "password invalid, check!!"}), 401
    
    
    return jsonify({
         "message": "login succeful! Welcome to the System!!",
         "user": user_app.serialize()
        }), 200





# @api.route('/roles', methods=['GET'])
# def get_roles():
#     roles = Role.query.all()
    
#     roles = list(map(lambda x: x.serialize(), roles))
    
#     return jsonify(roles), 200
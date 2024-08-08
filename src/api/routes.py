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


@api.route('/users', methods=['GET'])
def get_users():
    
    users = User.query.all()
    
    users = list(map(lambda x: x.serialize(), users))
    
    return jsonify(users), 200

@api.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    
    if user is None:
        raise APIException("User not found", status_code=404)
    
    return jsonify(user.serialize()), 200

@api.route('/roles', methods=['GET'])
def get_roles():
    roles = Role.query.all()
    
    roles = list(map(lambda x: x.serialize(), roles))
    
    return jsonify(roles), 200
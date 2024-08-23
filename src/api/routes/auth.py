from flask import Blueprint, jsonify

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['GET'])
def login():
  return jsonify({"msg": "Login route"})
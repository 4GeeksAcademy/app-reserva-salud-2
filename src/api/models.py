from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import generate_password_hash, check_password_hash
from sqlalchemy import event
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import enum

from api.utils import generate_recurrent_dates

db = SQLAlchemy()

professional_speciality = db.Table('professional_speciality', db.Model.metadata,
    db.Column('professional_id', db.Integer, db.ForeignKey('professional.id'), primary_key=True),
    db.Column('speciality_id', db.Integer, db.ForeignKey('speciality.id'), primary_key=True)
)

class GenderEnum(enum.Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"

class User(db.Model):
    __tablename__ = 'user'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    email = db.Column(db.String(200), unique=True, nullable=False, index=True)
    password = db.Column(db.String(200), nullable=False)
    birth_date = db.Column(db.Date)
    is_active = db.Column(db.Boolean, default=False)
    state_id = db.Column(db.Integer, db.ForeignKey('state.id'))
    
    availability = db.relationship('Appointment', back_populates='user', cascade='all, delete-orphan')
    state = db.relationship('State', back_populates='users', uselist=False)
    comments = db.relationship("Comment", back_populates="user", cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<User {self.email}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "birth_date": self.birth_date,
            "state_id": self.state_id,
            "is_active": self.is_active,
        }
        
class Professional(db.Model):
    __tablename__ = 'professional'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    email = db.Column(db.String(200), unique=True, nullable=False, index=True)
    password = db.Column(db.String(200), nullable=False)
    birth_date = db.Column(db.Date)
    gender = db.Column(db.Enum(GenderEnum))
    speciality = db.Column(db.String(200))
    certificate = db.Column(db.String(200))
    profile_picture = db.Column(db.String(200), default='https://avatar.iran.liara.run/public')
    telephone = db.Column(db.String(200))
    appointment_type = db.Column(db.String(200))
    is_active = db.Column(db.Boolean, default=False)
    is_validated = db.Column(db.Boolean, default=False)
    state_id = db.Column(db.Integer, db.ForeignKey('state.id'))
    
    state = db.relationship('State', back_populates='professionals', uselist=False)
    comments = db.relationship('Comment', back_populates='professional', cascade='all, delete-orphan')
    availabilities = db.relationship('Availability', back_populates='professional', cascade='all, delete-orphan')
    specialities = db.relationship('Speciality', secondary=professional_speciality, back_populates='professionals')
    
    def __repr__(self):
        return f'<Professional {self.email} {self.speciality}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "birth_date": self.birth_date,
            "gender": self.gender.value,
            "speciality": self.speciality,
            "certificate": self.certificate,
            "profile_picture": self.profile_picture,
            "telephone": self.telephone,
            "appointment_type": self.appointment_type,
            "is_active": self.is_active,
            "is_validated": self.is_validated,
            "comments": [comment.serialize() for comment in self.comments],
            "state_id": self.state_id,
            "specialities": [speciality.serialize() for speciality in self.specialities]
        }
    
    def serialize_availabilities(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "speciality": self.speciality,
            "profile_picture": self.profile_picture,
            "availabilities": [availability.serialize() for availability in self.availabilities]
        }
        
class Comment(db.Model):
    __tablename__ = 'comment'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    professional_id = db.Column(db.Integer, db.ForeignKey('professional.id'), nullable=False)
    comment = db.Column(db.Text)
    score = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp(), nullable=False)
    
    user = db.relationship('User', back_populates='comments')
    professional = db.relationship('Professional', back_populates='comments')
    
    def __repr__(self):
        return f'<Comment {self.user.email}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "user": self.user.serialize(),
            "professional_id": self.professional_id,
            "comment": self.comment,
            "score": self.score,
            "created_at": self.created_at,
        }
        
class State(db.Model):
    __tablename__ = 'state'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    
    cities = db.relationship('City')
    users = db.relationship('User', back_populates='state')
    professionals = db.relationship('Professional', back_populates='state')
    
    def __repr__(self):
        return f'<State {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "cities": [city.serialize() for city in self.cities]
        }
    
class City(db.Model):
    __tablename__ = 'city'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    state_id = db.Column(db.Integer, db.ForeignKey('state.id'))
    
    state = db.relationship('State', back_populates='cities')
    
    def __repr__(self):
        return f'<City {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }
        
class Availability(db.Model):
    __tablename__ = 'availability'
    
    id = db.Column(db.Integer, primary_key=True)
    professional_id = db.Column(db.Integer, db.ForeignKey('professional.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)
    weekly = db.Column(db.Boolean, nullable=False, default=True)
    created_at = db.Column(db.DateTime, default=datetime.now())
    is_remote = db.Column(db.Boolean, nullable=False, default=False)
    is_presential = db.Column(db.Boolean, nullable=False, default=False)
    
    professional = db.relationship(Professional)
    appointments = db.relationship('Appointment', back_populates='availability')
    
    def __repr__(self):
        return f'<Availability {self.professional.email} {self.date} {self.start_time} {self.end_time}>'
    
    def serialize(self):
        availability = {
            "id": self.id,
            "professional_id": self.professional_id,
            "date": self.date.isoformat(),
            "start_time": self.start_time.strftime('%H:%M'),
            "end_time": self.end_time.strftime('%H:%M'),
            "weekly": self.weekly,
            "created_at": self.created_at,
            "is_remote": self.is_remote,
            "is_presential": self.is_presential,
        }
        
        if self.weekly:
            availability['recurrent_dates'] = generate_recurrent_dates(self.date.isoformat())
        
        return availability
        
class Appointment(db.Model):
    __tablename__ = 'appointment'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    availability_id = db.Column(db.Integer, db.ForeignKey('availability.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    is_confirmed = db.Column(db.Boolean, default=False)
    is_done = db.Column(db.Boolean, default=None)
    type = db.Column(db.Enum('remote', 'presential', name='appointment_type'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    
    availability = db.relationship(Availability, uselist=False)
    user = db.relationship(User)
    
    def __repr__(self):
        return f'<Appointment {self.user.email} {self.availability.professional.email} {self.date}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "user": self.user.serialize(),
            "availability": self.availability.serialize(),
            "date": self.date,
            "is_confirmed": self.is_confirmed,
            "is_done": self.is_done,
            "type": self.type,
            "created_at": self.created_at
        }
        
class Speciality(db.Model):
    __tablename__ = 'speciality'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False, unique=True)
    
    professionals = db.relationship('Professional', secondary=professional_speciality, back_populates='specialities')
    
    def __repr__(self):
        return f'<Speciality {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }
    
def hash_password(mapper, connection, target):
    if target.password:
        target.password = generate_password_hash(target.password, 10).decode('utf-8')
        
event.listen(User, 'before_insert', hash_password)
event.listen(Professional, 'before_insert', hash_password)
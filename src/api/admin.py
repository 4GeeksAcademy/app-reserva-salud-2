  
import os
from flask_admin import Admin

from .models import db, User, Professional, Appointment, City, State, Availability, Comment, Speciality

from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Professional, db.session))
    admin.add_view(ModelView(Appointment, db.session))
    admin.add_view(ModelView(Availability, db.session))
    admin.add_view(ModelView(Comment, db.session))
    admin.add_view(ModelView(City, db.session))
    admin.add_view(ModelView(State, db.session))
    admin.add_view(ModelView(Speciality, db.session))
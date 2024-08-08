  
import os
from flask_admin import Admin
from .models import db, Usuario,Paciente,Profesional,Especialidad,Especialidad_profesional,Tipo_consulta,Tipo_consulta_profesional,Departamento,Ciudad,Pais,Comentario,Comentario_paciente_profesional,Notificacion,Reserva,Medio_de_pago,Consulta
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(Usuario, db.session))
    admin.add_view(ModelView(Paciente, db.session))
    admin.add_view(ModelView(Profesional, db.session))
    admin.add_view(ModelView(Especialidad, db.session))
    admin.add_view(ModelView(Especialidad_profesional, db.session))
    admin.add_view(ModelView(Tipo_consulta, db.session))
    admin.add_view(ModelView(Tipo_consulta_profesional, db.session))
    admin.add_view(ModelView(Departamento, db.session))
    admin.add_view(ModelView(Ciudad, db.session))
    admin.add_view(ModelView(Pais, db.session))
    admin.add_view(ModelView(Comentario, db.session))
    admin.add_view(ModelView(Comentario_paciente_profesional, db.session))
    admin.add_view(ModelView(Notificacion, db.session))
    admin.add_view(ModelView(Reserva, db.session))
    admin.add_view(ModelView(Medio_de_pago, db.session))
    admin.add_view(ModelView(Consulta, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
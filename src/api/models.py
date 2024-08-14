from enum import Enum
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import generate_password_hash, check_password_hash
from sqlalchemy import Column, Integer, String, ForeignKey, Date, Text, Boolean, DateTime, event, Enum as SQLAEnum
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

db = SQLAlchemy()

class RolEnum(Enum):
    ADMINISTRADOR= "administrador"
    PACIENTE= "paciente"
    PROFESIONAL= "profesional"

class Usuario(db.Model):
    __tablename__ = 'usuario'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    rol=db.Column(db.Enum(RolEnum),nullable=False, default=RolEnum.PACIENTE)
    nombre = db.Column(db.String(100), unique=False, nullable=False)
    apellido = db.Column(db.String(100), unique=False, nullable=False)
    fecha_nacimiento=db.Column(db.Date, unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, default=False)
    paciente = db.relationship('Paciente', uselist=False, backref='usuario', lazy=True, cascade='all, delete-orphan') 
    profesional= db.relationship('Profesional',uselist=False,backref='usuario', lazy=True, cascade='all, delete-orphan')


class StateEnum(Enum):
    ARTIGAS = "artigas"
    CANELONES = "canelones"
    CERRO_LARGO = "cerro_largo"
    COLONIA = "colonia"
    DURAZNO = "durazno"
    FLORES = "flores"
    FLORIDA = "florida"
    LAVALLEJA = "lavalleja"
    MALDONADO = "maldonado"
    MONTEVIDEO = "montevideo"
    PAYSANDU = "paysandu"
    RIO_NEGRO = "rio_negro"
    RIVERA = "rivera"
    ROCHA = "rocha"
    SALTO = "salto"
    SAN_JOSE = "san_jose"
    SORIANO = "soriano"
    TACUAREMBO = "tacuarembo"
    TREINTA_Y_TRES = "treinta_y_tres"

class User(db.Model):
    __tablename__ = 'user'
    
    id = Column(Integer, primary_key=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(200), unique=True, nullable=False, index=True)
    password = Column(String(200), nullable=False)
    state = Column(SQLAEnum(StateEnum), nullable=False)
    is_active = Column(Boolean, nullable=False, default=False)
    
    comments = relationship("Comment", back_populates="user", cascade='all, delete-orphan')
    

    def __repr__(self):
        return f'<User {self.first_name} {self.last_name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,

            "rol": self.rol.value,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "fecha_nacimiento": self.fecha_nacimiento,

            "state": self.state.value,

            "is_active": self.is_active
        }
        
class Professional(db.Model):
    __tablename__ = 'professional'
    
    id = Column(Integer, primary_key=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(200), unique=True, nullable=False, index=True)
    password = Column(String(200), nullable=False)
    state = Column(SQLAEnum(StateEnum), nullable=False)
    profile_picture = Column(String(200), nullable=False, default='https://avatar.iran.liara.run/public/boy')
    birth_date = Column(Date, nullable=False)
    telephone = Column(String(200), nullable=False)
    title = Column(String(200), nullable=False)
    url_calendly = Column(String(200), nullable=False)
    is_active = Column(Boolean, nullable=False, default=False)
    is_validated = Column(Boolean, nullable=False, default=False)
    
    comments = relationship('Comment', back_populates='professional', cascade='all, delete-orphan')
    

class Paciente(db.Model):
    __tablename__ = 'paciente'
    
    id = db.Column(db.Integer, primary_key=True)
    historia_clinica = db.Column(db.TEXT, unique=False, nullable=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'),unique=False, nullable=False)
    comentarios_paciente= db.relationship('Comentario_paciente_profesional',backref='paciente',lazy=True)
    notificaciones_paciente=db.relationship('Notificacion',backref='paciente',lazy=True)


    def __repr__(self):
        return f'<Professional {self.first_name} {self.last_name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "state": self.state.value,
            "profile_picture": self.profile_picture,
            "birth_date": self.birth_date,
            "telephone": self.telephone,
            "title": self.title,
            "url_calendly": self.url_calendly,
            "comments": [comment.serialize() for comment in self.comments],
            "is_active": self.is_active,
            "is_validated": self.is_validated,
        }
        
class Comment(db.Model):
    __tablename__ = 'comment'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    professional_id = Column(Integer, ForeignKey('professional.id'), nullable=False)
    comment = Column(Text)
    score = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=db.func.current_timestamp(), nullable=False)
    
    user = relationship('User', back_populates='comments')
    professional = relationship('Professional', back_populates='comments')

    id = db.Column(db.Integer, primary_key=True)
    foto_perfil = db.Column(db.String, unique=False, nullable=False)   
    genero=db.Column(db.String(12), unique=False, nullable=False) 
    telefono= db.Column(db.Integer, unique=False, nullable=False)
    matricula= db.Column(db.String(15), unique=False, nullable=False)
    cjpu=db.Column(db.String(15), unique=False, nullable=False)
    titulo_habilitante= db.Column(db.String, unique=False, nullable=False)
    id_departamento = db.Column(db.Integer, db.ForeignKey('usuario.id'),unique=False, nullable=False)
    id_ciudad = db.Column(db.Integer, db.ForeignKey('ciudad.id'),unique=False, nullable=False)
    id_pais= db.Column(db.Integer, db.ForeignKey('pais.id'),unique=False, nullable=False)
    id_usuario = db.Column(db.Integer, db.ForeignKey('departamento.id'),unique=False, nullable=False)
    profesionales_tipo_consulta= db.relationship('Tipo_consulta_profesional', back_populates='profesional')
    comentarios_profesional= db.relationship('Comentario_paciente_profesional',backref='profesional',lazy=True)
    notificaciones_profesional=db.relationship('Notificacion',backref='profesional',lazy=True)

    def __repr__(self):
        return f'<Comment {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,

            "foto_perfil": self.foto_perfil,          
            "genero": self.genero,
            "pais_nacimiento": self.pais_nacimiento,
            "telefono": self.telefono,
            "matricula": self.matricula,
            "cjpu": self.cjpu,
            "titulo_habilitante": self.titulo_habilitante,
            "id_departamento": self.id_departamento,
            "id_ciudad": self.id_ciudad,
            "id_usuario": self.id_usuario

            "user": self.user.serialize(),
            "professional_id": self.professional_id,
            "comment": self.comment,
            "score": self.score,
            "created_at": self.created_at,
        }
    
def hash_password(mapper, connection, target):
    if target.password:
        target.password = generate_password_hash(target.password, 10).decode('utf-8')
        
event.listen(User, 'before_insert', hash_password)
event.listen(User, 'before_update', hash_password)
event.listen(Professional, 'before_insert', hash_password)
event.listen(Professional, 'before_update', hash_password)
    
# class BaseUser(db.Model):
#     __abstract__ = True

#     id = db.Column(db.Integer, primary_key=True)
#     email = db.Column(db.String(200), unique=True, nullable=False, index=True)
#     password = db.Column(db.String(200), nullable=False)
#     first_name = db.Column(db.String(100), nullable=False)
#     last_name = db.Column(db.String(100), nullable=False)
#     is_active = db.Column(db.Boolean(), default=False)
#     created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

# class Professional(BaseUser):
#     __tablename__ = 'professional'

#     state_id = db.Column(db.Integer, db.ForeignKey('state.id'), nullable=False)
#     state = db.relationship('State', back_populates='professional', uselist=False)
#     profile_picture = db.Column(db.String(200), nullable=False)
#     birth_date = db.Column(db.Date, nullable=False)
#     telephone = db.Column(db.String(200), nullable=False)
#     title = db.Column(db.String(200), nullable=False)
#     url_calendly = db.Column(db.String(200), nullable=False)

# class Patient(BaseUser):
#     __tablename__ = 'patient'
    
#     medical_history = db.Column(db.Text, nullable=False)
#     state_id = db.Column(db.Integer, db.ForeignKey('state.id'), nullable=False)
#     state = db.relationship('State', back_populates='patient', uselist=False)
    
# class State(db.Model):
#     __tablename__ = 'state'
    
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(200), unique=True, nullable=False)
#     patient = db.relationship('Patient', back_populates='state')
#     professional = db.relationship('Professional', back_populates='state')
    
#     def __repr__(self):
#         return f'<State {self.name}>'

#     def serialize(self):
#         return {
#             "id": self.id,
#             "name": self.name, 
#         }


# class RolEnum(Enum):
#     ADMINISTRADOR= "administrador"
#     PACIENTE= "paciente"
#     PROFESIONAL= "profesional"

# class Usuario(db.Model):
#     __tablename__ = 'usuario'

#     id = db.Column(db.Integer, primary_key=True)
#     id_departamento = db.Column(db.Integer, db.ForeignKey('departamento.id'), nullable=False)
#     departamento = db.relationship('Departamento', back_populates='usuario', uselist=False)
#     email = db.Column(db.String(200), unique=True, nullable=False, index=True)
#     password = db.Column(db.String(200), nullable=False)
#     rol = db.Column(db.Enum(RolEnum), nullable=False, default=RolEnum.PACIENTE)
#     nombre = db.Column(db.String(100), nullable=False)
#     apellido = db.Column(db.String(100), nullable=False)
#     is_active = db.Column(db.Boolean(), default=False)
#     paciente = db.relationship('Paciente', uselist=False, back_populates='usuario', cascade='all, delete-orphan')
#     profesional = db.relationship('Profesional',uselist=False, back_populates='usuario', cascade='all, delete-orphan')


#     def __repr__(self):
#         return f'<Usuario {self.email} ({self.rol.value})>'

#     def serialize(self):
#         return {
#             "id": self.id,
#             "email": self.email,
#             "rol": self.rol.value,
#             "nombre": self.nombre,
#             "apellido": self.apellido,
#             "is_active": self.is_active,
#             "departamento": self.departamento.serialize(),
#             # do not serialize the password, its a security breach
#         }
    
# class Paciente(db.Model):
#     __tablename__ = 'paciente'
    
#     id = db.Column(db.Integer, primary_key=True)
#     id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'), unique=True, nullable=False)
#     usuario = db.relationship('Usuario', back_populates='paciente')
#     # historia_clinica = db.Column(db.TEXT, unique=False, nullable=False)
#     # comentarios_paciente= db.relationship('Comentario_paciente_profesional',backref='paciente',lazy=True)
#     # notificaciones_paciente=db.relationship('Notificacion',backref='paciente',lazy=True)

#     def __repr__(self):
#         return f'<Paciente {self.usuario},{self.id}>'

#     def serialize(self):
#         return {
#             "id": self.id,
#             "id_usuario": self.id_usuario,
#             "usuario": self.usuario.serialize(),
#             # "historia_clinica": self.historia_clinica,
#         }

# class Profesional(db.Model):
#     __tablename__ = 'profesional'
    
#     id = db.Column(db.Integer, primary_key=True)
#     id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'), unique=True, nullable=False)
#     usuario = db.relationship('Usuario', back_populates='profesional')
#     foto_perfil = db.Column(db.String(200), nullable=False)
#     fecha_nacimiento = db.Column(db.Date, nullable=False)
#     genero = db.Column(db.String(200), nullable=False) 
#     telefono = db.Column(db.String(200), nullable=False)
#     matricula = db.Column(db.String(200), nullable=False)
#     cjpu = db.Column(db.String(200), nullable=False)
#     titulo_habilitante = db.Column(db.String(200), nullable=False)
#     # profesionales_tipo_consulta = db.relationship('Tipo_consulta_profesional', back_populates='profesional')
#     # comentarios_profesional = db.relationship('Comentario_paciente_profesional',backref='profesional',lazy=True)
#     # notificaciones_profesional = db.relationship('Notificacion',backref='profesional',lazy=True)
#     # id_pais = db.Column(db.Integer, db.ForeignKey('pais.id'))
#     # id_ciudad = db.Column(db.Integer, db.ForeignKey('ciudad.id'))
#     # id_departamento = db.Column(db.Integer, db.ForeignKey('departamento.id'), nullable=False)

#     def __repr__(self):
#         return f'<Profesional {self.matricula},{self.id}>'

#     def serialize(self):
#         return {
#             "id": self.id,
#             "usuario": self.usuario.serialize(),
#             "foto_perfil": self.foto_perfil,
#             "fecha_nacimiento": self.fecha_nacimiento,
#             "genero": self.genero,
#             "telefono": self.telefono,
#             "matricula": self.matricula,
#             "cjpu": self.cjpu,
#             "titulo_habilitante": self.titulo_habilitante,
#             # "id_departamento": self.id_departamento,
#             # "pais_nacimiento": self.pais_nacimiento,
#             # "id_ciudad": self.id_ciudad,
#         }


        

""" class Especialidad(db.Model):
    __tablename__ = 'especialidad'
    
    id = db.Column(db.Integer, primary_key=True)
    descripcion = db.Column(db.String(15), unique=False, nullable=False)
    especialidad_profesional=db.relationship('Especialidad_profesional', uselist=False, backref='especialidad', lazy=True)
    
    def __repr__(self):
        return f'<Especialidad {self.id},{self.descripcion}>'

    def serialize(self):
        return {
            "id": self.id,
            "descripcion": self.descripcion
        }
    
class Especialidad_profesional(db.Model):
    __tablename__ = 'especialidad_profesional'
    
    id = db.Column(db.Integer, primary_key=True)
    id_especialidad = db.Column(db.Integer, db.ForeignKey('especialidad.id'),unique=False, nullable=False)
    id_profesional=db.Column(db.Integer, db.ForeignKey('profesional.id'), unique=False, nullable=False)
    
    def __repr__(self):
        return f'<Especialidad_profesional {self.id},{self.id_especialidad},{self.id_profesional}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_especialidad": self.id_especialidad,
            "id_profesional":self.id_profesional
        }
    
class Tipo_consulta(db.Model):
    __tablename__ = 'tipo_consulta'
    
    id = db.Column(db.Integer, primary_key=True)
    descripcion = db.Column(db.String(10), unique=False, nullable=False)
    tipos_consulta= db.relationship('Tipo_consulta_profesional', back_populates='tipo_consulta')
    consultas_tipo_consulta= db.relationship('Consulta', backref= 'tipo_consulta', lazy= True)

    def __repr__(self):
        return f'<Tipo_consulta {self.id},{self.descripcion}>'

    def serialize(self):
        return {
            "id": self.id,
            "descripcion": self.descripcion      
        }

class Tipo_consulta_profesional(db.Model):
    __tablename__ = 'tipo_consulta_profesional'
    
    id = db.Column(db.Integer, primary_key=True)
    id_tipo_consulta = db.Column(db.Integer, db.ForeignKey('tipo_consulta.id'), unique=False, nullable=False)
    id_profesional = db.Column(db.Integer, db.ForeignKey('profesional.id'), unique=False, nullable=False)
    profesional=db.relationship(Profesional)
    tipo_consulta=db.relationship(Tipo_consulta)
    
    def __repr__(self):
        return f'<Tipo_consulta_profesional {self.id},{self.descripcion},{self.id_profesional}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_tipo_consulta": self.id_tipo_consulta, 
            "id_profesional": self.id_profesional    
        }
    
class Ciudad(db.Model):
    __tablename__ = 'ciudad'
    
    id = db.Column(db.Integer, primary_key=True)
    descripcion = db.Column(db.String(15), unique=False, nullable=False)
    id_departamento=db.Column(db.Integer, db.ForeignKey('departamento.id'), unique=False, nullable=False)
    
    def __repr__(self):
        return f'<Ciudad {self.id},{self.descripcion}>'

    def serialize(self):
        return {
            "id": self.id,
            "descripcion": self.descripcion, 
        }    

class Pais(db.Model):
    __tablename__ = 'pais'
    
    id = db.Column(db.Integer, primary_key=True)
    nombre_pais = db.Column(db.String(20), unique=False, nullable=False)
    paises=db.relationship('Profesional', backref='pais', lazy=True)
    
    def __repr__(self):
        return f'<Pais {self.id},{self.nombre_pais}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre_pais": self.nombre_pais, 
        }    
    
class Comentario(db.Model):
    __tablename__ = 'comentario'
    
    id = db.Column(db.Integer, primary_key=True)
    descripcion = db.Column(db.String(50), unique=False, nullable=False)
    puntaje=db.Column(db.Integer, unique=False, nullable=False)
    comentarios= db.relationship('Comentario_paciente_profesional',backref='comentario',lazy=True)
    
    def __repr__(self):
        return f'<Comentario {self.id},{self.descripcion}>'

    def serialize(self):
        return {
            "id": self.id,
            "descripcion": self.descripcion
        }    
    
class Comentario_paciente_profesional(db.Model):
    __tablename__ = 'comentario_paciente_profesional'
    
    id = db.Column(db.Integer, primary_key=True)
    id_comentario = db.Column(db.Integer, db.ForeignKey('comentario.id'),unique=False, nullable=False)
    id_profesional=db.Column(db.Integer, db.ForeignKey('profesional.id'),unique=False, nullable=False)
    id_paciente=db.Column(db.Integer, db.ForeignKey('paciente.id'),unique=False, nullable=False)
    
    def __repr__(self):
        return f'<Comentario_paciente_profesional {self.id},{self.id_comentario}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_comentario": self.id_comentario,
            "id_profesional": self.id_profesional,
            "id_paciente": self.id_paciente
        }    
    
class Notificacion(db.Model):
    __tablename__ = 'notificacion'
    
    id = db.Column(db.Integer, primary_key=True)
    descripcion = db.Column(db.Integer, db.ForeignKey('comentario.id'),unique=False, nullable=False)
    id_reserva=db.Column(db.Integer, db.ForeignKey('reserva.id'),unique=False, nullable=False)
    id_paciente=db.Column(db.Integer, db.ForeignKey('paciente.id'),unique=False, nullable=False)
    id_profesional=db.Column(db.Integer, db.ForeignKey('profesional.id'),unique=False, nullable=False)
    
    def __repr__(self):
        return f'<Notificacion {self.id},{self.id_reserva},{self.descripcion}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_reserva": self.id_comentario,
            "id_profesional": self.id_profesional,
            "id_paciente": self.id_paciente
        }    

class Reserva(db.Model):
    __tablename__ = 'reserva'
    
    id = db.Column(db.Integer, primary_key=True)
    confirmacion = db.Column(db.Integer,unique=False, nullable=False)
    id_medio_pago=db.Column(db.Integer, db.ForeignKey('medio_de_pago.id'),unique=False, nullable=False)
    id_paciente=db.Column(db.Integer, db.ForeignKey('paciente.id'),unique=False, nullable=False)
    id_consulta=db.Column(db.Integer, db.ForeignKey('consulta.id'),unique=False, nullable=False)
    notificaciones_reserva=db.relationship('Notificacion',backref='reserva',lazy=True)
    
    def __repr__(self):
        return f'<Reserva {self.id},{self.confirmacion},{self.id_paciente}>'

    def serialize(self):
        return {
            "id": self.id,
            "confirmacion": self.confirmacion,
            "id_medio_pago": self.id_medio_pago,
            "id_paciente": self.id_paciente,
            "id_consulta": self.id_consulta
        }    
    
class Medio_de_pago(db.Model):
    __tablename__ = 'medio_de_pago'
    
    id = db.Column(db.Integer, primary_key=True)
    forma_pago = db.Column(db.String(20),unique=False, nullable=False)
    financiera=db.Column(db.String(20),unique=False, nullable=False)
    cuotas=db.Column(db.Integer,unique=False, nullable=False)
    
    def __repr__(self):
        return f'<Medio_de_pago {self.id},{self.forma_pago},{self.financiera},{self.cuotas}>'

    def serialize(self):
        return {
            "id": self.id,
            "forma_pago": self.forma_pago,
            "financiera": self.financiera,
            "cuotas": self.cuotas         
        }

class Consulta(db.Model):
    __tablename__ = 'consulta'
    
    id = db.Column(db.Integer, primary_key=True)
    valor_consulta = db.Column(db.Integer,unique=False, nullable=False)
    motivo_consulta=db.Column(db.String(50),unique=False, nullable=False)
    id_tipo_consulta=db.Column(db.Integer, db.ForeignKey('tipo_consulta.id'),unique=False, nullable=False)
    
    def __repr__(self):
        return f'<Consulta {self.id},{self.valor_consulta},{self.motivo_consulta},{self.id_tipo_consulta}>'

    def serialize(self):
        return {
            "id": self.id,
            "valor_consulta": self.valor_consulta,
            "motivo_consulta": self.motivo_consulta,
            "id_tipo_consulta": self.id_tipo_consulta         
        }    """     
        
        
        
        
""" ##############################ver de aplicar o no, cuando se incorpore calendly################################################
class Disponibilidad(db.Model):
    __tablename__ = 'disponibilidad'
    
    id = db.Column(db.Integer, primary_key=True)
    dia = db.Column(db.Date,unique=False, nullable=False)
    hora=db.Column(db.datetime,unique=False, nullable=False)
    id_profesional=db.Column(db.Integer, db.ForeignKey('profesional.id'),unique=False, nullable=False)
    id_consulta=db.Column(db.Integer, db.ForeignKey('consulta.id'),unique=False, nullable=False)
    
    def __repr__(self):
        return f'<Disponibilidad {self.id},{self.dia},{self.hora},{self.id_profesional},,{self.id_consulta}>'

    def serialize(self):
        return {
            "id": self.id,
            "dia": self.dia,
            "hora": self.hora,
            "id_profesional": self.id_profesional,
            "id_consulta": self.id_consulta         
        }        
 """

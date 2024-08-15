from flask_sqlalchemy import SQLAlchemy
from enum import Enum 

db = SQLAlchemy()

class RolEnum(Enum):
    ADMINISTRADOR= "administrador"
    PACIENTE= "paciente"
    PROFESIONAL= "profesional"

class Usuario(db.Model):
    __tablename__ = 'usuario'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(200), unique=True, nullable=False)
    clave = db.Column(db.String(200), unique=False, nullable=False)
    rol=db.Column(db.Enum(RolEnum),nullable=False, default=RolEnum.PACIENTE)
    nombre = db.Column(db.String(100), unique=False, nullable=False)
    apellido = db.Column(db.String(100), unique=False, nullable=False)
    fecha_nacimiento=db.Column(db.Date, unique=False, nullable=False)
    esta_activo = db.Column(db.Boolean(), unique=False, default=False)
    paciente = db.relationship('Paciente', uselist=False, backref='usuario', lazy=True, cascade='all, delete-orphan') 
    profesional= db.relationship('Profesional',uselist=False,backref='usuario', lazy=True, cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Usuario {self.id},{self.rol},{self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "rol": self.rol.value,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "fecha_nacimiento": self.fecha_nacimiento,
            "esta_activo": self.esta_activo
            # do not serialize the password, its a security breach
        }
    
class Paciente(db.Model):
    __tablename__ = 'paciente'
    
    id = db.Column(db.Integer, primary_key=True)
    historia_clinica = db.Column(db.TEXT, unique=False, nullable=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'),unique=False, nullable=False)
    comentarios_paciente= db.relationship('Comentario_paciente_profesional',backref='paciente',lazy=True)
    # notificaciones_paciente=db.relationship('Notificacion',backref='paciente',lazy=True)

    def __repr__(self):
        return f'<Paciente {self.id_usuario},{self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "historia_clinica": self.historia_clinica,
            "id_usuario": self.id_usuario
        }

class Profesional(db.Model):
    __tablename__ = 'profesional'
    
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
    # notificaciones_profesional=db.relationship('Notificacion',backref='profesional',lazy=True)

    def __repr__(self):
        return f'<Profesional {self.matricula},{self.id}>'

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
        }

class Especialidad(db.Model):
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
    
class Departamento(db.Model):
    __tablename__ = 'departamento'
    
    id = db.Column(db.Integer, primary_key=True)
    descripcion = db.Column(db.String(15), unique=False, nullable=False)
    departamentos=db.relationship('Profesional', backref='departamento', lazy=True)
    ciudades=db.relationship('Ciudad', backref='departamento', lazy=True)
    
    def __repr__(self):
        return f'<Departamento {self.id},{self.descripcion}>'

    def serialize(self):
        return {
            "id": self.id,
            "descripcion": self.descripcion, 
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
    
class Reserva(db.Model):
    __tablename__ = 'reserva'
    
    id = db.Column(db.Integer, primary_key=True)
    confirmacion = db.Column(db.Integer,unique=False, nullable=False)
    id_medio_pago=db.Column(db.Integer, db.ForeignKey('medio_de_pago.id'),unique=False, nullable=False)
    id_paciente=db.Column(db.Integer, db.ForeignKey('paciente.id'),unique=False, nullable=False)
    id_consulta=db.Column(db.Integer, db.ForeignKey('consulta.id'),unique=False, nullable=False)
    cancelar_cita_url=db.Column(db.String(200),unique=False, nullable=False)
    reprogramar_url=db.Column(db.String(200),unique=False, nullable=False)
    crear_cita=db.Column(db.String(200),unique=False, nullable=False)
    estado=db.Column(db.String(200),unique=False, nullable=False)
    url_usuario_calendly=db.Column(db.String(200),unique=False, nullable=False)
    # notificaciones_reserva=db.relationship('Notificacion',backref='reserva',lazy=True)
    
    def __repr__(self):
        return f'<Reserva {self.id},{self.confirmacion},{self.id_paciente}>'

    def serialize(self):
        return {
            "id": self.id,
            "confirmacion": self.confirmacion,
            "id_medio_pago": self.id_medio_pago,
            "id_paciente": self.id_paciente,
            "id_consulta": self.id_consulta,
            "cancelar_cita_url": self.cancelar_cita_url,
            "reprogramar_url": self.reprogramar_url,
            "crear_cita": self.crear_cita,
            "estado": self.estado,
            "url_usuario_calendly": self.url_usuario_calendly
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
        }        
###############################ver de aplicar o no, cuando se incorpore calendly################################################
# class Disponibilidad(db.Model):
#     __tablename__ = 'disponibilidad'
    
#     id = db.Column(db.Integer, primary_key=True)
#     dia = db.Column(db.Date,unique=False, nullable=False)
#     hora=db.Column(db.datetime,unique=False, nullable=False)
#     id_profesional=db.Column(db.Integer, db.ForeignKey('profesional.id'),unique=False, nullable=False)
#     id_consulta=db.Column(db.Integer, db.ForeignKey('consulta.id'),unique=False, nullable=False)
    
#     def __repr__(self):
#         return f'<Disponibilidad {self.id},{self.dia},{self.hora},{self.id_profesional},,{self.id_consulta}>'

#     def serialize(self):
#         return {
#             "id": self.id,
#             "dia": self.dia,
#             "hora": self.hora,
#             "id_profesional": self.id_profesional,
#             "id_consulta": self.id_consulta         
#         }        

# class Notificacion(db.Model):
#     __tablename__ = 'notificacion'
    
#     id = db.Column(db.Integer, primary_key=True)
#     descripcion = db.Column(db.Integer, db.ForeignKey('comentario.id'),unique=False, nullable=False)
#     id_reserva=db.Column(db.Integer, db.ForeignKey('reserva.id'),unique=False, nullable=False)
#     id_paciente=db.Column(db.Integer, db.ForeignKey('paciente.id'),unique=False, nullable=False)
#     id_profesional=db.Column(db.Integer, db.ForeignKey('profesional.id'),unique=False, nullable=False)
    
#     def __repr__(self):
#         return f'<Notificacion {self.id},{self.id_reserva},{self.descripcion}>'

#     def serialize(self):
#         return {
#             "id": self.id,
#             "id_reserva": self.id_comentario,
#             "id_profesional": self.id_profesional,
#             "id_paciente": self.id_paciente
#         }    
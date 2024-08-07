from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Enum

db = SQLAlchemy()

class RolEnum(Enum):
    ADMINISTRADOR= "administrador"
    PACIENTE= "paciente"
    PROFESIONAL= "profesional"

class Usuario_sistema(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_paciente = db.Column(db.String(120), unique=True, nullable=False)
    id_profesional = db.Column(db.String(80), unique=False, nullable=False)
    rol=db.Column(db.Enum(RolEnum),nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<Usuario_sistema {self.id_paciente},{self.rol}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_paciente": self.paciente,
            "id_profesional": self.id_profesional,
            "rol": self.rol,
            # do not serialize the password, its a security breach
        }
    

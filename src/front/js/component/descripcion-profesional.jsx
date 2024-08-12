import React from "react";
import "../../styles/home.css";

export const DescripcionProfesional = ({ id }) => {

    const profesionales = [
                {
            id: 5,
            usuario: {
              nombre: "Laura",
              apellido: "Rodríguez",
            },
            foto_perfil: "https://via.placeholder.com/150",
            fecha_nacimiento: "1992-05-15",
            genero: "femenino",
            descripcion:
              "Nutricionista especializada en alimentación saludable y control de peso. Cuenta con experiencia en el diseño de planes nutricionales personalizados y el tratamiento de trastornos alimentarios. Apasionada por promover hábitos alimentarios saludables y mejorar la calidad de vida de sus pacientes.",
            departamento: "durazno",
            telefono: 94855515,
            matricula: 12342356,
            cjpu: 32563546743675,
            calificacion: 4,
            titulo_habilitante: "Licenciada en Nutrición",
            especialidad: "nutricionista",
          },
          {
            id: 6,
            usuario: {
              nombre: "Alejandro",
              apellido: "López",
            },
            foto_perfil: "https://via.placeholder.com/150",
            fecha_nacimiento: "1985-09-20",
            genero: "masculino",
            descripcion:
              "Dermatólogo especializado en el diagnóstico y tratamiento de enfermedades de la piel. Cuenta con experiencia en el manejo de afecciones como acné, dermatitis y cáncer de piel. Apasionado por brindar una atención integral y personalizada para mejorar la salud y apariencia de la piel de sus pacientes.",
            departamento: "florida",
            telefono: 94855515,
            matricula: 12242356,
            cjpu: 3256354577675,
            calificacion: 5,
            titulo_habilitante: "Licenciado en Dermatología",
            especialidad: "dermatologo",
          },
          {
            id: 7,
            usuario: {
              nombre: "Ana",
              apellido: "López",
            },
            foto_perfil: "https://via.placeholder.com/150",
            fecha_nacimiento: "1990-12-05",
            genero: "femenino",
            descripcion:
              "Ginecóloga especializada en salud reproductiva y atención prenatal. Cuenta con experiencia en el diagnóstico y tratamiento de enfermedades ginecológicas y seguimiento de embarazos. Apasionada por brindar cuidados de calidad y promover la salud de las mujeres en todas las etapas de su vida.",
            departamento: "maldonado",
            telefono: 94855515,
            matricula: 12242356,
            cjpu: 3256354577675,
            calificacion: 5,
            titulo_habilitante: "Licenciada en Medicina",
            especialidad: "ginecologo",
          },
          {
            id: 8,
            usuario: {
              nombre: "Pedro",
              apellido: "Gómez",
            },
            foto_perfil: "https://via.placeholder.com/150",
            fecha_nacimiento: "1988-08-18",
            genero: "masculino",
            descripcion:
              "Cardiólogo especializado en el diagnóstico y tratamiento de enfermedades del corazón. Cuenta con experiencia en el manejo de enfermedades cardiovasculares y realización de estudios cardiológicos. Apasionado por brindar atención integral y contribuir a la salud cardiovascular de sus pacientes.",
            departamento: "paysandu",
            telefono: 94855515,
            matricula: 12242356,
            cjpu: 3256354577675,
            calificacion: 4,
            titulo_habilitante: "Licenciado en Medicina",
            especialidad: "cardiologo",
          },
          {
            id: 9,
            usuario: {
              nombre: "Sofía",
              apellido: "Hernández",
            },
            foto_perfil: "https://via.placeholder.com/150",
            fecha_nacimiento: "1993-03-25",
            genero: "femenino",
            descripcion:
              "Psiquiatra especializada en el diagnóstico y tratamiento de trastornos mentales. Cuenta con experiencia en el manejo de trastornos de ansiedad, depresión y trastornos del estado de ánimo. Apasionada por brindar apoyo y mejorar la calidad de vida de sus pacientes a través de la psicoterapia y el uso de medicamentos.",
            departamento: "montevideo",
            telefono: 94855515,
            matricula: 12242356,
            cjpu: 3256354577675,
            calificacion: 5,
            titulo_habilitante: "Licenciada en Medicina",
            especialidad: "psiquiatra",
          },
          {
            id: 10,
            usuario: {
              nombre: "María",
              apellido: "González",
            },
            foto_perfil: "https://via.placeholder.com/150",
            fecha_nacimiento: "1991-07-10",
            genero: "femenino",
            descripcion:
              "Fisioterapeuta especializada en rehabilitación física y terapia manual. Cuenta con experiencia en el tratamiento de lesiones musculoesqueléticas y recuperación postoperatoria. Apasionada por ayudar a sus pacientes a mejorar su movilidad y calidad de vida.",
            departamento: "montevideo",
            telefono: 94855515,
            matricula: 12242356,
            cjpu: 3256354577675,
            calificacion: 4,
            titulo_habilitante: "Licenciada en Fisioterapia",
            especialidad: "fisioterapeuta",
          },
          {
            id: 11,
            usuario: {
              nombre: "Carlos",
              apellido: "Martínez",
            },
            foto_perfil: "https://via.placeholder.com/150",
            fecha_nacimiento: "1987-11-28",
            genero: "masculino",
            descripcion:
              "Psicólogo especializado en terapia cognitivo-conductual. Cuenta con experiencia en el tratamiento de trastornos de ansiedad, depresión y trastornos de la conducta alimentaria. Apasionado por ayudar a sus pacientes a desarrollar habilidades de afrontamiento y mejorar su bienestar emocional.",
            departamento: "lavalleja",
            telefono: 94855515,
            matricula: 12242356,
            cjpu: 3256354577675,
            calificacion: 5,
            titulo_habilitante: "Licenciado en Psicología",
            especialidad: "psicologo",
          },
          {
            id: 12,
            usuario: {
              nombre: "Mariano",
              apellido: "López",
            },
            foto_perfil: "https://via.placeholder.com/150",
            fecha_nacimiento: "1986-02-12",
            genero: "masculino",
            descripcion:
              "Oculista especializado en el diagnóstico y tratamiento de enfermedades oculares. Cuenta con experiencia en el manejo de afecciones como miopía, astigmatismo y cataratas. Apasionado por preservar la salud visual y mejorar la calidad de vida de sus pacientes.",
            departamento: "treinta-y-tres",
            telefono: 94855515,
            matricula: 12242356,
            cjpu: 3256354577675,
            calificacion: 4,
            titulo_habilitante: "Licenciado en Medicina",
            especialidad: "oculista",
          },
          {
            id: 13,
            usuario: {
              nombre: "Lucía",
              apellido: "Fernández",
            },
            foto_perfil: "https://via.placeholder.com/150",
            fecha_nacimiento: "1994-09-08",
            genero: "femenino",
            descripcion:
              "Kinesióloga especializada en rehabilitación física y terapia de movimiento. Cuenta con experiencia en el tratamiento de lesiones deportivas y recuperación postoperatoria. Apasionada por ayudar a sus pacientes a recuperar su funcionalidad y mejorar su calidad de vida.",
            departamento: "salto",
            telefono: 94855515,
            matricula: 12242356,
            cjpu: 3256354577675,
            calificacion: 5,
            titulo_habilitante: "Licenciada en Kinesiología",
            especialidad: "kinesiologo",
          },
          {
            id: 14,
            usuario: {
              nombre: "Javier",
              apellido: "Rojas",
            },
            foto_perfil: "https://via.placeholder.com/150",
            fecha_nacimiento: "1989-12-30",
            genero: "masculino",
            descripcion:
              "Radiólogo especializado en diagnóstico por imágenes. Cuenta con experiencia en la interpretación de radiografías, ecografías y resonancias magnéticas. Apasionado por contribuir al diagnóstico preciso y oportuno de enfermedades a través de la radiología.",
            departamento: "san-jose",
            telefono: 94855515,
            matricula: 12242356,
            cjpu: 3256354577675,
            calificacion: 4,
            titulo_habilitante: "Licenciado en Medicina",
            especialidad: "radiologo",
          },
    ];

    const profesional = profesionales.find(prof => prof.id === parseInt(id));

    if (!profesional) {
        return <div>Profesional no encontrado</div>;
    }

    return (
        <div className="container contenido">
            <img src={profesional.foto_perfil} className="rounded-circle mx-auto d-block w-5" alt="..."></img>
            <h1 className="text-title text-center text-primary">{profesional.usuario.nombre}</h1>
            <h1 className="text-title text-center text-primary">{profesional.usuario.apellido}</h1>

            <h3 className="text-subtitle text-center">{profesional.especialidad}</h3>
            <h5 className="text-normal text-center fw-semibold">{profesional.departamento}</h5>
            <hr />
            <div className="row mt-3 d-flex justify-content-center">
                <div className="col text-center">
                    <h6>Calificación</h6>
                    <p className="text-secondary"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></p>
                </div>
                <div className="col text-center">
                    <h6>Reseñas</h6>
                    <p className="text-secondary fw-bold">1</p>
                </div>
                <hr />
                <div>
                    <h6 className="text-center text-subtitle">Descripción</h6>
                    <p className="px-2">{profesional.descripcion}</p>
                </div>
                <div>
                    <h6 className="text-center text-subtitle pt-3">Reseñas</h6>
                </div>
            </div>
        </div>
    )
};

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { ProfesionalCard } from "../component/ProfesionalCard.jsx";

const destacados = [
  {
    id: 1,
    usuario: {
      nombre: "Juan",
      apellido: "Pérez",
    },
    foto_perfil: "https://via.placeholder.com/150",
    fecha_nacimiento: "1990-01-01",
    genero: "masculino",
    descripcion:
      "Fisioterapeuta especializado en traumatología y rehabilitación. Cuenta con más de 10 años de experiencia en el tratamiento de lesiones deportivas y recuperación postoperatoria. Apasionado por ayudar a sus pacientes a alcanzar su máximo potencial físico y mejorar su calidad de vida.",
    departamento: "artigas",
    telefono: 94843304,
    matricula: 123456,
    cjpu: 32563456743255,
    calificacion: 5,
    titulo_habilitante: "Licenciado en Fisioterapia",
  },
  {
    id: 2,
    usuario: {
      nombre: "María",
      apellido: "González",
    },
    foto_perfil: "https://via.placeholder.com/150",
    fecha_nacimiento: "1995-06-12",
    genero: "femenino",
    descripcion:
      "Psicóloga especializada en terapia cognitivo-conductual y psicología clínica infantil. Cuenta con amplia experiencia en el tratamiento de trastornos de ansiedad, depresión y problemas de conducta en niños y adolescentes. Apasionada por ayudar a sus pacientes a desarrollar habilidades emocionales y alcanzar un bienestar mental óptimo.",
    departamento: "canelones",
    telefono: 94853535,
    matricula: 123456,
    cjpu: 32563456743255,
    calificacion: 4,
    titulo_habilitante: "Licenciado en Psicología",
  },
  {
    id: 3,
    usuario: {
      nombre: "Gabriela",
      apellido: "Martínez",
    },
    foto_perfil: "https://via.placeholder.com/150",
    fecha_nacimiento: "2000-03-02",
    genero: "femenino",
    descripcion:
      "Oftalmóloga especializada en el diagnóstico y tratamiento de enfermedades oculares. Cuenta con experiencia en cirugía refractiva y atención de patologías como cataratas, glaucoma y degeneración macular. Apasionada por brindar una atención integral y personalizada a sus pacientes para preservar y mejorar su salud visual.",
    departamento: "rivera",
    telefono: 94855515,
    matricula: 12342356,
    cjpu: 32563546743675,
    calificacion: 5,
    titulo_habilitante: "Licenciado en Oftalmología",
  },
  {
    id: 4,
    usuario: {
      nombre: "Carlos",
      apellido: "Fernández",
    },
    foto_perfil: "https://via.placeholder.com/150",
    fecha_nacimiento: "1998-01-09",
    genero: "masculino",
    descripcion:
      "Fisioterapeuta especializado en traumatología y rehabilitación. Cuenta con experiencia en el tratamiento de lesiones musculoesqueléticas y afecciones crónicas. Apasionado por ayudar a sus pacientes a recuperar su funcionalidad y mejorar su calidad de vida a través de terapias manuales y ejercicios terapéuticos.",
    departamento: "montevideo",
    telefono: 94855515,
    matricula: 12242356,
    cjpu: 3256354577675,
    calificacion: 4,
    titulo_habilitante: "Licenciado en Fisioterapia",
  },
];

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

export const Profesionales = () => {
  const [especialidad, setEspecialidad] = useState("");
  const [departamento, setDepartamento] = useState("");

  const filteredProfesionales = profesionales.filter((profesional) => {
    if (especialidad && departamento) {
      return (
        profesional.especialidad.toLowerCase().includes(especialidad) &&
        profesional.departamento.toLowerCase().includes(departamento)
      );
    } else if (especialidad) {
      return profesional.especialidad.toLowerCase().includes(especialidad);
    } else if (departamento) {
      return profesional.departamento.toLowerCase().includes(departamento);
    } else {
      return profesional;
    }
  });

  return (
    <div className="container contenido">
      <h2 className="text-primary text-title text-center">Profesionales</h2>
      <div className="d-flex flex-column gap-4">
        <div>
          <h3 className="text-subtitle text-center">Destacados</h3>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            spaceBetween={10}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: true }}
            breakpoints={{
              1024: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
          >
            {destacados.map((profesional) => (
              <SwiperSlide key={profesional.id}>
                <ProfesionalCard profesional={profesional} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div>
          <h3 className="text-subtitle text-center">Filtros</h3>
          <div className="d-flex justify-content-center gap-4">
            <div className="d-flex flex-column">
              <label htmlFor="especialidad" className="form-label">
                Especialidad
              </label>
              <select
                className="form-select"
                id="especialidad"
                aria-label="Especialidad"
                value={especialidad}
                onChange={(e) => setEspecialidad(e.target.value)}
              >
                <option value="">Seleccionar especialidad</option>
                <option value="fisioterapeuta">Fisioterapeuta</option>
                <option value="psicologo">Psicólogo</option>
                <option value="nutricionista">Nutricionista</option>
                <option value="dermatologo">Dermatólogo</option>
                <option value="radiologo">Radiólogo</option>
                <option value="oculista">Oculista</option>
                <option value="kinesiologo">Kinesiólogo</option>
                <option value="odontologo">Odontólogo</option>
              </select>
            </div>

            <div className="d-flex flex-column">
              <label htmlFor="departamento" className="form-label">
                Departamento
              </label>
              <select
                className="form-select"
                id="departamento"
                aria-label="Departamento"
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
              >
                <option value="">Seleccionar departamento</option>
                <option value="artigas">Artigas</option>
                <option value="canelones">Canelones</option>
                <option value="cerro-largo">Cerro Largo</option>
                <option value="colonia">Colonia</option>
                <option value="durazno">Durazno</option>
                <option value="flores">Flores</option>
                <option value="florida">Florida</option>
                <option value="lavalleja">Lavalleja</option>
                <option value="maldonado">Maldonado</option>
                <option value="montevideo">Montevideo</option>
                <option value="paysandu">Paysandú</option>
                <option value="rio-negro">Río Negro</option>
                <option value="rivera">Rivera</option>
                <option value="rocha">Rocha</option>
                <option value="salto">Salto</option>
                <option value="san-jose">San José</option>
                <option value="soriano">Soriano</option>
                <option value="tacuarembo">Tacuarembó</option>
                <option value="treinta-y-tres">Treinta y Tres</option>
              </select>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column gap-4 py-4">
          {
            filteredProfesionales.length > 0 ? (
              filteredProfesionales.map(profesional => (
                <ProfesionalCard key={profesional.id} profesional={profesional} />
              ))
            ) : (
              <h2 className="text-subtitle text-center">No encontramos profesionales con estos filtros</h2>
            )
          }
        </div>
      </div>
    </div>
  );
};

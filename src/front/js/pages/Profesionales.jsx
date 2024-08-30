import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Context } from "../store/appContext";
import "swiper/css";
import "swiper/css/autoplay";
import { ProfesionalCard } from "../component/ProfesionalCard.jsx";

export const Profesionales = () => {
  const { actions } = useContext(Context);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [currentState, setCurrentState] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [professionals, setProfessionals] = useState([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [professionals, states] = await Promise.all([
        actions.getProfessionals(),
        actions.getStates(),
      ]);
      setProfessionals(professionals);
      setStates(states);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getCitiesByState = async () => {
      if (currentState) {
        const cities = await actions.getCitiesByState(currentState);
        setCities(cities);
      } else {
        setCities([]);
      }
    }

    getCitiesByState();
  }, [currentState]);

  useEffect(() => {
    const filterProfessionals = () => {
      let filtered = professionals;

      if (currentState) {
        filtered = filtered.filter(professional => professional.city.state.id == currentState);
      }

      if (currentCity) {
        filtered = filtered.filter(professional => professional.city.id == currentCity);
      }

      setFilteredProfessionals(filtered);
    }

    filterProfessionals();
  }, [currentState, currentCity, professionals]);

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
            {/* {destacados.map((profesional) => (
              <SwiperSlide key={profesional.id}>
                <ProfesionalCard profesional={profesional} />
              </SwiperSlide>
            ))} */}
          </Swiper>
        </div>

        <div>
          <h3 className="text-subtitle text-center">Filtros</h3>
          <div className="d-flex justify-content-center gap-4">
            {/* <div className="d-flex flex-column">
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
            </div> */}

            <div className="d-flex flex-column">
              <label htmlFor="state" className="form-label">
                Departamento
              </label>
              <select
                className="form-select"
                id="state"
                aria-label="Departamento"
                value={currentState}
                onChange={(e) => setCurrentState(e.target.value)}
              >
                <option value="">Seleccionar departamento</option>
                {
                  states?.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))
                }
              </select>
            </div>

            <div className="d-flex flex-column">
              <label htmlFor="city" className="form-label">
                Ciudad
              </label>
              <select
                className="form-select"
                id="city"
                aria-label="Ciudad"
                value={currentCity}
                onChange={(e) => setCurrentCity(e.target.value)}
              >
                <option value="">Seleccionar ciudad</option>
                {
                  cities?.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column gap-4 py-4">
          {filteredProfessionals?.length > 0 ? (
            filteredProfessionals?.map((professional) => (
              <ProfesionalCard
                key={professional.id}
                professional={professional}
              />
            ))
          ) : (
            <h2 className="text-subtitle text-center">
              No encontramos profesionales con estos filtros
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

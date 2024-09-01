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
    <div>
      <h1 className="mb-8  mt-14 text-5xl font-bold text-center">Profesionales</h1>
      <div className="d-flex flex-column gap-4">
        <div>
          {/* <h3 className="text-subtitle text-center">Destacados</h3> */}
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
          <h3 className="text-lg text-center text-gray-500">Encuentra al profesional que se adapte a tus necesidades</h3>
          <div className="d-flex justify-content-center">
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
            {/* 
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
        </div> */}

            <div className="flex mt-12 gap-12 mx-24">
{/* Select para Especialidad */}
{/* <div className="flex-1 w-64">
    <label htmlFor="especialidad" className="text-sm font-medium mb-2">
      Especialidad
    </label>
    <select
      className="select select-bordered w-full"
      id="especialidad"
      aria-label="Especialidad"
      value={speciality}
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
    </select> */}

              {/* Select para Departamento */}
              <div className="flex-1 w-64 text-center">
                <label htmlFor="state" className="text-sm font-medium  mb-2">
                  Departamento
                </label>
                <select
                  className="select select-bordered w-full"
                  id="state"
                  aria-label="Departamento"
                  value={currentState}
                  onChange={(e) => setCurrentState(e.target.value)}
                >
                  <option value="">Seleccionar departamento</option>
                  {states?.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select para Ciudad */}
              <div className="flex-1 w-64 text-center">
                <label htmlFor="city" className="text-sm font-medium mb-2">
                  Localidad
                </label>
                <select
                  className="select select-bordered w-full"
                  id="city"
                  aria-label="Ciudad"
                  value={currentCity}
                  onChange={(e) => setCurrentCity(e.target.value)}
                >
                  <option value="">Seleccionar localidad</option>
                  {cities?.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>


            <div className="flex justify-center my-6">
              {filteredProfessionals?.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredProfessionals?.map((professional) => (
                    <ProfesionalCard
                      key={professional.id}
                      professional={professional}
                      className="w-full max-w-sm mx-auto shadow-md rounded-lg overflow-hidden"
                    />
                  ))}
                </div>
              ) : (
                <h2 className="text-lg text-center text-gray-500">
                  No encontramos profesionales con estos filtros
                </h2>
              )}
            </div>

            {/* <div className="flex justify-center">
              {filteredProfessionals?.length > 0 ? (
                <div className="grid">
                  {filteredProfessionals?.map((professional) => (
                    <ProfesionalCard
                      key={professional.id}
                      professional={professional}
                      className="w-full max-w-md mx-auto"
                    />
                  ))}
                </div>
              ) : (
                <h2 className="text-subtitle text-center">
                  No encontramos profesionales con estos filtros
                </h2>
              )} */}
          </div>
        </div>
        </div>
       
      </div>
      // </div>
      );
};

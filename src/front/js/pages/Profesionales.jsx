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
    <div className="pt-28 px-4 sm:px-6 lg:px-8">
    <h1 className="mb-8 text-5xl font-bold text-center">Profesionales</h1>
    <div>
      <h3 className="text-lg text-center text-gray-500">
        Encuentra al profesional que se adapte a tus necesidades
      </h3>
      <div className="flex justify-center">
        <div className="flex flex-col sm:flex-row mt-12 gap-6 sm:gap-12 w-full max-w-4xl mx-auto">
          {/* Select para Departamento */}
          <div className="flex-1 w-full sm:w-44 mb-2 sm:mb-0">
            <label htmlFor="state" className="text-sm font-medium mb-2 ps-3 block">
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
          <div className="flex-1 w-full sm:w-44">
            <label htmlFor="city" className="text-sm font-medium mb-2 ps-3 block">
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
      </div>
      <div className="flex justify-center my-6">
        {filteredProfessionals?.length > 0 ? (
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6">
            {filteredProfessionals?.map((professional) => (
              <ProfesionalCard
                key={professional.id}
                professional={professional}
                className="w-full max-w-md mx-auto shadow-md rounded-lg overflow-hidden"
              />
            ))}
          </div>
        ) : (
          <h2 className="text-lg text-center text-gray-500">
            No encontramos profesionales con estos filtros
          </h2>
        )}
      </div>
    </div>
  </div>  
  );
};
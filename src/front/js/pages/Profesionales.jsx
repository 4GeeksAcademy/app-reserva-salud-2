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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [professionals, states] = await Promise.all([
        actions.getProfessionals(),
        actions.getStates(),
      ]);
      setProfessionals(professionals);
      setStates(states);
      setLoading(false);
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

  if (loading) {
    return (
      <div className="container mx-auto pt-20 px-8">
        <div className="flex flex-col items-center gap-4">
          <div className="skeleton h-8 w-60"></div>
          <div className="skeleton h-4 w-96"></div>
        </div>

        <div className="flex justify-center gap-8 mt-12">
          <div>
            <div className="skeleton h-4 w-44 mb-2"></div>
            <div className="skeleton h-12 w-[420px]"></div>
          </div>
          <div>
            <div className="skeleton h-4 w-44 mb-2"></div>
            <div className="skeleton h-12 w-[420px]"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="skeleton h-60 w-full"></div>
          <div className="skeleton h-60 w-full"></div>
          <div className="skeleton h-60 w-full"></div>
          <div className="skeleton h-60 w-full"></div>
          <div className="skeleton h-60 w-full"></div>
          <div className="skeleton h-60 w-full"></div>
          <div className="skeleton h-60 w-full"></div>
          <div className="skeleton h-60 w-full"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container min-h-screen mx-auto pt-20 px-8">
      <h1 className="mb-4 text-4xl font-bold text-center">Profesionales</h1>
      <h2 className="text-xl font-medium text-center text-gray-500">
        Encuentra al profesional que se adapte a tus necesidades
      </h2>

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

      <div className="grid sm:grid-cols-2 gap-6 my-8">
        {filteredProfessionals?.length > 0 ? (
          filteredProfessionals?.map((professional) => (
            <ProfesionalCard
              key={professional.id}
              professional={professional}
            />
          ))
        ) : (
          <div role="alert" className="alert">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info h-6 w-6 shrink-0">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>No encontramos profesionales con estos filtros, prueba usar otros</span>
          </div>
        )}
      </div>

    </div>
  );
};
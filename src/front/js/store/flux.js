import axios from "axios";
import toast from "react-hot-toast";

export const backendApi = axios.create({
  baseURL: `${process.env.BACKEND_URL}/api`,
});

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      currentUser: null,
      currentProfessional: null,
    },
    actions: {
      // Register new user

      uploadImage: async (image) => {
        try {
          toast.loading("Subiendo imagen...");
          const formData = new FormData();
          formData.append("file", image);

          const response = await backendApi.post("/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          toast.dismiss();
          toast.success("Imagen subida exitosamente", { icon: "🚀" })
          return response.data.url;
        } catch (error) {
          toast.dismiss();
          toast.error("Error subiendo imagen");
          console.error(error);
        }
      },

      createUser: async (user) => {
        try {
          toast.loading("Creando usuario...");
          const response = await backendApi.post("/users", user);
          toast.dismiss();
          toast.success("Usuario creado exitosamente", { icon: "🚀" });
          return response;
        } catch (error) {
          toast.dismiss();
          toast.error(error.response.data.message);
          console.error(error);
          return null;
        }
      },

      getCurrentUser: async () => {
        try {
          const response = await backendApi.get("/users/me", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          return response.data;
        } catch (error) {
          console.error(error);
        }
      },

      createUserAppointment: async (appointment) => {
        try {
          toast.loading("Creando cita...");
          const response = await backendApi.post("/users/appointments", appointment, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          toast.dismiss();
          toast.success("Cita creada exitosamente", { icon: "🚀" })
          console.log(appointment)
          getActions().notifyUserAppointment(appointment)

          return response;
        } catch (error) {
          toast.dismiss();
          toast.error(error?.response?.data?.message);
          console.error(error);
          return null;
        }
      },

      getUserAppointments: async () => {
        try {
          const response = await backendApi.get('/users/appointments', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          return response.data;
        } catch (error) {
          console.error(error);
        }
      },

      // Update user
      updateUser: async (id, data) => {
        try {
          const response = await backendApi.put(`/users/${id}`, data);
          return response;
        } catch (error) {
          console.error(error);
        }
      },

      // Get all the professionals
      getProfessionals: async () => {
        try {
          const response = await backendApi.get("/professionals");
          return response.data;
        } catch (error) {
          console.error(error);
        }
      },

      // Get a single professional
      getProfessional: async (id) => {
        try {
          const response = await backendApi.get(`/professionals/${id}`);
          return response.data;
        } catch (error) {
          console.error(error);
        }
      },

      // Register new professional
      createProfessional: async (data) => {
        try {
          toast.loading("Registrando profesional...");
          const response = await backendApi.post("/professionals", data);
          toast.dismiss();
          toast.success("Profesional registrado exitosamente", { icon: "🚀" });
          return response;
        } catch (error) {
          toast.dismiss();
          toast.error(error.response.data.message);
          console.error(error);
          return null
        }
      },

      updateProfessional: async (id, data) => {
        try {
          const response = await backendApi.put(`/professionals/${id}`, data);
          return response;
        } catch (error) {
          console.error(error);
        }
      },

      getProfessionalAppointments: async () => {
        try {
          const response = await backendApi.get(`/professionals/appointments`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          return response;
        } catch (error) {
          console.error(error);
        }
      },

      deleteProfessionalAppointment: async (appointmentId, cancellationReason) => {
        try {
          const response = await backendApi.delete(`/professionals/appointments/${appointmentId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            data: { cancellation_reason: cancellationReason },
          });
          return response;
        } catch (error) {
          console.error(error);
        }
      },

      getStates: async () => {
        try {
          const response = await backendApi.get("/states");
          return response.data;
        } catch (error) {
          console.error(error);
        }
      },

      getCitiesByState: async (stateId) => {
        try {
          const response = await backendApi.get(`/states/${stateId}/cities`);
          return response.data;
        } catch (error) {
          console.error(error);
        }
      },

      getSpecialities: async () => {
        try {
          const response = await backendApi.get("/specialities");
          return response.data;
        } catch (error) {
          console.error(error);
        }
      },

      // login user
      login: async (email, password) => {
        try {
          toast.loading("Iniciando sesión...");
          const response = await backendApi.post("/login", {
            email,
            password,
          });

          localStorage.setItem("token", response.data.token);

          if (response.data.user) {
            setStore({ currentUser: response.data.user });
          } else {
            setStore({ currentProfessional: response.data.professional });
          }

          toast.dismiss();
          toast.success("Inicio de sesión exitoso", { icon: "🚀" });
          return response;
        } catch (error) {
          console.log(error)
          toast.dismiss();
          toast.error(error.response.data?.message);
          if (error.response.status === 400) {
            setStore({ currentUser: null, currentProfessional: null });
          }
          return false;
        }
      },

      verifyToken: async () => {
        const token = localStorage.getItem("token");

        if (!token) {
          setStore({ currentUser: null, currentProfessional: null });
          return false;
        }

        try {
          const response = await backendApi.get("/verify_token", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.user) {
            setStore({ currentUser: response.data.user });
          } else {
            setStore({ currentProfessional: response.data.professional });
          }
          return true;
        } catch (error) {
          localStorage.removeItem("token");
          setStore({ currentUser: null, currentProfessional: null });
          return false;
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        setStore({ currentUser: null, currentProfessional: null });
        toast.success("Cierre de sesión exitoso", { icon: "👋" });
      },

      resetPassword: async (email) => {
        try {
          const response = await backendApi.post("/reset-password", { email: email });
          toast.dismiss();

          toast.success("Correo de restablecimiento enviado con éxito", { icon: "🚀" });
          return response;

        } catch (error) {
          toast.dismiss();
          toast.error(error.response.data.message);
          console.error(error);
          return null

        }
      },

      updatePassword: async (email, new_password) => {
        try {
          const response = await backendApi.post('/new-password', {
            email: email,
            new_password: new_password
          });

          if (response.status === 200) {
            toast.success("Contraseña actualizada con éxito", { icon: "🚀" });
            return response.data;
          }
        } catch (error) {
          toast.error("Hubo un error al actualizar la contraseña.");
          console.error("Error al actualizar la contraseña:", error);
          return null;
        }
      },

      // Enviar correo al paciente con los datos de la cita que agendó:
      notifyUserAppointment: async (appointment_id) => {
        try {
          const response = await backendApi.post("/notify-appointment", { appointment_id: appointment_id });
          toast.dismiss();

          // toast.success("Se envió un correo con la información de la cita", { icon: "🚀" });
          return response;

        } catch (error) {
          // toast.dismiss();
          // toast.error(error.response.data.message);
          console.error(error);
          return null
        }
      },

      // Enviar correo profesional con los datos de cada nueva cita:
      notifyProfessionalAppointment: async (appointment_id) => {
        try {
          const response = await backendApi.post("//notify-new-appointment", { appointment_id: appointment_id });
          toast.dismiss();

          // toast.success("Se envió un correo con la información de la cita", { icon: "🚀" });
          return response;

        } catch (error) {
          // toast.dismiss();
          // toast.error(error.response.data.message);
          console.error(error);
          return null
        }
      },

      // Notificar al paciente de que el profesional canceló una cita
      notifyUserAppointmentCancellation: async (appointment_id) => {
        try {
          const response = await backendApi.post("/notify-appointment-cancelled-patient", { appointment_id: appointment_id });
          toast.dismiss();

          // toast.success("Se envió un correo al paciente para notificarle", { icon: "🚀" });
          return response;

        } catch (error) {
          // toast.dismiss();
          // toast.error(error.response.data.message);
          console.error(error);
          return null
        }
      },

      // Notificar al profesional de que el paciente canceló una cita
      notifyProfessionalAppointmentCancellation: async (appointment_id) => {
        try {
          const response = await backendApi.post("/notify-appointment-cancelled-professional", { appointment_id: appointment_id });
          toast.dismiss();

          // toast.success("Se envió un correo al profesional para notificarle", { icon: "🚀" });
          return response;

        } catch (error) {
          // toast.dismiss();
          // toast.error(error.response.data.message);
          console.error(error);
          return null
        }
      },
      // verifyEmail: async (email) => {
      //         try {
      //           const response = await backendApi.post("/verify-email", { email: email });
      //           toast.dismiss();

      //           toast.success("Correo de activación enviado con éxito", { icon: "🚀" });
      //           return response;

      //         } catch (error) {
      //           toast.dismiss();
      //           toast.error(error.response.data.message);
      //           console.error(error);
      //           return null
      //         }
      //       },

      //       activateUser: async (email) => {
      //         try {
      //           const response = await backendApi.post('/activate-user', {
      //             email: email,
      //           });

      //           if (response.status === 200) {
      //             toast.success("Cuenta actualizada con éxito", { icon: "🚀" });
      //             return response.data;
      //           }
      //         } catch (error) {
      //           toast.error("Hubo un error al activar la cuenta.");
      //           console.error("Error al activar la cuenta:", error);
      //           return null;
      //         }
      //       },

    }
  }
};


export default getState;

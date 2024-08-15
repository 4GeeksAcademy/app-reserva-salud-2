import axios from "axios";
import toast from "react-hot-toast";

const backendApi = axios.create({
  baseURL: `${process.env.BACKEND_URL}/api`,
});

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      isAuthenticated: false,
      userUri: "",
    },
    actions: {
      // signup user
      signupUser: async (email,password,fechaNacimiento,nombre,apellido) =>{
        try{
          toast.loading("En proceso de registro...");
          const register= await backendApi.post("/usuario",{
            email,password,fechaNacimiento,nombre,apellido
          });
          toast.dismiss();
          toast.success("Registro de usuario exitoso", { icon: "🚀" });
          return true;
          
        }catch(error){
          toast.dismiss();
          toast.error("Error al registrar el usuario");  
          if (error.response.status === 400) {
              toast.dismiss();
              
            }
          }
      },
      // login user
      loginUser: async (email, password) => {
        try {
          toast.loading("Iniciando sesión...");
          const response = await backendApi.post("/login", {
            email,
            password,
          });

          localStorage.setItem("token", response.data.token);
          setStore({ isAuthenticated: true });
          toast.dismiss();
          toast.success("Inicio de sesión exitoso", { icon: "🚀" });
          return true;
        } catch (error) {
          if (error.response.status === 400) {
            setStore({ isAuthenticated: false });
          }
          toast.dismiss();
          toast.error("Credenciales inválidas");
        }
      },
      verifyToken: async () => {
        const token = localStorage.getItem("token");

        if (!token) {
          setStore({ isAuthenticated: false });
          return false;
        }

        try {
          const response = await backendApi.get("/verify_token", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setStore({ isAuthenticated: true });
          return true;
        } catch (error) {
          localStorage.removeItem("token");
          setStore({ isAuthenticated: false });
          return false;
        }
      },
      logout: () => {
        localStorage.removeItem("token");
        setStore({ isAuthenticated: false });
        toast.success("Cierre de sesión exitoso", { icon: "👋" });
      },
      getCalendlyAccessToken: (code) => {
        backendApi.post("/calendly/token", { code })
          .then((response) => {
            localStorage.setItem("calendlyResponse", JSON.stringify(response.data));
          });
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
          return response.data;
        } catch (error) {
          toast.dismiss();
          toast.error("Error al registrar profesional");
          console.error(error);
          return null
        }
      },
    },
  };
};

export default getState;

import axios from "axios";
import toast from "react-hot-toast";

const backendApi = axios.create({
  baseURL: `${process.env.BACKEND_URL}/api`,
});

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      isAuthenticated: false,
    },
    actions: {
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
            toast.dismiss();
            return toast.error("Credenciales inválidas");
          }
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
          const response = await backendApi.post("/professionals", data);
          return response.data;
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
};

export default getState;

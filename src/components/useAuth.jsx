import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useAuth = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  
  useEffect(() => {
    if (!accessToken) {
      console.log("hi");
      toast.error("Please login first", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      navigate("/login", { replace: true });
    }
  }, []);
};

export default useAuth;

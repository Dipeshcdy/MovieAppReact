import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const adminAuth = () => {
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
    else
    {
      const decoded = jwtDecode(accessToken);
      var role=decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      if(role!="Admin")
      {
          navigate("/", { replace: true });
          toast.error('UnAuthorized', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "dark",
              });   
      }
    }
  }, []);
};

export default adminAuth;

import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const [showPassword,setShowPassword]=useState(false);
  const [rememberMe,setRememberMe]=useState(false);
  const email = useRef(); //email reference usestate alternative
  const pass = useRef(); //password reference
  const navigate = useNavigate(); // using navigate hoook

  const handleCheckboxChange = (event) => {
    setShowPassword(event.target.checked);  
  };
  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);  
  };
 
  //start of loginHandler function
  const loginHandler = async (e) => {
    e.preventDefault();

    // to make payload to send through api of user data through payload
    const loginData = {
      email: email.current.value,
      rememberMe: rememberMe,
      password: pass.current.value,
    };
    console.log(loginData);
    try {
      const response = await axios.post(
        "https://localhost:44389/api/Authentication",
        loginData
      );
      console.log(response);
      if (response.status === 200) {
        const getAccessToken = response.data;
        localStorage.setItem("accessToken", getAccessToken);
       
        toast.success('Logged in Successfully', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          });
          navigate("/", { replace: true });

      }
    } catch (error) {
      console.log(error);
      //console.log(error.response.data)
      if (error.response.data.status === "failed") {
        alert(error.response.data.errors[0].message);
      } else {
        alert("unknown error occured");
      }
    }
  };

  //end of loginHandler function
  return (
    <>
      <section className="bg-indigo-50 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <Link to={'/'} className="flex items-center mb-6 text-2xl font-semibold text-indigo-900 ">
                Movie App
            </Link>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-indigo-900 md:text-2xl">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={loginHandler}>
                        <div>
                            <label for="Email" className="block mb-2 text-sm font-medium text-indigo-900 ">Your email</label>
                            <input type="email" id="Email" ref={email} className="bg-indigo-50 border border-indigo-300 text-indigo-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 " placeholder="name@gmail.com" />
                        </div>
                        <div>
                            <label for="Password" className="block mb-2 text-sm font-medium text-indigo-900 ">Password</label>
                            <input type={showPassword ? 'text' : 'password'} id="Password" ref={pass} placeholder="••••••••" className="bg-indigo-50 border border-indigo-300 text-indigo-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 " />
                        </div>
                        <div>
                            <input id="showPasswordCheckbox" onChange={handleCheckboxChange} type="checkbox" className="cursor-pointer" />
                            <label for="showPasswordCheckbox" className="cursor-pointer">Show Password</label>
                        </div>
                        <div>
                            <input  type="checkbox" id="RememberMe" onChange={handleRememberMe} className="cursor-pointer" />
                            <label for="RememberMe" className="cursor-pointer">Remember me</label>
                        </div>
                        <button type="submit" className="w-full text-white bg-indigo-500 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign in</button>
                        <div className="flex justify-between">
                            <p className="text-sm font-light text-indigo-500 ">
                                Don’t have an account yet?
                            </p>
                            <Link to="/register">Register</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default Login;

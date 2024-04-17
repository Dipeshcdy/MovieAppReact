import React, { useEffect } from 'react'
import { RiDashboardFill } from "react-icons/ri";
import { BsFilm } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import adminAuth from './adminAuth';
import { toast } from 'react-toastify';
const Admin = () => {
    adminAuth();
    var navigate=useNavigate();
    const getLogout = () => {
        localStorage.removeItem("accessToken");
        toast.success('Logged out Successfully', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          });
          console.log("hi");
        navigate('/',{replace:true});
      };
  return (

    <section className="bg-teal-900 text-white fixed z-[999] top-0 bottom-0 overflow-auto py-10 w-[200px]">
        <div className="w-full flex justify-center">
            <h2 className="text-xl font-bold cursor-default">Admin Panel<span className="text-red-400 text-xl">.</span></h2>
        </div>
        <ul className="pt-10">
            <li><Link to="/admin" className="w-full flex hover:bg-black duration-500 cursor-pointer py-2 px-16 items-center gap-2"><RiDashboardFill />Dashboard</Link></li>
            <li><Link to="/admin/movies"  className=" w-full flex hover:bg-black duration-500 cursor-pointer py-2 px-16 items-center gap-2"><BsFilm />Movie</Link></li>
            <li>
                <form >
                    <button onClick={getLogout} className=" w-full flex hover:bg-black duration-500 cursor-pointer py-2 px-16 items-center gap-2"><i className="fas fa-right-from-bracket"></i>Logout</button>
                </form>
            </li>
        </ul>
    </section>
  )
}

export default Admin
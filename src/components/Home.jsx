import axios from "axios";

import { useEffect, useState,useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { toast, ToastContainer } from 'react-toastify';
import { AiOutlineSearch } from "react-icons/ai";
import 'react-toastify/dist/ReactToastify.css';
import { IoIosNotificationsOutline } from "react-icons/io";
const Home = ({notification,setNotification,notificationData}) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isErrortext, setIsErrorText] = useState("");
  const [iserror, setIsError] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [isOpenprofile, setIsOpenProfile] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  

  //searching code
  const searchMovieText=useRef(null);

  const HandleSearch=async (e)=>{
    e.preventDefault();
    if(searchMovieText.current.value !=='')
    {
      setLoading(true);
        try {
          const response = await axios.get(
            `https://localhost:44389/api/Movie/search/${searchMovieText.current.value}`
          );
          console.log(response);
          setMovies(response.data.data.$values);
        } catch (error) {
          setIsError(true);
          if (error.response.data.status) {
            setIsErrorText(error.response.data.errors[0].message);
          }
        }
        setLoading(false);
    }
    else
    {
      getMovieData();
    }
  }

  //end of searching code

  const getMovieData = async () => {
    setLoading(true);
    try {
      // const response = await axios.get(
      //   `https://api.dynoacademy.com/test-api/v1/movies?search=${searchMovieText}`
      // );
      const response = await axios.get(
        `https://localhost:44389/api/Movie`
      );
      setIsError(false);
      setMovies(response.data.data.$values);
      setLoading(false);
      setIsFirst(false);
    } catch (error) {
      setIsError(true);
      if (error.response.data.status) {
        setIsErrorText(error.response.data.errors[0].message);
      }
      setIsFirst(false);
      setLoading(false);
    }
    // console.log(response.data.moviesData);
  };

  useEffect(() => {
    getMovieData();
  }, []);

  const onMouseEnterProfile = () => {
    setIsOpenProfile(true);
  };
  const onMouseLeaveProfile = () => {
    setIsOpenProfile(false);
  };

  const getLogout = () => {
    localStorage.removeItem("accessToken");
    onMouseLeaveProfile();
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
    // navigate("/login");
  };
  return (
    // <div>
    //  {movies.map((item)=>{
    //     return(
    //         <div key={item.id}>
    //             <img src="" alt="" />
    //             name: {item.name}
    //         </div>
    //     )
    //  })}

    // </div>
    <div>
      <div>
        <div className="grid grid-cols-4 gap-4">
          <div className="flex">
          {isOpenprofile ? (
                    <>
                      <div
                        onMouseEnter={onMouseEnterProfile}
                        onMouseLeave={onMouseLeaveProfile}
                        className="text-xl fixed top-14 bg-gray-300 px-4 py-2 z-10 rounded-xl left-32"
                      >
                        <div className="mt-2 hover:text-red-500">
                          <button onClick={getLogout}>Logout</button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
            {localStorage.getItem("accessToken") ? (
              <>
                <div className="mx-auto">
                  <CgProfile
                    onMouseEnter={onMouseEnterProfile}
                    onMouseLeave={onMouseLeaveProfile}
                    className="  font-semibold mt-7 text-3xl cursor-pointer"
                  />
                  
                </div>
              </>
            ) : (
              <>
                <Link
                  className=" font-semibold mt-5 text-3xl mx-auto"
                  to={"/login"}
                >
                  Login
                </Link>
              </>
            )}
          </div>
          <h2 className="mt-5 text-center col-span-2 font-bold text-4xl w-5/6">
            Movies
          </h2>
          <div className="flex gap-5 items-center">

            <form onSubmit={HandleSearch} className="flex">
              <input
                ref={searchMovieText}
                type="text"
                placeholder="search"
                className="mt-5 mr-2 py-2 px-3 rounded-full border border-gray-400 focus:outline-none focus:border-blue-500"
              />
              <div className="flex items-center">
                <button className="mt-5">
                  <AiOutlineSearch className="text-3xl" />
                </button>
              </div>
            </form>
            <div className="mt-5 relative group" onMouseOver={()=>{
              setNotification(0);
            }}>
              {notification>0 && (
              <span className="absolute -top-3 -right-3 bg-gray-500 text-white rounded-full w-7 flex items-center justify-center h-7">{notification}</span>
              )}
              <IoIosNotificationsOutline className="text-3xl cursor-pointer" />
                
                <div className="absolute rounded-xl top-[150%] pointer-events-none opacity-0 invisible  group-hover:pointer-events-auto duration-500 -right-5 w-[300px] pt-5 group-hover:opacity-100 group-hover:visible group-hover:top-[90%] ">
                <div className="px-5 py-2 bg-gray-200">
                    {notificationData.map((item) => {
                        return (
                          <div key={item.id} className=" border-b border-black py-2">
                            <Link to={`/movie/${item.id}`}>
                              <div className="flex gap-5 w-full justify-between ">
                                      <h2 className="tracking-wider line-clamp-1 font-semibold">{item.title}</h2>
                                      <h2 className="text-sm">
                                          {item.releaseDate }
                                      </h2>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                </div>
              </div>
            </div>
          </div>

        </div>
        <hr className=" border-t-2 border-red-500 w-1/2 mx-auto" />
      </div>
      {iserror ? (
        <div className="bg-gray-400  py-4 mx-20 rounded-full mt-10 text-center text-xl text-red-500 font-bold">
          <h2>{isErrortext}</h2>
        </div>
      ) : (
        <>
          {loading ? (
            <div className="text-center text-xl font-bold mx-20 mt-20 ">
              Loading...
            </div>
          ) : (
            <>
              {movies.length < 1 && !isFirst ? (
                <>
                  <div className="bg-gray-400  py-4 mx-20 rounded-full mt-20 text-center text-xl text-red-500 font-bold">
                    No match found..........
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-4 gap-10 mt-20 mb-10 mx-20">
                    {movies.map((item) => {
                      return (
                        <div key={item.id} className="">
                          <Link to={`/movie/${item.id}`}>
                            <div>
                                <div className="rounded-xl overflow-hidden h-[200px]">
                                    <img className="hover:scale-105 duration-500 w-full h-full object-center object-cover" src={item.imageUrl} alt="Movie_image"/>
                                </div>
                                <div className="mt-5">
                                    <h2 className="tracking-wider line-clamp-1 text-3xl font-semibold">{item.title}</h2>
                                    <p className="line-clamp-2 mt-2 tracking-wider">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                           
                          
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;

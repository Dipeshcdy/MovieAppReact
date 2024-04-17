import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

import { useParams } from "react-router-dom";
import useAuth from "./useAuth";
const MovieDetail = () => {
  useAuth();
  const navigate = useNavigate();
  
  const param = useParams();

  const [data, setData] = useState([]);
  const [comments,setComments]=useState([]);
  const [ratings,setRatings]=useState([]);
  const [iserror, setIsError] = useState(false);
  const [isErrortext, setIsErrorText] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentRating,setCurrentRating]= useState(null);


  // for comment
  const text = useRef();

  // for mail
  const email=useRef();

  const getSingleMovieData = async () => {
    try {
      const response = await axios.get(
        `https://localhost:44389/api/Movie/${param.id}`,
        {
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setData(response.data.data);
    } catch (error) {
      setIsError(true);
      if (error.response.data.status) {
        setIsErrorText(error.response.data.errors[0].message);
      }
    }
  };

  useEffect(() => {
    // handleAuthentication();
    setLoading(true);
    getSingleMovieData();
    getRatings();
    getComments();
    setLoading(false);
  }, []);

  const getRatings=async ()=>{
    try {
      const ratingResponse= await axios.get(
        `https://localhost:44389/api/Rating/movie/${param.id}`,
        {
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setRatings(ratingResponse.data.data.$values);
    } catch (error) {
      setIsError(true);
      if (error.response.data.status) {
        setIsErrorText(error.response.data.errors[0].message);
      }
    }
  }

  const getComments=async ()=>{
    try {
      const commentResponse= await axios.get(
        `https://localhost:44389/api/Comment/movie/${param.id}`,
        {
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setComments(commentResponse.data.data.$values);
      console.log(commentResponse.data.data.$values);
    } catch (error) {
      setIsError(true);
      if (error.response.data.status) {
        setIsErrorText(error.response.data.errors[0].message);
      }
    }
  }

  const handleStarClick = (index) => {
    setCurrentRating(index + 1);
};

const submitRating=async (e)=>{
    e.preventDefault();
    const formData = new FormData();
        formData.append('MovieId', data.id);
        formData.append('Value', currentRating);
    try {
      const response = await axios.post(
        "https://localhost:44389/api/Rating",
        formData,
          {
            timeout: 10000,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
      );
      console.log(response);
      if (response.status === 200) {
        getSingleMovieData();
        getRatings();
        toast.success('Rating Added Successfully', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          });
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.status === "failed") {
        alert(error.response.data.errors[0].message);
      } else {
        alert("unknown error occured");
      }
    }
};

const submitComment=async (e)=>{
    e.preventDefault();
    const formData = new FormData();
        formData.append('MovieId', data.id);
        formData.append('Text', text.current.value);
        
    try {
      const response = await axios.post(
        "https://localhost:44389/api/Comment",
        formData,
          {
            timeout: 10000,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
      );
      console.log(response);
      if (response.status === 200) {
        getComments();
        text.current.value="";
        toast.success('Comment Added Successfully', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          });
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.status === "failed") {
        alert(error.response.data.errors[0].message);
      } else {
        alert("unknown error occured");
      }
    }
};

const sendMail=async (e)=>{
    e.preventDefault();
    const formData = new FormData();
        formData.append('MovieId', data.id);
        formData.append('Email', email.current.value);
    try {
      const response = await axios.post(
        "https://localhost:44389/api/Mail",
        formData,
          {
            timeout: 10000,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
      );
      console.log(response);
      if (response.status === 200) {
        getComments();
        text.current.value="";
        toast.success('Mail Send Successfully', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          });
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.status === "failed") {
        alert(error.response.data.errors[0].message);
      } else {
        alert("unknown error occured");
      }
    }
};

  return (
    <div
      className={
        "" + (iserror || loading ? "h-screen" : "")
      }
    >
      <div className="flex">
        <div className="  ml-14 mt-5">
          <IoArrowBackCircleSharp
            onClick={() => {
              navigate(-1);
            }}
            className="text-4xl text-blue-500 cursor-pointer"
          />
        </div>
        <div className="w-5/6 ">
          <h2 className="pt-5 text-center font-bold text-3xl">Movie Details</h2>
        </div>
      </div>
      <hr className=" border-t-2 border-red-500 w-1/2 mx-auto mb-5" />
      {iserror ? (
        <div className="bg-gray-400  py-4 mx-20 rounded-full mt-10 text-center text-xl text-red-500 font-bold">
          <h2>{isErrortext}</h2>
        </div>
      ) : (
        <>
          {loading ? (
            <>
              <div className="text-center text-xl font-bold mx-20 mt-10 ">
                Loading...
              </div>
            </>
          ) : (
            <>
              {" "}
              <section className="">
                <div className=" grid grid-cols-3 gap-10 bg-gray-300 p-20 ">
                    <div>
                        <div className="h-[300px]">
                            <img className="w-full h-full object-cover object-center rounded-xl shadow-lg shadow-gray-500" src={data.imageUrl} alt={data.imageUrl} />
                        </div>
                    </div>
                    <div className="col-span-2 py-5">
                      <div className="grid grid-cols-4">
                            <div className="">
                                <div>
                                    <h2 className="font-semibold text-xl tracking-wider">
                                    Title
                                    </h2>
                                    <h2 className="tracking-wider">
                                    {data.title}
                                    </h2>
                                </div>
                                <div>
                                    <h2 className="tracking-widest">
                                    {[...Array(5)].map((_, i) => {
                                        if (data.rated >= i + 1) {
                                            return <i key={i} className="fas fa-star"></i>;
                                        } else if (data.rated >= i + 0.5) {
                                            return <i key={i} className="fa-regular fa-star-half-stroke"></i>;
                                        } else {
                                            return <i key={i} className="fa-regular fa-star"></i>;
                                        }
                                    })}
                                    </h2>
                                </div>
                            </div>    
                      </div>
                      
                      <div className="mt-8">
                            <h2 className="text-xl font-bold tracking-wider">Description</h2>
                            <p className="text-justify tracking-wider mt-2">
                            {data.description}
                            </p>
                      </div>
                      <div className="mt-8">
                            <h2 className="text-xl font-bold tracking-wider">Release Date</h2>
                            <p className="text-justify tracking-wider mt-2">
                            {data.releaseDate}
                            </p>
                      </div>
                    </div>
                </div>
                <div className="my-10 px-20">
                    <h2 className="text-lg font-bold tracking-wider underline">Recent Comments</h2>
                    {comments.length > 0 ? (
                      <div className="mt-5 flex flex-col gap-3">
                          {comments.map((item, index) => (
                              <div key={index} className="px-5 py-2 flex items-center gap-2">
                                  <h2 className="text-lg font-semibold underline">{item.userName}</h2>
                                  <p className="font-bold text-gray-600 pl-2">- {item.text}</p>
                              </div>
                          ))}
                      </div>
                  ) : (
                      <div className="mt-2 px-5">
                          <h2 className="text-red-600 font-bold">- No any Comments</h2>
                      </div>
                  )}
                </div>
                
                <div className="mt-4 px-20 pb-10">
                    <form onSubmit={submitComment}>
                        <input type="hidden" asp-for="@Model.Comment.MovieId" value="@Model.Id" />
                        <div>
                            <div>
                                <textarea ref={text} required className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-teal-600 appearance-none focus:outline-none focus:ring-0 focus:border-teal-600 peer h-20" placeholder="Write Comment"></textarea>
                            </div>
                        </div>
                        <div className="mt-5 gap-5">
                            <button type="submit" className=" bg-teal-600 hover:bg-teal-800 duration-500 text-white text-xl font-bold  px-6 py-2 font-xl rounded-md sm:mb-0 ">Post a Comment</button>
                        </div>
                    </form>

                    <div className="mt-10">
                        <h2 className="text-lg font-bold tracking-wider underline">Users Rated</h2>
                        <div>
                          {ratings.length > 0 ? (
                            <div className="mt-5 flex flex-col gap-3">
                                {ratings.map((item, index) => (
                                    <div key={index} className="px-5 py-2 flex items-center gap-2">
                                        <h2 className="text-lg font-semibold underline">{item.userName}</h2>
                                        <div className="font-bold text-gray-600 pl-2">
                                        {[...Array(5)].map((_, i) => {
                                            if (item.value >= i + 1) {
                                                return <i key={i} className="fas fa-star"></i>;
                                            } else if (item.value >= i + 0.5) {
                                                return <i key={i} className="fa-regular fa-star-half-stroke"></i>;
                                            } else {
                                                return <i key={i} className="fa-regular fa-star"></i>;
                                            }
                                        })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="mt-2 px-5">
                                <h2 className="text-red-600 font-bold">- No any Ratings</h2>
                            </div>
                        )}

                        </div>
                    </div>

                    {!data.hasRated && (
                      <div className="mt-10 flex flex-col justify-center items-center">
                          <h2 className="text-lg font-bold tracking-wider underline">Rate Movie</h2>
                          <div className="text-xl mt-2">
                            {[...Array(5)].map((_, index) => (
                                <i 
                                    key={index} 
                                    className={`star cursor-pointer ${index < currentRating ? 'fas' : 'fa-regular'} fa-star`}
                                    onClick={() => handleStarClick(index)}
                                ></i>
                            ))}
                          </div>
                          <form onSubmit={submitRating} method="post">
                              <div className="mt-2">
                                  <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-800">Submit</button>
                              </div>
                          </form>
                      </div>
                  )}


                    <div className="mt-10">
                      <h2 className="text-lg font-bold tracking-wider underline">Share Movie</h2>
                        <form onSubmit={sendMail} >
                            <input type="email" required ref={email} name="email" placeholder="Write Email" className="mt-5 block px-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-teal-600 appearance-none focus:outline-none focus:ring-0 focus:border-teal-600 peer" />
                            <button type="submit" className=" bg-teal-600 mt-2 hover:bg-teal-800 duration-500 text-white  font-bold  px-4 py-2 font-xl rounded-md sm:mb-0 ">Share movie</button>
                        </form>
                    </div>
                </div>
              
              </section>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default MovieDetail;

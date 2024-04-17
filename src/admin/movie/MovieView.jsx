import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useAuth from '../../components/useAuth';
import Admin from '../Admin';
import axios from 'axios';

const MovieView = () => {
    useAuth();
  const param = useParams();
  const [data, setData] = useState([]);
  const [comments,setComments]=useState([]);
  const [ratings,setRatings]=useState([]);
  const [iserror,setIsError]=useState(false);
  const [loading, setLoading] = useState(true);

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
      console.log(response.data.data);
    } catch (error) {
      setIsError(true);
      if (error.response.data.status) {
        setIsErrorText(error.response.data.errors[0].message);
      }
    }
  };

  useEffect(() => {
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
  };

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
  };

  return (
    <>
        <Admin />
        <div className='pl-[200px]'>
            <div className="p-5">
                <h1 className="text-indigo-500 text-4xl text-center underline font-bold ">View Movie</h1>
                    <div className="mt-10">
                        <div className="">
                            <div className="shrink-0 mb-5">
                                <img id='preview_img' className="h-40 w-40 object-cover rounded-xl" src={data.imageUrl} alt="abc" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="relative">
                            <input value={data.title} id='title' type="text" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-indigo-600 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer" disabled placeholder=" " />
                            <label for="title" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-indigo-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Title</label>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="relative">
                            <input  value={data.releaseDate} id='releaseDate' type="date" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-indigo-600 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"  placeholder=" " />
                            <label for="releaseDate" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-indigo-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Release Date</label>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="relative">
                            <input id="Rated" value={data.rated??0} type="text" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-indigo-600 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer" disabled placeholder=" " />
                            <label for="Rated" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-indigo-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Average Rating</label>
                        </div>
                    </div>
                    <div className="my-5">
                        <div className="relative">
                        <textarea id="Description" value={data.description} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-indigo-600 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer" disabled placeholder=" "></textarea>
                            <label for="Description" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-indigo-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Description</label>
                        </div>
                    </div>
            </div>

            <div className="p-5">
                <h1 className="text-indigo-500 text-xl text-center underline font-bold ">List of Comments</h1>
                <div className="m-auto mt-5">
                    <div className="mt-5">
                        <table className=" w-full text-center">
                            <thead>
                                <tr>
                                    <th className="border border-black py-2 font-semibold px-4">SN</th>
                                    <th className="border border-black py-2 font-semibold px-4">User</th>
                                    <th className="border border-black py-2 font-semibold px-4">Coment</th>

                                </tr>
                            </thead>
                            <tbody>
                            {comments.length > 0 ? (
                                <>
                                    {comments.map((item, index) => (
                                        <tr key={index}>
                                            <td className="border border-black py-2 font-semibold px-4">{index+1}</td>
                                            <td className="border border-black py-2 font-semibold px-4">{item.userName}</td>
                                            <td className="border border-black py-2 font-semibold px-4">{item.text}</td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <tr>
                                    <td className="text-red-500 border border-black py-2 text-xl font-semibold px-4 text-center" colspan="3">No data found</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            <div className="p-5">
                <h1 className="text-indigo-500 text-xl text-center underline font-bold ">List of Ratings</h1>
                <div className="m-auto mt-5">
                    <div className="mt-5">
                        <table className=" w-full text-center">
                            <thead>
                                <tr>
                                    <th className="border border-black py-2 font-semibold px-4">SN</th>
                                    <th className="border border-black py-2 font-semibold px-4">User</th>
                                    <th className="border border-black py-2 font-semibold px-4">rating</th>

                                </tr>
                            </thead>
                            <tbody>
                                {ratings.length > 0 ? (
                                <>
                                    {ratings.map((item, index) => (
                                        <tr key={index}>
                                            <td className="border border-black py-2 font-semibold px-4">{index+1}</td>
                                            <td className="border border-black py-2 font-semibold px-4">{item.userName}</td>
                                            <td className="border border-black py-2 font-semibold px-4">{item.value}</td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <tr>
                                    <td className="text-red-500 border border-black py-2 text-xl font-semibold px-4 text-center" colspan="3">No data found</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </>
  )
}

export default MovieView
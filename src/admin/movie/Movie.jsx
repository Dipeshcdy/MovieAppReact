import { useEffect, useState,useRef } from "react";
import Admin from '../Admin';
import axios from 'axios';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Movie = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isErrortext, setIsErrorText] = useState("");
    const [iserror, setIsError] = useState(false);
    const [isFirst, setIsFirst] = useState(true);
    
    const getMovieData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://localhost:44389/api/Movie`
          );
          setIsError(false);
          setMovies(response.data.data.$values);
          console.log(response.data.data.$values);
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
      };
      useEffect(() => {
        getMovieData();
      }, []);

      const deleteMovie= async (id)=>{
        setLoading(true);
        try {
            const response = await axios.delete(
                `https://localhost:44389/api/Movie/${id}`,
            {
                timeout: 10000,
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
              }
              );
              if (response.status === 200) {
        getMovieData();
                toast.success('Movie Deleted Successfully', {
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
        
        }
      }
      const handleDelete = (event) => {
        event.preventDefault();
        var confirmed=window.confirm("Are you sure ?");
        if(confirmed)
        {
            const id = event.target.querySelector('input[name="Id"]').value;
            deleteMovie(id);
        }
      };
  return (
    <>
    <Admin />
    <div className='pl-[200px]'>
        <div className="p-5 ">
            <h1 className="text-indigo-500 text-4xl text-center underline font-bold ">List of Movies</h1>
            <div className="m-auto mt-5">
                <div className="text-right">
                    <Link to={`/admin/movie/create`} className=" px-4 py-2 bg-indigo-700 border-2 border-indigo-700 hover:bg-transparent hover:text-indigo-700 duration-500 font-semibold text-white rounded-xl">Create Movie</Link>
                </div>
                <div className="mt-5">
                    <table className=" w-full text-center">
                        <thead>
                            <tr>
                                <th className="border border-black py-2 text-xl font-semibold px-4">SN</th>
                                <th className="border border-black py-2 text-xl font-semibold px-4">Title</th>
                                <th className="border border-black py-2 text-xl font-semibold px-4">Image</th>
                                <th className="border border-black py-2 text-xl font-semibold px-4">Rating</th>
                                <th className="border border-black py-2 text-xl font-semibold px-4">Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {/* @if (data > 0)
                            {
                                @foreach (var item in Model)
                                { */}
                                {movies.length < 1 ? (
                                    <>
                                        <tr>
                                            <td colSpan={5} className="border border-black py-2 text-xl font-semibold px-4">No movies found..........</td>
                                        </tr>
                                    </>
                                ) : (
                                    <>
                                {movies.map((item,index) => {
                                    return(
                                    <tr>
                                        <td className="border border-black py-2 text-xl font-semibold px-4">{index+1}</td>
                                        <td className="border border-black py-2 text-xl font-semibold px-4">{item.title}</td>
                                        <td className="border border-black py-2 text-xl font-semibold px-4 flex justify-center">
                                            <div className="w-[100px] h-[100px] overflow-hidden rounded-xl">
                                                <img className="hover:scale-110 duration-500 w-full h-full object-cover object-center" src={item.imageUrl} alt=""/>
                                            </div>
                                        </td>
                                        <td className="border border-black py-2 text-xl font-semibold px-4">{item.rated??0}</td>
                                        <td className="border border-black py-2 text-xl font-semibold px-4">
                                            <div className="flex gap-3 mx-auto justify-center">
                                                <Link to={`/admin/movie/view/${item.id}`} className="font-semibold underline text-indigo-600 hover:text-indigo-800">View</Link>
                                                <Link to={`/admin/movie/edit/${item.id}`} className="font-semibold underline text-indigo-600 hover:text-indigo-800">Edit</Link>
                                                <form onSubmit={handleDelete}>
                                                    <input type="hidden" name="Id" value={item.id} />
                                                    <button type="submit" className="underline text-red-500 hover:text-red-800">Delete</button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                    );
                                })}
                                </>)}
                                {/* }
                            }
                            else
                            {
                                <tr>
                                    <td className="text-red-500 border border-black py-2 text-xl font-semibold px-4 text-center" colspan="5">No data found</td>
                                </tr>
                            } */}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
    </>
  )
}

export default Movie
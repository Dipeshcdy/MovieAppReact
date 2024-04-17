import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../components/useAuth';
import Admin from '../Admin';
import axios from 'axios';
import { toast } from 'react-toastify';

const MovieEdit = () => {
    useAuth();
  const param = useParams();
  const navigate = useNavigate(); 
  const [data, setData] = useState([]);
  const [previewImageUrl,setPreviewImageUrl]=useState(null);
  const title=useRef();
  const file=useRef();
  const description=useRef();
  const releaseDate=useRef();
  const [ratings,setRatings]=useState([]);
  const [iserror,setIsError]=useState(false);
  const [loading, setLoading] = useState(true);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setPreviewImageUrl(imageUrl);
  };

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
      setPreviewImageUrl(data.imageUrl);
      console.log(response.data.data);
    } catch (error) {
      setIsError(true);
      if (error.response.data.status) {
        setIsErrorText(error.response.data.errors[0].message);
      }
    }
  };

  const submit=async (e)=>{
    e.preventDefault();
    const formData = new FormData();
        formData.append('Title', title.current.value);
        formData.append('Description', description.current.value);
        formData.append('ReleaseDate',releaseDate.current.value);
        formData.append('file', file.current.files[0]);
        console.log(formData);
    try {
        const response = await axios.put(
          `https://localhost:44389/api/Movie/${param.id}`,
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
          toast.success('Movie Updated Successfully', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
            });
            navigate("/admin/movies", { replace: true });
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

  useEffect(() => {
    setLoading(true);
    getSingleMovieData();
    setLoading(false);
  }, []);

  useEffect(()=>{
    title.current.value=data.title;
    description.current.value=data.description;
    releaseDate.current.value=data.releaseDate;
  },[data])

  return (
    <>
        <Admin />
        <div className='pl-[200px]'>
            <div className="p-5">
                <h1 className="text-indigo-500 text-4xl text-center underline font-bold ">Edit Movie</h1>
                <form onSubmit={submit}>
                    <div className="mt-10">
                        <div className="">
                            <div className="shrink-0 mb-5">
                                <img id='preview_img' className="h-40 w-40 object-cover rounded-xl" src={previewImageUrl??data.imageUrl} alt="abc" />
                            </div>

                            <label className="block" for="ImageUrl">
                                <input type="file" ref={file} onChange={handleFileChange} className="block w-full text-sm text-slate-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-xl file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-violet-50 file:text-indigo-700
                                        hover:file:bg-violet-100
                                        cursor-pointer
                                    " />
                            </label>

                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="relative">
                            <input  ref={title} id='title' type="text" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-indigo-600 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"  placeholder=" " />
                            <label for="title" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-indigo-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Title</label>
                        </div>
                    </div>

                    <div className="mt-5">
                        <div className="relative">
                            <input  ref={releaseDate} id='releaseDate' type="date" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-indigo-600 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"  placeholder=" " />
                            <label for="releaseDate" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-indigo-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Release Date</label>
                        </div>
                    </div>

                    <div className="my-5">
                        <div className="relative">
                        <textarea id="Description" ref={description} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-indigo-600 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"  placeholder=" "></textarea>
                            <label for="Description" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-indigo-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Description</label>
                        </div>
                    </div>
                    <div class="flex gap-5 mt-5">
                        <button type="submit" class="w-full px-4 text-xl py-2 bg-indigo-700 border-2 border-indigo-700 hover:bg-transparent hover:text-indigo-700 duration-500 font-semibold text-white rounded-xl">Update</button>
                        <Link to={`/admin/movies`} class="w-full cursor-pointer text-center px-4 text-xl py-2 bg-red-700 border-2 border-red-700 hover:bg-transparent hover:text-red-700 duration-500 font-semibold text-white rounded-xl">Exit</Link>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default MovieEdit
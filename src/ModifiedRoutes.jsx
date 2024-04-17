import React, { useEffect, useState } from 'react'
import {Routes,Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import MovieDetail from "./components/MovieDetail";
import Profile from "./components/Profile";
import Dashboard from './admin/Dashboard';
import Movie from './admin/movie/Movie';
import MovieView from './admin/movie/MovieView';
import MovieEdit from './admin/movie/MovieEdit';
import MovieCreate from './admin/movie/MovieCreate';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { toast } from 'react-toastify';
import Register from './components/Register';

const ModifiedRoutes = () => {
  const [notification, setNotification] = useState(0);
  const [notificationData,setNotificationData]=useState([]);
  const connection = new HubConnectionBuilder()
    .withUrl('https://localhost:44389/jobshub')
    .build();

  useEffect(() => {
    // Start the SignalR connection when the component mounts
    connection.start()
      .then(() => console.log('Connected to SignalR hub'))
      .catch(err => console.error('Error connecting to hub:', err));

    // Define the event handler for 'ConcurrentJobs' event
    connection.on('ConcurrentJobs', movies => {
      console.log('ConcurrentJobs:', movies);
      // Update notification state using functional update
      movies.forEach(movie => {
        console.log(movie);
        setNotification(prevNotification => prevNotification + 1);
        setNotificationData(prevData => [...prevData, movie]);
        toast.info(`${movie.title} is realsing soon`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          });
      });
    });

    // Clean up the connection when the component unmounts
    return () => {
      connection.off('ConcurrentJobs'); // Remove the event handler
      connection.stop(); // Stop the SignalR connection
    };
  }, []);
  return (
        <Routes>
          <Route exact path="/" element={<Home notification={notification} setNotification={setNotification} notificationData={notificationData} />} />
          <Route exact path="/movie/:id" element={<MovieDetail/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/me" element={<Profile/>} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/movies" element={<Movie />} />
          <Route path="/admin/movie/create" element={<MovieCreate />} />
          <Route path="/admin/movie/view/:id" element={<MovieView />} />
          <Route path="/admin/movie/edit/:id" element={<MovieEdit />} />
        </Routes>
  )
}

export default ModifiedRoutes
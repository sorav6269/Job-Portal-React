import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./components/Index";
import About from "./components/About";
import Catagery from "./components/Catagery";
import Contact from "./components/Contact";
import Error404 from "./components/Error404";
import Jobdetails from "./components/Jobdetails";
import Joblist from "./components/Joblist";
import Testimonal from "./components/Testimonal";
import Login from "./components/Login";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";
import { Context } from "./main";
import axios from "axios";
import Jobpost from "./components/Jobpost";
import Application from "./components/Application/Application";
import Myapplication from "./components/Application/Myapplication";
import Resumemodel from "./components/Application/Resumemodel";



function App() {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  const fetchUser = async () => {
    // SetAuthorizes(true)
    try {
      const { data } = await axios.get("/jobportalApi/getuser");
      // console.log(data);
      setUser(data);
      setIsAuthorized(true);
    } catch (error) {
      setIsAuthorized(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [isAuthorized]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<Index />} />
        <Route path="/About" element={<About />} />
        <Route path="/Catagery" element={<Catagery />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Error404" element={<Error404 />} />
        <Route path="/Jobdetails/:id" element={<Jobdetails />} />
        <Route path="/Jobpost" element={<Jobpost />} />
        <Route path="/Job/getall" element={<Joblist />} />
        <Route path="/Testimonal" element={<Testimonal />} />
        <Route path="/application/:id" element={<Application />} />
        <Route path="/application/me" element={<Myapplication />} />
        <Route path="/resume/me" element={<Resumemodel />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
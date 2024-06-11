import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Orders from './pages/Orders/Orders';
import List from './pages/List/List';
import Add from './pages/Add/Add';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; // Ensure you have global styles here


const App = () => {
  const url = "http://localhost:4000";
  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path='/add' element={<Add   url = {url}/>} />
            <Route path='/list' element={<List url = {url} />} />
            <Route path='/orders' element={<Orders url = {url}/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

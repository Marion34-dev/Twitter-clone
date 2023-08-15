import { useState } from 'react'
import './index.css'
import Header from './Components/Header';
import Footer from './Components/Footer';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import RoutedMain from "./Components/RoutedMain.jsx";
import Login from './Components/authentication/login.jsx';
import AddPeep from '../src/Components/AddPeep.jsx'
import Register from '../src/Components/Register.jsx';


const App = () => {
    const [loginUser, setLoginUser] = useState();

    return (
        <>
            <Router>
                <Header user={{ loginUser, setLoginUser }} />

                <Routes>
                    <Route path="*" element={<Navigate to="/" />} />
                    <Route path="/" element={<RoutedMain loginUser={loginUser} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login user={{ loginUser, setLoginUser }} />} />
                    <Route path="/add/:_id" element={<AddPeep user={loginUser} />} />
                    
                </Routes>

                <Footer />
            </Router>
        </>
    );
}

export default App;

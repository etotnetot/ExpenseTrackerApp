import React, { createContext, useState, useContext } from "react";
import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/v1/";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    const registerUser = async (user) => {
        const response = await axios.post(`${BASE_URL}register`, user)
            .catch((err) =>{
                //setError(err.response.data.message)
            })

        //getUser()
    }

    const loginUser = async (user) => {
        const response  = await axios.post(`${BASE_URL}login`, user)

        console.log(response.data)
    }

    return (
        <AuthContext.Provider value={{ auth, 
            setAuth, 
            loginUser,
            registerUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
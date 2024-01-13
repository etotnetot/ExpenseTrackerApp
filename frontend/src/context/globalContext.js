import React, { useContext, useState } from "react"
import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)
    const userData = JSON.parse(localStorage.getItem("authData"));

    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        //getIncomes()
        getIncomesById(userData.id)
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        //getIncomes()
        getIncomesById(userData.id)
    }

    const totalIncome = () => {
        let totalIncome = 0.0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + parseFloat(income.amount) 
            
        })
        
        return totalIncome;
    }

    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })

        //getExpenses()
        getExpensesById(userData.id)
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        //getExpenses()
        getExpensesById(userData.id)
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + parseFloat(income.amount)
        })

        return totalIncome;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }


    const addUser = async (user) => {
        const response = await axios.post(`${BASE_URL}add-user`, user)
            .catch((err) =>{
                setError(err.response.data.message)
            })
    }

    const registerUser = async (user) => {
        const response = await axios.post(`${BASE_URL}register`, user)
            .catch((err) =>{
                setError(err.response.data.message)
            })

        //getUser()
    }

    const deleteUser = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-user/${id}`)
        
        getUsers()
    }

    const loginUser = async (user) => {
        const response  = await axios.post(`${BASE_URL}login`, user)

        console.log(response.data)
    }

    const getUsers = async () => {
        const response  = await axios.get(`${BASE_URL}get-users`)
        setUsers(response.data)
        console.log(response.data)
    }

    const getExpensesById = async (id) => {
        const res  = await axios.post(`${BASE_URL}get-expenses/${id}`)
        setExpenses(res.data)
    }

    const getIncomesById = async (id) => {
        const res  = await axios.post(`${BASE_URL}get-incomes/${id}`)
        setIncomes(res.data)
    }

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            users,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            loginUser,
            getUsers,
            registerUser,
            error,
            setError,

            getExpensesById,
            getIncomesById
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}
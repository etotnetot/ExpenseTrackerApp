import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from "../../styles/Layout";
import { useGlobalContext } from "../../context/globalContext";
import Form from "../Form/Form";
import IncomeItem from "../IncomeItem/IncomeItem";
import useAuth from '../../Hooks/useAuth';

function Incomes() {
    const {addIncome, incomes, getIncomes, deleteIncome, totalIncome, getIncomesById} = useGlobalContext()
    const { auth } = useAuth();
    const userData = JSON.parse(localStorage.getItem("authData"));
 
    useEffect(() => {
        //getIncomes()
        //getIncomesById(auth.id)
        console.log(userData);
        getIncomesById(userData.id)
    }, [])

    return (
        <IncomesStyled>
            <InnerLayout>
                <h1>Доходы</h1>
                <h2 className="total-income">Общий доход: <span>₽{totalIncome()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form></Form>
                    </div>
                    <div className="incomes">
                        
                        {incomes.map((income) => {
                            const {id, title, amount, type, category, description, date} = income;
                            return <IncomeItem
                                key = {id}
                                id = {id}
                                title = {title}
                                description = {description}
                                amount = {amount}
                                date = {date}
                                category = {category}
                                indicatorColor="var(--color-green)"
                                type={type}
                                deleteItem={deleteIncome}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>  
        </IncomesStyled>
    )
}

const IncomesStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
`;

export default Incomes
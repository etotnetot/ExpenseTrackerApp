import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';


function RegistrationForm() {
    //const {addIncome, getIncomes, error} = useGlobalContext()
    const [inputState, setInputState] = useState({
        full_name: '',
        date_of_birth: '',
        gender: '',
        country: ''
    })

    const { full_name, date_of_birth, gender, country } = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})

    }

    const handleSubmit = e => {
        e.preventDefault()
        addUser(inputState)
        setInputState({
            full_name: '',
            date_of_birth: '',
            gender: '',
            country: ''
        })
    }

    return (
        <FormStyled onSubmit={handleSubmit}>
            <div className="input-control">
                <input 
                    type="text" 
                    value={full_name}
                    name={'full_name'} 
                    placeholder="Full Name"
                    onChange={handleInput('full_name')}
                />
            </div>
            <div className="input-control">
                <DatePicker 
                    id='date_of_birth'
                    placeholderText='Enter A Date of Birth'
                    selected={date_of_birth}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date_of_birth) => {
                        setInputState({...inputState, date_of_birth: date_of_birth})
                    }}
                />
            </div>
            <div className="selects input-control">
                <select required value={gender} name="gender" id="gender" onChange={handleInput('gender')}>
                    <option value=""  disabled >Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="N/B">N/B</option>  
                </select>
            </div>
            <div className="input-control">
                <textarea name="country" value={description} placeholder='Country' id="description" cols="30" rows="4" onChange={handleInput('country')}></textarea>
            </div>
            <div className="submit-btn">
                <Button 
                    name={'Register'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
        </FormStyled>
    )
}

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }

    .selects{
        display: flex;
        justify-content: flex-end;
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }
`;
export default RegistrationForm
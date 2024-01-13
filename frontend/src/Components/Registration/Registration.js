import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { InnerLayout } from "../../styles/Layout";
import { useSignIn } from "react-auth-kit";
import { useGlobalContext } from "../../context/globalContext";
import Form from "../Form/Form";
import IncomeItem from "../IncomeItem/IncomeItem";
//import LoginForm from '../Form/LoginForm';

function Register(props) {
    const [error, setError] = useState();
    const signIn = useSignIn();
  
    const onSubmit = async (values) => {
      console.log("Values: ", values);
      //setError("");
  
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/login",
          values
        );
  
        signIn({
          token: response.data.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: { email: values.email },
        });
      } catch (err) {
        if (err && err instanceof AxiosError)
          setError(err.response?.data.message);
        else if (err && err instanceof Error) setError(err.message);
  
        console.log("Error: ", err);
      }
    };
  
    const formik = useFormik({
      initialValues: {
        full_name: " ",
        date_of_birth: " ",
        gender: " ",
        country: " "
      },
      onSubmit,
    });

    return (
        <IncomesStyled>
            <InnerLayout>
                <h1>Create an account!</h1>

                <div className="income-content">
                    <div className="form-container">
                        <FormStyled onSubmit={handleSubmit}>
                            <div className="input-control">
                                <input 
                                    type="text" 
                                    value={email}
                                    name={'email'} 
                                    placeholder="Your Email"
                                    onChange={handleInput('email')}
                                />
                            </div>
                            <div className="input-control">
                                <input 
                                    type="hidden" 
                                    value={password}
                                    name={'password'} 
                                    placeholder=" Enter password"
                                    onChange={handleInput('password')}
                                />
                            </div>
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
                    </div>
                </div>
            </InnerLayout>  
        </IncomesStyled>
    )
}

const IncomesStyled = styled.div`
    display: flex;
    overflow: auto;
    align-items: center;
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
        span{
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

export default Register
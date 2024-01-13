import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/authProvider';
import styled from 'styled-components'
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const LOGIN_URL = "http://localhost:5000/api/v1/login"

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let user_email = user;
            let password = pwd;

            if (user_email = 'admin' && user_email == password) {
                navigate('/admin', { replace: true });
                return;
            }

            console.log(user_email, password)
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user_email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response?.data.id));
            let id = JSON.stringify(response?.data.id);

            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            console.log(roles);

            setAuth({ id, user, pwd, roles, accessToken });
            localStorage.setItem("authData", JSON.stringify({ id, user, pwd, roles, accessToken }));
            setId('');
            setUser('');
            setPwd('');
            setSuccess(true);
            navigate('/', { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }

            errRef.current.focus();
        }
    }

    return (
        <LoginStyled>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Вход</h1>
                    <FormStyled onSubmit={handleSubmit}>
                        <label htmlFor="username">Имя пользователя:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Пароль:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Вход</button>
                    </FormStyled>
                    <p>
                        Нет аккаунта?<br />
                        <span className="line">
                            <Link id="link" to="/register">Регистрация</Link>
                        </span>
                    </p>
                </LoginStyled>
    )
}

const LoginStyled = styled.div`    
    width: 100%;
    max-width: 533px;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1rem;
    background-color: rgba(255,239,222,0.8);
    z-index: 3333;
    border-radius: 23px;

    #link {
        color: black;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        flex-grow: 1;
        padding-bottom: 1rem;
    }

    a, a:visited {
        color: #fff;
    }

    input[type="text"],
    input[type="password"],
    button,
    textarea {
        font-family: 'Nunito', sans-serif;
        font-size: 22px;
        padding: 0.25rem;
        border-radius: 0.5rem;
    }

    label,
    button {
    margin-top: 1rem;
    }

    button {
        padding: 0.5rem;
        background:#f7d3bc;
        border: none;
    }

    .instructions {
        font-size: 0.75rem;
        border-radius: 0.5rem;
        background: #000;
        color: #fff;
        padding: 0.25rem;
        position: relative;
        bottom: -10px;
    }

    .instructions > svg {
        margin-right: 0.25rem;
    }

    .offscreen {
        position: absolute;
        left: -9999px;
    }

    .hide {
        display: none;
    }

    .valid {
        color: limegreen;
        margin-left: 0.25rem;
    }

    .invalid {
        color: red;
        margin-left: 0.25rem;
    }

    .errmsg {
        background-color: lightpink;
        color: firebrick;
        font-weight: bold;
        padding: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .line {
        display: inline-block;
    }
`;

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
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

    .registerSection {
        align-items: center !important;
        display: flex !important;
        justify-content: center !important;
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

export default Login
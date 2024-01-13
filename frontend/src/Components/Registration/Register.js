import { useRef, useState, useEffect } from 'react';
import axios from 'axios'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components'
import { Link, useNavigate, useLocation } from 'react-router-dom';
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = 'http://localhost:5000/api/v1/register';

const Register = () => {
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [full_name, setFullName] = useState('');
    const [country, setCountry] = useState('');

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    
    useEffect(() => {
        userRef.current.focus();
    }, [])

    // useEffect(() => {
    //     setValidName(USER_REGEX.test(user));
    // }, [user])

    // useEffect(() => {
    //     setValidPwd(PWD_REGEX.test(pwd));
    //     setValidMatch(pwd === matchPwd);
    // }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        // const v1 = USER_REGEX.test(user);
        // const v2 = PWD_REGEX.test(pwd);
        // if (!v1 || !v2) {
        //     setErrMsg("Invalid Entry");
        //     return;
        // }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd, full_name, country }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
   
            setUser('');
            setPwd('');
            setMatchPwd('');
            navigate('/login', { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <RegisterStyled>
                    <h1>Success!</h1>
                    <p>
                        <Link id="link" to="/">Sign In</Link>
                    </p>
                </RegisterStyled>
            ) : (
            <RegisterStyled>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} 
                                aria-live="assertive">{errMsg}</p>
                <h1>Регистрация</h1>
                <FormStyled onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        Электронная почта:                   
                    </label>
                    <input
                        type="text"
                        id="email"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    /> 
                    <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        От 4 до 24 символов.<br />
                        Должно начинаться с буквы.<br />
                        Допускаются буквы, цифры, подчеркивания, дефисы.           
                    </p> 

                    
                    <label htmlFor="password">
                            Пароль:                       
                    </label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}            
                    />
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        от 8 до 24 символов.<br />
                        Должен содержать прописные и строчные буквы, цифры и специальные символы..<br />
                        Разрешенные специальные символы: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>  


                    <label htmlFor="confirm_pwd">
                        Подтвердите пароль:
                    </label>
                    <input
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}            
                    />
                    
                    <label htmlFor="full_name">
                        Полное имя:
                    </label>
                    <input
                        type="text"
                        id="full_name"
                        onChange={(e) => setFullName(e.target.value)}
                        value={full_name}
                        required
                        onBlur={() => setMatchFocus(false)}            
                    />  

                    <label htmlFor="country">
                        Страна проживания:
                    </label>
                    <input
                        type="text"
                        id="country"
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        required           
                    />    
    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Должно соответствовать первому полю ввода пароля.
                    </p>  
                    {/* <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>   */}
                    <button >Создать аккаунт</button> 

                    <p>
                        Уже есть аккаунт?<br />
                        <span className="line">
                            <Link id="link" to="/">Войти</Link>
                        </span>
                    </p>                         
                </FormStyled>
            </RegisterStyled>
            )}
        </>
    )
}

const RegisterStyled = styled.div`    
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

export default Register
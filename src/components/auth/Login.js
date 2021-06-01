import React, { useEffect, useState, useContext } from "react";
import { useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import Logo from "../../imagini/to-do.png";

export default function Login(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(); 
    const {userData} = useContext(UserContext);

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (userData.user) history.push('/');
      })

    const submit = async (e) => {

        try{
            e.preventDefault();
            const loginUser = { email, password };
            const loginRes = await Axios.post("http://localhost:5000/users/login", loginUser);
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/");
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    return (
        <div className="Login_Page">
            <div className="welcome_to_stag">
                <img alt="" src={Logo}/>
            </div>
            <h1>Log in</h1>
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            <form onSubmit={submit}>
                <div className="input_field">
                    <label htmlFor="login_email">Email</label>
                    <input id="login_email" type="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input_field">
                    <label htmlFor="login_password">Password</label>
                    <input id="login_password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="finish_login">
                    <input type="submit" value="Login" />
                </div>
            </form>
        </div>
    )
}
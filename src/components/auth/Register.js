import React, { useState, useContext } from "react";
import { useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

export default function Register(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();

        try{
            const newUser = { email, password, passwordCheck, displayName };
            await Axios.post(
                "https://mernfirstapp.herokuapp.com/users/register", newUser);
            const loginRes = await Axios.post("https://mernfirstapp.herokuapp.com/users/login", {
                email, 
                password,
            });
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
        <div className="Register_Page">
            <h1>Register</h1>
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            <form onSubmit={submit}>
                <div className="input_field">
                    <label htmlFor="register_email">Email</label>
                    <input id="register_email" type="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input_field verifiy_password">
                    <label htmlFor="register_password">Password</label>
                    <input id="register_password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                    <input id="register_password" type="password" placeholder="Verify password" onChange={(e) => setPasswordCheck(e.target.value)}/>
                </div>
                <div className="input_field">
                    <label htmlFor="register_display_name">Display Name</label>
                    <input id="register_display_name" type="text" onChange={(e) => setDisplayName(e.target.value)}/>
                </div>

                <div className="finish_login register">
                    <input type="submit" value="Register" />
                </div>
            </form>
        </div>
    )
}
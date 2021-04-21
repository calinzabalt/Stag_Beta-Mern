import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import logo from "../../imagini/test1.png";

export default function AuthOptions() {
    const { userData, setUserData } = useContext(UserContext);

    const history = useHistory();

    const register = () => history.push("/register");
    const login = () => history.push("/login");
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
    };

    return (
        <div>
            {userData.user ? (
                <>
                <button onClick={logout}>Logout</button>
                <li className="logo_div"><Link to="/"><img src={logo}/></Link></li>
                <li><Link to="/">Targets</Link></li>
                <li><Link to="/create">Create Target Log</Link></li>
                <li><Link to="/user">Create User</Link></li>
                <li><Link to="/new-features">Comming Soon</Link></li>
                </>
            ) : (
            <div className="register_login">
                <button onClick={register}>Register</button>
                <button onClick={login}>Login</button>
            </div>
            )}
        </div>
    )
}
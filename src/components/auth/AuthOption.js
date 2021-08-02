import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import logo from "../../imagini/test1.png";

export default function AuthOptions() {
    const { userData, setUserData } = useContext(UserContext);
    const [isActive, setActive] = useState("false");
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

    const handleToggle = () => {
        setActive(!isActive);
      };

    return (
        <div>
            {userData.user ? (
                <div className={isActive ? "menu_item_container" : "menu_item_container_active"}>
                    <div className="menu_items">
                        <li className="logo_div"><Link to="/"><img alt="" src={logo}/></Link></li>
                        <li><Link to="/">Targets</Link></li>
                        <li><Link to="/create">Create Target Log</Link></li>
                        <li><Link to="/user">Create User</Link></li>
                        <li><Link to="/new-features">Comming Soon</Link></li>
                        <button onClick={logout}>Logout</button>
                        <div className="burger_button">
                            <button onClick={handleToggle}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                    <div className="mobile_menu">
                        <li className="logo_div"><Link to="/"><img alt="" src={logo}/></Link></li>
                        <li><Link onClick={handleToggle} to="/">Targets</Link></li>
                        <li><Link onClick={handleToggle} to="/create">Create Target Log</Link></li>
                        <li><Link onClick={handleToggle} to="/user">Create User</Link></li>
                        <li><Link onClick={handleToggle} to="/new-features">Comming Soon</Link></li>
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
            ) : (
            <div className="register_login">
                <button onClick={register}>Register</button>
                <button onClick={login}>Login</button>
            </div>
            )}
        </div>
    )
}
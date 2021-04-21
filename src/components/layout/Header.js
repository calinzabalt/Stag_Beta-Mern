import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import "./navbar.css"
import AuthOptions from "../auth/AuthOption";

export default function Header(){
    const {userData} = useContext(UserContext);
    const history = useHistory();
    const color = JSON.parse(localStorage.getItem("theme-color"));

    useEffect(() => {
        if (!userData.user) history.push("/login")
    });

    return (
        <div className="navbar" style={{
            backgroundColor: color,
        }}>
            <ul>
                <AuthOptions />
            </ul>
         </div>
    )
}
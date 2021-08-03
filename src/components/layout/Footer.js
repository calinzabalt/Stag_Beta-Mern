import React from "react";
import "./footer.css"
import { Link } from "react-router-dom";

export default function Footer(){
    return (
        <div className="Footer">
            <ul>
                <li><Link to="/Terms">Terms and condition</Link></li>
                <li><Link to="/Privacy">Privacy policy</Link></li>
            </ul>
        </div>
    )
}
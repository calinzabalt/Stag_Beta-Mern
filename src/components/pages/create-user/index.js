import React, { Component } from 'react';
import "../create-target/CreateTarget.css"
import axios from "axios"

export default class CreateUser extends Component{
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: ''
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const familymember = {
            username: this.state.username,
        }

        console.log(familymember);
        
        let token = localStorage.getItem("auth-token");
        axios.post('http://localhost:5000/familymembers/add', familymember,
        { headers: { "x-auth-token": token}})
            .then(res => console.log(res.data));

        this.setState({
            username: ''
        })
    }

    render(){
        return(
            <div className="add_new user">
                <h2>Create Family Member</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form_group">
                        <label>Username: </label>
                        <input 
                            required
                            className="form_control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form_group">
                        <div className="btn_submit">
                            <input type="submit" value="Create User" className="btn_primary" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
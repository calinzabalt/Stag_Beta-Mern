import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./CreateTarget.css";
import axios from "axios";

export default class CreateTarget extends Component{
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            priority: 'select',
            duration: 0,
            date: new Date(),
            familymembers: []
        }
    }

    componentDidMount() {
        let token = localStorage.getItem("auth-token");
        axios.get('https://mernfirstapp.herokuapp.com/familymembers/',
        { headers: { "x-auth-token": token}})
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        familymembers: response.data.map(familymember => familymember.username),
                        username: response.data[0].username
                    })
                }
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangePriority(e) {
        this.setState({
            priority: e.target.value
        })
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }
 
    onChangeDate(date) {
        this.setState({
          date: date
        })
      }

    onSubmit(e) {
        e.preventDefault();

        const target = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
            priority: this.state.priority
          }

        console.log(target);
        let token = localStorage.getItem("auth-token");
        axios.post('https://mernfirstapp.herokuapp.com/targets/add', target, 
        { headers: { "x-auth-token": token}})
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render(){
        return(
            <div className="add_new target">
                <h2>Add new Target</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form_group">
                        <label>Username: </label>
                        <select 
                            ref="userInput"
                            required
                            className="form_control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                                {
                                    this.state.familymembers.map(function(familymember) {
                                        return <option
                                            key={familymember}
                                            value={familymember}>{familymember}
                                            </option>;
                                    })
                                }
                        </select>
                    </div>
                    <div className="form_group">
                        <label>Priority: </label>
                        <select 
                            className="form_control"
                            value={this.state.priority}
                            onChange={this.onChangePriority}>           
                            <option value="low">low</option>
                            <option value="medium">medium</option>   
                            <option value="high">high</option>      
                        </select>
                    </div>
                    <div className="form_group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form_control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form_group">
                        <label>Duration (in minutes):</label>
                        <input
                            type="text"
                            className="form_control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form_group">
                        <label>Date: </label>
                        <div className="Date_picker">
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className="form_group">
                        <div className="btn_submit">
                            <input type="submit" value="Create target" className="btn_primary" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
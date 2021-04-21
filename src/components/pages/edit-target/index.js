import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios"

export default class EditTarget extends Component{
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/targets/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                })
            })
            .catch(function (error) {
                console.log(error);
            })
            let token = localStorage.getItem("auth-token");
            axios.get('http://localhost:5000/familymembers/',
            { headers: { "x-auth-token": token}})
            .then(response => {
              if (response.data.length > 0) {
                this.setState({
                  users: response.data.map(user => user.username),
                })
              }
            })
            .catch((error) => {
              console.log(error);
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
            date: this.state.date
        }

        console.log(target);

        axios.post('http://localhost:5000/targets/update/' + this.props.match.params.id, target)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render(){
        return(
            <div className="add_new target">
                <h2>Edit target</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form_group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form_control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                                {
                                    this.state.users.map(function(user) {
                                        return <option
                                            key={user}
                                            value={user}>{user}
                                            </option>;
                                    })
                                }
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
                            <input type="submit" value="Edit target" className="btn_primary" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
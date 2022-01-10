import React, { Component } from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditExercise extends Component {

    constructor(props){
        super();
        this.state = {
            username: "",
            description: "",
            users: [],
            editc:0,
            
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:3000/exercises/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    description: res.data.description,
                  
                })
            })
            .catch(function (error){
                console.log(error);
            })

        axios.get('http://localhost:3000/users/')
            .then(response => {
                if(response.data.length > 0) {
                    this.setState({ 
                        users: response.data.map(user => user.username)
                    });
                }
            })
    }

    onChangeUsername(e) {
        this.setState({ username: e.target.value})
    }
    onChangeDescription(e) {
        this.setState({ description: e.target.value})
    }
  
    onSubmit(e) {
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
           
        }

        console.log(exercise);

        axios.post('http://localhost:3000/exercises/update/'+this.props.match.params.id, exercise)
            .then(res => {this.setState({editc:this.state.editc+1});
                console.log(res.data)});

        window.location = "/";
    }
    
    render() { 
        return ( 
            <div className="container">
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select 
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername} >
                            {
                                this.state.users.map(function(user) {
                                    return <option key={user} value={user}>{user}</option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input
                            type="text" required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    
                    
                    <div className="form-group">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>
                    <p> Count update : {this.state.editc}</p>
                </form>
            </div>
         );
    }
}
 
export default EditExercise;
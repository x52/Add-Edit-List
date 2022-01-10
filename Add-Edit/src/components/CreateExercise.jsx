import React, { Component } from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateExercise extends Component {

    constructor(props){
        super();
        this.state = {
            username: "",
            description: "",
            duration: 0,
            addc:0,
           // date: new Date(),
            users: []
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.IncrementAddCounter = this.IncrementAddCounter.bind(this);
        
        //this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:3000/users/')
            .then(response => {
                if(response.data.length > 0) {
                    this.setState({ 
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
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
    onChangeDuration(e) {
        this.setState({ duration: e.target.value})
    }
   
    onSubmit(e) {
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            
           
            
        }

        console.log(exercise);

        axios.post('http://localhost:3000/exercises/add', exercise)
            .then(res => console.log(res.data));

        //window.location = "/";
    }
    
    IncrementAddCounter = () => {
        console.log('hasiu');
        console.log(this.state.addc);
        const val = this.state.addc;
        console.log(val);
        this.setState({addc:val+1});
          console.log(this.state.addc);
      };

      
    render() { 
        return ( 
            <div className="container">
               
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
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
                        <button type="submit" value="Add ToDo List" className="btn btn-primary" onClick={this.IncrementAddCounter}/>
                    </div>
                    <p>Add API HITS : {this.state.addc} </p>
                </form>
            </div>
         );
    }
}
 
export default CreateExercise;
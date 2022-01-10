import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import CreateExercise from "./CreateExercise";



class ExercisesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exercises: [],
            updatec:0,
            
        }

        this.deleteExercise = this.deleteExercise.bind(this);
    }
    

    componentDidMount() {
        axios.get('http://localhost:3000/exercises/')
            .then(res => {
                this.setState({ exercises: res.data })
            })
            .catch(error => console.log(error));
    }

    deleteExercise(id) {
        axios.delete('http://localhost:3000/exercises/' +id)
            .then(res => console.log(res.data));

        this.setState({ exercises: this.state.exercises.filter(el => el._id !== id)})
    }

    exercisesList() {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />
        })
    }

    

      IncrementUpdateCounter = () => {
        this.setState({ updatec: this.state.updatec + 1 });
      }

    render() { 
        return ( 
            <div className="container">
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exercisesList()}
                    </tbody>
                </table>
                < CreateExercise />
            </div>
         );
    }
}


const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        
        
        <td>
            <button className="btn btn-secondary"  ><Link to={"/edit/"+props.exercise._id} style={{color:"white"}}>Edit</Link></button> | <button className="btn btn-danger" onClick={() => {props.deleteExercise(props.exercise._id) }}>Delete</button>
        </td>
    </tr>
)

 
export default ExercisesList;
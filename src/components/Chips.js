import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginWithGoogle, logoutUser } from '../actions/auth';
import { search } from '../actions/filter';
import C from '../constants';
import Chip from 'material-ui/Chip';

const styles = {
    chip: {
        margin: 2
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};


class Chips extends Component{
    constructor(props){
        super(props);
        this.state = {
            selected: ["rgb(177,177,177)", "rgb(177,177,177)", "rgb(177,177,177)", "rgb(177,177,177)"]
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleNewPost = this.handleNewPost.bind(this);
    }

    handleNewPost(){
        console.log("hello");
    }

    handleClick(index){
        let newSelected = ["rgb(177,177,177)", "rgb(177,177,177)", "rgb(177,177,177)", "rgb(177,177,177)"];
        if (newSelected[index] == "rgb(177,177,177)" ){
            newSelected[index] = "rgb(237,82,129)";
        } else {
            newSelected[index] = "rgb(177,177,177)";
        }
        this.setState({
            selected: newSelected
        })
    }   

    render(){
        return(
            <div style={styles.wrapper}>
                <Chip style={styles.chip} onClick={() => this.handleClick(1)} labelColor={"white"} backgroundColor={this.state.selected[1]}>Low-High</Chip>
                <Chip style={styles.chip} onClick={() => this.handleClick(0)} labelColor={"white"} backgroundColor={this.state.selected[0]}>High-Low</Chip>
                <Chip style={styles.chip} onClick={() => this.handleClick(2)} labelColor={"white"} backgroundColor={this.state.selected[2]}>Lated</Chip>
                <Chip style={styles.chip} onClick={() => this.handleClick(3)} labelColor={"white"} backgroundColor={this.state.selected[3]}>Oldest</Chip>
            </div>
        )
    }    
}

export default Chips;
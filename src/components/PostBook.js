import React, {Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';

const style = {
  height: 300,
  width: "100%",
  margin:0,
  marginBottom: 20,
  marginTop: 20,
  textAlign: 'center',
};


class PostBook extends Component {
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      contents: {
        title: '',
        price:'',
        major:'',
        description: ''
      }
    };
  }

  onChange(e){
    this.setState(
      Object.assign(this.state.contents, {
        [e.target.name]: e.target.value
      })
    )
  }
  onSubmit(e){
      e.preventDefault();
      this.props.submit(this.state.contents);
      this.setState(
        {
         contents: {
           title: '',
           price:'',
           major:'',
           description: ''
         }
       }
     );
  }

  render(){
    return(
      <Card style={style}>
          <form onSubmit={this.onSubmit}>
            <TextField
              hintText="Enter Book Title"
              floatingLabelText="Book Title"
              name="title"
              onChange={this.onChange}
              value={this.state.contents.title}
            /><br />
            <TextField
              hintText="Major"
              floatingLabelText="For what Major"
              name="major"
              onChange={this.onChange}
              value={this.state.contents.major}
            /><br />
            <TextField
              hintText="Price"
              floatingLabelText="How much do you want to sell for?"
              name="price"
              onChange={this.onChange}
              value={this.state.contents.price}
            /><br />
            <TextField
              hintText="Description"
              floatingLabelText="Description"
              name="description"
              onChange={this.onChange}
              value={this.state.contents.description}
            /><br />
          <RaisedButton label="Post book" fullWidth={true} onClick={this.onSubmit} primary = {true}/>
          </form>
       </Card>
    )
  }
}

export default PostBook ;

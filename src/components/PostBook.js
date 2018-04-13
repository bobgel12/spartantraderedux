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
      },
      require: ''
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
      if (this.state.contents.title != '' && this.state.contents.price != '' && this.state.contents.major != '' && this.state.contents.description != ''){
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
      } else{
        
      }
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
              errorText={this.state.rerquire}
            /><br />
            <TextField
              hintText="Major"
              floatingLabelText="For what Major"
              name="major"
              onChange={this.onChange}
              value={this.state.contents.major}
              errorText={this.state.rerquire}
            /><br />
            <TextField
              hintText="Price"
              floatingLabelText="How much do you want to sell for?"
              name="price"
              onChange={this.onChange}
              value={this.state.contents.price}
              errorText={this.state.rerquire}
            /><br />
            <TextField
              hintText="Description"
              floatingLabelText="Description"
              name="description"
              onChange={this.onChange}
              value={this.state.contents.description}
              errorText={this.state.rerquire}
            /><br />
          <RaisedButton label="Post book" type="submit" fullWidth={true} primary = {true}/>
          </form>
       </Card>
    )
  }
}

export default PostBook ;

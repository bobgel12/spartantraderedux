import React, {Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';
import Snackbar from 'material-ui/Snackbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

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
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleChangeMajor = this.handleChangeMajor.bind(this);
    this.state = {
      contents: {
        title: '',
        price:'',
        major:'Engineering',
        description: ''
      },
      require: '',
      submited: false
    };
  }

  onChange(e){
    this.setState(
      Object.assign(this.state.contents, {
        [e.target.name]: e.target.value
      })
    )
  }

  handleChangeMajor(event, index, value){
    this.setState(
      Object.assign(this.state.contents, {
        major: value
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
           },
           submited: true,
           require: ""
         }
       );
      } else{
        this.setState({
            require: 'Please enter all fields'
        })
      }
  }

  handleRequestClose(){
      this.setState(Object.assign({}, this.state, {
          submited: false
      }));
  }

  render(){
    return(
      <Card style={style}>
          <Snackbar
            open={this.state.submited}
            message="Book posted!"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
            style = {{color: 'green'}}
          />
          <form onSubmit={this.onSubmit}>
            <TextField
              hintText="Enter Book Title"
              // floatingLabelText="Book Title"
              name="title"
              onChange={this.onChange}
              value={this.state.contents.title}
              errorText={this.state.require}
              />
            <TextField
              hintText="Price"
              // floatingLabelText="How much do you want to sell for?"
              name="price"
              onChange={this.onChange}
              value={this.state.contents.price}
              errorText={this.state.require}
              />
            <TextField
              hintText="Description"
              // floatingLabelText="Description"
              name="description"
              onChange={this.onChange}
              value={this.state.contents.description}
              errorText={this.state.require}
              />
            <DropDownMenu value={this.state.contents.major} onChange={this.handleChangeMajor} style={{width: 300}}
              autoWidth={false}>
              <MenuItem value={"Engineering"} primaryText="Engineering" />
              <MenuItem value={"Business"} primaryText="Business" />
              <MenuItem value={"Computer Science"} primaryText="Computer Science" />
              <MenuItem value={"Socialology"} primaryText="Socialology" />
              <MenuItem value={"Other"} primaryText="Other" />
            </DropDownMenu>
          <RaisedButton style = {{marginBottom: '0', width: '60%'}} label="Post book" type="submit" primary = {true}/>
          </form>
       </Card>
    )
  }
}

export default PostBook ;

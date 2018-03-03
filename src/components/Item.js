import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';


import { connect } from 'react-redux';
import { deletePost, addWishlist } from '../actions/posts';

const style = {
  height: 300,
  width: "100%",
  margin:0,
  marginTop: 20,
  marginBottom: 20,
  textAlign: 'center',
};

const buttonStyle = {
  margin: 10
}

class Item extends Component{
  constructor(props){
    super(props)
    this.delete = this.delete.bind(this);
    this.a = this.a.bind(this);
  }

  delete = () => {
    this.props.addWishlist(this.props.id);
  }

  a = () => {
    this.props.addWishlist(this.props.id, this.props.auth.uid);
  }

  render() {
    if (this.props.id === 'mini') {
      return (
        <CardText>
          {this.props.item.title}
        </CardText>
      );
    }
    return (
      <Card style={style}>
        <CardHeader
          title={this.props.item.username}
          subtitle="SJSU"
          avatar={this.props.item.userPhoto}
          />
        <CardTitle title={this.props.item.title} subtitle={this.props.item.major + " price " + this.props.item.price} />
        <CardActions>
          <RaisedButton label="Message" primary = {true}/>
          <RaisedButton label="WishList" primary = {true} onClick = {this.a}/>
          {
            this.props.auth.uid ?
            this.props.auth.username === this.props.item.username ?
            <RaisedButton label="Delete" secondary={true} style = {buttonStyle} onClick = {this.delete}/>
            :
            null
            :
            null
          }
        </CardActions>
      </Card>
    )
  }
}


const mapStateToProps = (state) => {
	return {
		auth: state.auth
	};
};

const mapDispatchToProps = {
	deletePost, addWishlist
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);

import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';


import { connect } from 'react-redux';
import { deletePost } from '../actions/posts';

const style = {
  height: 300,
  width: 280,
  margin:20,
  textAlign: 'center',
};

const buttonStyle = {
  margin: 10
}


class Item extends Component{
  render() {
    return (
      <Card style={style}>
        <CardHeader
          title={this.props.item.user}
          subtitle="SJSU"
          avatar={this.props.item.userPhoto}
          />
        <CardTitle title={this.props.item.title} subtitle={this.props.item.major + " price " + this.props.item.price} />
        <CardActions>
          <RaisedButton label="Interested" primary = {true}/>
          <RaisedButton label="WishList" primary = {true}/>
          {
            this.props.auth.uid ?
            this.props.auth.username === this.props.item.username ?
            <RaisedButton label="Delete" secondary={true} style = {buttonStyle}/>
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
	deletePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);

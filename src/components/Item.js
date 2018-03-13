import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { deletePost, addWishlist } from '../actions/posts';

const style = {
  height: 324,
  width: "100%",
  margin:0,
  marginTop: 20,
  marginBottom: 20,
  textAlign: 'center',
};

const buttonStyle = {
  margin: 10,
  marginTop: 5
}

class Item extends Component{
  constructor(props){
    super(props)
    this.delete = this.delete.bind(this);
    this.addWishlist = this.addWishlist.bind(this);
  }

  delete = () => {
    this.props.deletePost(this.props.id);
  }

  addWishlist = () => {
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
      <div>
        <Card style={style}>
          <CardHeader
            title={this.props.item.username}
            subtitle="SJSU"
            avatar={this.props.item.userPhoto}
            children = {
                this.props.auth.uid ?
                this.props.auth.uid === this.props.item.uid ?
                <RaisedButton label="Delete" secondary={true} style = {buttonStyle} onClick = {this.delete}/>
                :
                null
                :
                null
            }
            />
          <CardTitle title={this.props.item.title} subtitle={"Major: "+this.props.item.major + ", Price: $" + this.props.item.price} />
          <CardText>
            {this.props.item.description}
          </CardText>
          <CardActions>
            {
                this.props.auth.uid ?
                <div>
                  <Link to={`/posts/${this.props.id}`}><RaisedButton style={buttonStyle} label="READMORE" primary={true}/></Link>
                  <RaisedButton style= {buttonStyle} label="WISHLIST" primary = {true} onClick = {this.addWishlist}/>
                </div>
                :
                null
            }
          </CardActions>
        </Card>
      </div>
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

import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';


import { connect } from 'react-redux';
import { deletePost, addWishlist } from '../actions/posts';


const styles = {
  smallIcon: {
    width: 36,
    height: 36,
  },
  mediumIcon: {
    width: 48,
    height: 48,
  },
  largeIcon: {
    width: 60,
    height: 60,
  },
  small: {
    width: 72,
    height: 72,
    padding: 16,
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24,
  },
  large: {
    width: 120,
    height: 120,
    padding: 30,
  },
};

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
const buttonDelete = {
  margin: 2,
  marginTop: 5
}

class Item extends Component{
  constructor(props){
    super(props);
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
    let { item } = this.props;
    let { uid } = this.props.auth;
    let flag = false;
    if (item.favoritesUser) {
      Object.keys(item.favoritesUser).map((user) => {
        if (item.favoritesUser[user] === uid) {
          flag = true;
        }
      })
    }
    return (
      <div>
        <Card style={style}>
          <CardHeader
            title={this.props.item.username}
            subtitle="SJSU"
            children={<Link to={`/profile/${this.props.item.uid}`}><Avatar src={this.props.item.userPhoto} /></Link>}
            />
          <CardTitle title={this.props.item.title} subtitle={"Major: "+this.props.item.major + ", Price: $" + this.props.item.price+ ", ISBN: "+ this.props.item.isbn} />
          <CardActions>
            {
              <div>
                {                  
                  this.props.auth.uid ?
                    flag ?
                      <IconButton
                        iconStyle={styles.largeIcon}
                        style={styles.medium}
                        onClick={this.addWishlist}
                      >
                        <i className="material-icons red">favorite</i>
                      </IconButton>
                      :
                      <IconButton
                        iconStyle={styles.largeIcon}
                        style={styles.medium}
                        onClick={this.addWishlist}
                      >
                        <i className="material-icons red">favorite_border</i>
                      </IconButton>
                  : null
                }
                  <Link to={`/posts/${this.props.id}`}><RaisedButton style={buttonStyle} label="READMORE" primary={true}/></Link>
                {
                  this.props.auth.uid ?
                  this.props.auth.uid === this.props.item.uid ?
                  <div>
                    <RaisedButton label="Delete" secondary={true} style={buttonDelete} onClick={this.delete} />
                    <Link to={`/edit/${this.props.id}`}><RaisedButton label="Edit" secondary={true} style={buttonDelete} /></Link>
                  </div>
                  :
                  null
                  :
                  null
                }
              </div>
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

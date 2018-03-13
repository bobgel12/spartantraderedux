import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import Item from './Item.js';
import FontIcon from 'material-ui/FontIcon';

import { connect } from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import { deletePost, addWishlist, listenToWishList } from '../actions/posts';
import { database } from '../firebaseApp';


const styles = {
  card: {
    height: 900,
    width: "100%",
    margin:0,
    marginBottom: 20,
    textAlign: 'center',
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  buttonStyle: {
    margin: 10
  }
};

class Profile extends Component{
  constructor(props){
    super(props)
    this.state = {
      value: 'a',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  handleRemove = (qid) => {
    console.log(qid);
  }

  componentDidMount(){
      this.props.listenToWishList(this.props.auth.uid);
  }
    
    render() {
      return (
      <Tabs
       value={this.state.value}
       onChange={this.handleChange}
       >
       <Tab value="a" icon={<i className="material-icons md-18">grade</i>}>
         <div>
           <Card style={styles.card}>
             <CardHeader
               title={this.props.auth.username}
               subtitle="SJSU"
               avatar={this.props.auth.photo}
               />
             <CardTitle title="Rating" subtitle="4.5" />
             <CardText>
             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
             </CardText>
           </Card>
         </div>
       </Tab>
       <Tab value="b" icon={<i className="material-icons md-18">message</i>}>
       <div>
         <Card style={styles.card}>
           <CardHeader
             title={this.props.auth.username}
             subtitle="SJSU"
             avatar={this.props.auth.photo}
             />
             <CardTitle title="Messages" />
             <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </CardText>
         </Card>
       </div>
       </Tab>
       <Tab value="c" icon={<i className="material-icons md-18">redeem</i>}>
       <div>
         <Card style={styles.card}>
           <CardHeader
             title={this.props.auth.username}
             subtitle="SJSU"
             avatar={this.props.auth.photo}
             />
             <CardTitle title="Wish List" />
            {
              // map performs some function for each element of array
              this.props.wishList ?
                  Object.keys(this.props.wishList).map((qid) => {
                  return (
                    <div key = {qid}>
                      <CardText>
                        {this.props.posts.data[this.props.wishList[qid]].title}
                    </CardText>
                      <RaisedButton style={styles.buttonStyle} label="Remove" onClick={() => { console.log(qid); console.log("Remove wishlist"); }} />
                      <RaisedButton style={styles.buttonStyle} label="View" onClick={() => { console.log(qid); console.log("Go to the Item page"); }} />
                    </div>
                  );
                })
                : 
                null
            }
         </Card>
       </div>
       </Tab>
     </Tabs>
    )
  }
}


const mapStateToProps = (state) => {
	return {
		auth: state.auth,
    posts: state.posts,
    wishList: state.posts.wishList
	};
};

const mapDispatchToProps = {
  deletePost, listenToWishList
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

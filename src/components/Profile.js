import React, {Component} from 'react';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import { deletePost, listenToWishList, deleteWishlist} from '../actions/posts';
import { getUser } from '../actions/auth';
import Message from './Message';
import { Link } from 'react-router-dom';


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
      uid: this.props.match.params.uid
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };
  
  componentWillMount(){
    this.props.getUser(this.props.match.params.uid);
    this.props.listenToWishList(this.props.auth.uid);
  }
  
  render() {
      if(this.state.uid === this.props.auth.uid){
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
                    this.props.wishlist.wishList ?
                    Object.keys(this.props.wishlist.wishList).map((qid) => {
                    return (
                      <div key = {qid}>
                        <CardText>
                          {this.props.posts.data[this.props.wishlist.wishList[qid]].title}
                        </CardText>
                        <RaisedButton style={styles.buttonStyle} label="Remove" onClick={() => { this.props.deleteWishlist(qid, this.props.auth.uid, this.props.wishlist.wishList[qid]) }} />
                        <Link to={`/posts/${this.props.wishlist.wishList[qid]}`}><RaisedButton style={styles.buttonStyle} label="View" /></Link>
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
      } else {
        console.log("No auth")
        return (
            this.props.profileUser ?
              <div>
                <Card style={styles.card}>
                  <CardHeader
                    title={this.props.profileUser.username}
                    subtitle="SJSU"
                    avatar={this.props.profileUser.userPhoto}
                  />
                  <CardTitle title="Rating" subtitle={this.props.profileUser.rating} />
                  <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </CardText>
                </Card>
              </div>
              :null
        )
      }
  }
}


const mapStateToProps = (state) => {
	return {
		auth: state.auth,
    posts: state.posts,
    wishlist: state.wishlist,
    profileUser: state.auth.profileUser
	};
};

const mapDispatchToProps = {
  deletePost, listenToWishList, deleteWishlist, getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

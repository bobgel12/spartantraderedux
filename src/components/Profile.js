import React, {Component} from 'react';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';

import { connect } from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import { deletePost, listenToWishList, deleteWishlist, rate} from '../actions/posts';
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
      star : ['black','black','black','black','black'],
      value: 'a',
      rateMessage:"",
      rateValue: 5,
      uid: this.props.match.params.uid
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(value){
    let star = ['black', 'black', 'black', 'black', 'black'];
    for(let i = 0; i < value; i++){
      star[i] = 'rgb(233,185,85)';
    }
    this.setState({
      rateValue : value,
      star: star
    });
  };

  onChange(e) {
    this.setState(Object.assign({}, this.state, {
      rateMessage : e.target.value
    }));
  }

  onSubmit(e){
    e.preventDefault();
    if (this.state.rateMessage && this.state.rateValue) {
      this.props.rate(this.state.rateValue, this.state.rateMessage, this.props.profileUser.uid);
      this.setState({
        rateMessage : ""
      });
    }
  }

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
                        <RaisedButton secondary = {true} style={styles.buttonStyle} label="Remove" onClick={() => { this.props.deleteWishlist(qid, this.props.auth.uid, this.props.wishlist.wishList[qid]) }} />
                        <Link to={`/posts/${this.props.wishlist.wishList[qid]}`}><RaisedButton primary = {true} style={styles.buttonStyle} label="View" /></Link>
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
                    <div>
                      <IconButton iconStyle={{color: this.state.star[0]}} tooltip="1 Star" touch={true} tooltipPosition="bottom-center" onClick= {() => {this.handleChange(1)}}>
                        <ActionGrade />
                      </IconButton>
                      <IconButton iconStyle={{color: this.state.star[1]}} tooltip="2 Star" touch={true} tooltipPosition="bottom-center" onClick= {() => {this.handleChange(2)}}>
                        <ActionGrade />
                      </IconButton>
                      <IconButton iconStyle={{color: this.state.star[2]}} tooltip="3 Star" touch={true} tooltipPosition="bottom-center" onClick= {() => {this.handleChange(3)}}>
                        <ActionGrade />
                      </IconButton>
                      <IconButton iconStyle={{color: this.state.star[3]}} tooltip="4 Star" touch={true} tooltipPosition="bottom-center" onClick= {() => {this.handleChange(4)}}>
                        <ActionGrade />
                      </IconButton>
                      <IconButton iconStyle={{color: this.state.star[4]}} tooltip="5 Star" touch={true} tooltipPosition="bottom-center" onClick= {() => {this.handleChange(5)}}>
                        <ActionGrade />
                      </IconButton>
                    </div>
                  <form onSubmit={this.onSubmit}>
                      <TextField
                          style={{width: "50%"}}
                          fullWidth={true}
                          floatingLabelText="How would you rate this person?"
                          name="title"
                          onChange={this.onChange}
                          value={this.state.rateMessage}
                      />
                      <RaisedButton label="Submit" type="submit" primary={true}  style={{width: "50%"}} style={styles.buttonStyle} />
                  </form>
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
  deletePost, listenToWishList, deleteWishlist, getUser, rate
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

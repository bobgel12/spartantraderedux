import PostBook from './PostBook.js';
import Item from './Item.js';
import Profile from './Profile.js';


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitPost, deletePost } from '../actions/posts';

class Posts extends Component{
  getJSX(props) {
		switch (props.posts.hasReceivedData) {
			case true: return (
        <div className= "container">
          <div className="row">
            {
              this.props.auth.uid ?
              <div className="col-xs-12 col-md-6 col-lg-4">
                <PostBook submit = {this.props.submitPost}/>
              </div>
              :
              null
            }
            {
              Object.keys(this.props.posts.data).map((item) => {
                return (
                  <div className="col-xs-12 col-md-6 col-lg-4" key={item}>
                    <Item item = {this.props.posts.data[item]} id = {item}/>
                  </div>
                );
              })
            }
          </div>
        </div>
			);
			default: return (
        <div className= "container">
          <div className="row">
            {
              this.props.auth.uid ?
              <div className="col-xs-12 col-md-6 col-lg-4">
                <PostBook submit = {this.props.submitPost}/>
              </div>
              :
              null
            }
          </div>
        </div>
			);
		}
	}
  render(){
    return this.getJSX(this.props);
  }
}


const mapStateToProps = (state) => {
	return {
		posts: state.posts,
		auth: state.auth,
    hasReceivedData: state.posts.hasReceivedData,
	};
};

const mapDispatchToProps = {
	submitPost,
	deletePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);

// 
// <div className="col-xs-12 col-md-6 col-lg-4">
//   <Profile />
// </div>

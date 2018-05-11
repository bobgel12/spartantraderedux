import PostBook from './PostBook.js';
import Item from './Item.js';
import { Card, CardActions, CardHeader, CardTitle, CardText, CardMedia } from 'material-ui/Card';
import Chips from './Chips';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitPost, deletePost, listenToWishList } from '../actions/posts';


const CardEmpty = () =>{
  return(
    <Card style={{width:"500px"}}>
      <CardMedia>
        <img src="https://images.unsplash.com/photo-1470506926202-05d3fca84c9a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d4ba5d17ed5ba1fac74c8ca5cff92c13&auto=format&fit=crop&w=2100&q=80" alt="" />
      </CardMedia>
      <CardTitle title="OOPS! NO RESULTS NEAR YOU" subtitle="Card subtitle" />
      <CardText>
        Try looking for something else or check again soon!
    </CardText>
    </Card>
  )
}

class Posts extends Component{
  componentWillMount() {
    if(this.props.auth.uid){
      this.props.listenToWishList(this.props.auth.uid);
    }
  }

  render(){
    return(
        <div className="container">
          <div className="row">
            {
              this.props.auth.uid ?
                <div className="col-xs-12 col-md-6 col-lg-4">
                  <PostBook submit={this.props.submitPost} />
                </div>
                :
                null
            }
            {
              this.props.hasReceivedData ?
              this.props.posts.data ?
                Object.keys(this.props.posts.data).map((item) => {
                  return (
                    <div className="col-xs-12 col-md-6 col-lg-4" key={item}>
                      <Item item={this.props.posts.data[item]} id={item} />
                    </div>
                  );
                })
                :
                <CardEmpty />
                :
                null
            }
          </div>
        </div>    
    )
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
  listenToWishList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);

import React, {Component}from 'react';
import Auth from './Auth';
import Posts from './Posts';
import Profile from './Profile';

import { connect } from 'react-redux';
import { submitPost, deletePost } from '../actions/posts';

class Page extends Component {
	render(){
		return (
			<div>
			<Auth />
			{
				this.props.auth.profile ?
				<div>
				<Profile auth={this.props.auth}/>
				</div>
				:
				<div>
				<Posts />
				</div>
			}
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

const mapDispatchToProps = {
	submitPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);

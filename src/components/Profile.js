import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';

import { connect } from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import { deletePost, addWishlist } from '../actions/posts';


const styles = {
  card: {
    height: 300,
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
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    return (
      <Tabs
       value={this.state.value}
       onChange={this.handleChange}
       >
       <Tab value="a" icon={<i class="material-icons md-18">grade</i>}>
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
       <Tab value="b" icon={<i class="material-icons md-18">message</i>}>
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
       <Tab value="c" icon={<i class="material-icons md-18">redeem</i>}>
       <div>
         <Card style={styles.card}>
           <CardHeader
             title={this.props.auth.username}
             subtitle="SJSU"
             avatar={this.props.auth.photo}
             />
             <CardTitle title="Wish List" />
             <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </CardText>
         </Card>
       </div>
       </Tab>
     </Tabs>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

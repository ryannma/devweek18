import React, { Component } from 'react';
import { Form, Item, Input, Label, Text } from 'native-base';

class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
  }

  handleUsername(e) {
    console.log(e);
    this.setState({
      username: e
    });
  }

  render() {
    return (
      <Form>
        <Item>
          <Input placeholder='Username' 
                 onChangeText={this.handleUsername.bind(this)}/>
        </Item>
        <Item last>
          <Input placeholder="Password"/>
        </Item>
        <Text>
          {this.state.username}
        </Text>
      </Form>
    );
  }
}


module.exports = SigninForm;
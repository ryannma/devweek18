import React, { Component } from 'react';
import {StyleSheet, Text } from 'react-native';
import {Body, Button, Container, Header, Content, Form, Icon, Item, Input, Label, Left, Title} from 'native-base';

export default class RegularTextboxExample extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Item regular>
            <Input placeholder='Regular Textbox' />
          </Item>
        </Content>
      </Container>
    );
  }
}

export class WelcomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      patientId: ''
    }
  }

  changePatientId(e) {
    console.log(JSON.stringify(e, null, 2));
    this.setState({
      patientId: e.value
    });
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transpare nt>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>MedSync</Title>
          </Body>
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Enter Patient Id</Label>
              <Input value={this.state.patientId} 
                     onChangeText={this.changePatientId.bind(this)}/>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
});

module.exports = WelcomePage;
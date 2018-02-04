import React, { Component } from 'react';
import {StyleSheet, Text } from 'react-native';
import {Body, Button, Container, Header, Content, Form, Icon, Item, Input, Label, Left, Title} from 'native-base';

export class WelcomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
  }

  changeUsername(e) {
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
            <Button transparent
                    onPress={() => this.props.navigation.navigate("DrawerOpen")}>
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
              <Label>Username</Label>
              <Input value={this.state.username} 
                     onChangeText={this.changeUsername.bind(this)}/>
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input/>
            </Item>
            <Button rounded light block style={{marginTop: 25, marginLeft: 25, marginRight: 25}}
                    onPress={() => this.props.navigation.navigate('Patient')}>
              <Text> Log In </Text>
            </Button>
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

module.exports = WelcomeScreen;
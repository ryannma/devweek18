import React, {Component} from 'react';
import { AppRegistry, View, StatusBar } from 'react-native';
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Input,
  InputGroup,
  Item,
  Tab,
  Tabs,
  Footer,
  FooterTab,
  Label
} from 'native-base';

export default class JadeChat extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header backgroundColor='#34d19a'>
          <Body>
            <Title>Patient Profile</Title>
          </Body>
        </Header>
        <Content padder>
          <Item floatingLabel style={{ marginTop: 20 }}>
            <Label>Patient Profile</Label>
            <Input />
          </Item>
          <Button
            rounded
            success
            style={{ marginTop: 20, alignSelf: 'center' }}>
            <Text>Goto Online Profile</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
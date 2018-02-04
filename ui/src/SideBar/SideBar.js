import React, {Component} from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import { Body, Container, Content, Footer, Header,H2, Text, Thumbnail, List, ListItem } from "native-base";
const routes = ["Profile", "History", "Notifications", "Upload"];
export default class SideBar extends Component {
  render() {
    return (
      <Container>
        <Content padder>
          <Image
              source={{
                uri: "https://image.ibb.co/b8dqdx/Screen_Shot_2018_02_04_at_11_21_02_AM.png"
              }}
              style={{
                height: 100,
                alignSelf: "stretch" ,
                justifyContent: "center",
                alignItems: "center"
              }}>
          </Image>
          <List>
            <ListItem itemHeader>
              <Text>WELCOME, MARY JANE</Text>
            </ListItem>
            <Thumbnail source={{uri: 'http://www.cindytong.me/wp-content/uploads/2016/05/Circular-headshot-250.png'}} />
            <ListItem button
                      onPress={() => console.log('lol pls')}>
              <Text> Profile </Text>
            </ListItem>
            <ListItem button
                      onPress={() => console.log('lol pls')}>
              <Text> History </Text>
            </ListItem>
            <ListItem button
                      onPress={() => console.log('lol pls')}>
              <Text> Notifications </Text>
            </ListItem>
            <ListItem button
                      onPress={() => console.log('lol pls')}>
              <Text> Upload </Text>
            </ListItem>
          </List>
        </Content>
        <Footer>
          <List>
            <ListItem button
                      onPress={() => console.log('lol pls')}>
              <Text>My Settings </Text>
            </ListItem>
          </List>
        </Footer>
      </Container>
    );
  }
}

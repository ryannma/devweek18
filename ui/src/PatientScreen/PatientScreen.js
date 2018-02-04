import React, {Component} from 'react';
import { StatusBar } from 'react-native';
import { Container, Header, Link, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from 'native-base';

export default class PatientScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      results: [],
    }
  }

  componentDidMount() {
    this.fetchJobs();
  }

  fetchJobs() {
    console.log('fetching jobs');
    fetch('http://54.193.111.5/jobs', {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('here we go');
      for (var i=0; i<responseJson.length; i++) {
        if (responseJson[i].result !== null) {
          this.state.results.push(
            <Button title="Click me" 
                    key={i}
                    onPress={ ()=>{ Linking.openURL('https://google.com')}}/>
          );
        }
      }
      this.state.isLoading=false;
      console.log(this.state.results);
    })
    .catch((error) => {
      console.error(error);
    });;
  }

  render() {
    this.fetchJobs();
    if (!this.state.isLoading) {
      var results = this.state.results;
      return (
        <Container>
          <Header>
            <Left>
              <Button transparent>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body>
              <Title>MedSync</Title>
            </Body>
          </Header>
          <Content padder>
            <Card>
              <CardItem>
                <Body>
                  <Text>Discussions</Text>
                </Body>
              </CardItem>
            </Card>
            <Card>
            {results}
            </Card>
          </Content>
        </Container>
      );
    } else {
      return (<Container></Container>);
    }
  }
}

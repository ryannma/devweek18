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
      let resultArray = [];
      console.log(JSON.stringify(responseJson, null, 2));
      responseJson.forEach(row => {
        if (row.result) {
          resultArray.push({id: row.id, jobID: row.jobID, tdoID: row.tdoID, link: row.result});
        }
      });
      this.setState({
        results: resultArray,
        isLoading: false
      });
      // for (var i=0; i<responseJson.length; i++) {
      //   if (responseJson[i].result !== null) {
      //     this.state.results.push(
      //       <Button title="Click me" 
      //               key={i}
      //               onPress={ ()=>{ Linking.openURL('https://google.com')}}/>
      //     );
      //   }
      // }
      // this.state.isLoading=false;
    })
    .catch((error) => {
      console.error(error);
    });;
  }

  selectLink(e) {
    const val = e._targetInst.memoizedProps.value;
    console.log(val);
  }

  render() {
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
            {this.state.results.map((result, index) => {
              return (
                <CardItem key={index}>
                  <Button transparent
                          info
                          onPress={this.selectLink.bind(this)}
                          value={result.link}>
                    <Text>{result.link.substring(0, 35)+'...'}</Text>
                  </Button>
                  <Right>
                      <Icon name='arrow-forward'/>
                    </Right>
                </CardItem>
                );
            })}
            </Card>
          </Content>
        </Container>
      );
    } else {
      return (<Container></Container>);
    }
  }
}

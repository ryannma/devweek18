import React, {Component} from 'react';
import { StatusBar, View, TouchableOpacity } from 'react-native';
import { Container, Header, Link, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from 'native-base';
import Modal from "react-native-modal";
const DomParser = require('react-native-html-parser').DOMParser;

export default class PatientScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      results: [],
      isVisible: false,
      modalContent: []
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
      let pendingCount = 0;
      let runningCount = 0;
      responseJson.forEach(row => {
        if (row.result) {
          resultArray.push({id: row.id, jobID: row.jobID, tdoID: row.tdoID, link: row.result});
        }
        else if (row.status === 'pending') {
          pendingCount += 1;
        }
        else if (row.status === 'running') {
          runningCount += 1;
        }
      });
      if (runningCount > 0) {
        resultArray.push({link: runningCount + ' jobs are currently running'});
      }
      if (pendingCount > 0) {
        resultArray.push({link: pendingCount + ' jobs are currently pending'});
      }
      this.setState({
        results: resultArray,
        isLoading: false
      });
    })
    .catch((error) => {
      console.error(error);
    });;
  }

  selectLink(e) {
    const val = e._targetInst.memoizedProps.value;
    const endIndex = val.indexOf('.ttml');

    fetch(val.substring(0, endIndex+5))
      .then(res => {
        const doc = new DomParser().parseFromString(res._bodyText, 'text/html');
        const lines = doc.getElementsByTagName('p');
        let text = [];
        for (let i = 0; i < lines.length; i++) {
          text.push(lines[i].childNodes[0].data)
        }
        this.setState({
          isVisible: true,
          modalContent: text
        });
      });
  }

  _toggleModal() {
    this.setState({ isVisible: !this.state.isVisible });
  }

  refresh(e) {
    this.fetchJobs();
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
            <View style={{flex: 1}}>
              <Modal isVisible={this.state.isVisible}
                     onBackdropPress={()=>this.setState({isVisible: false})}>
                <Card>
                  {this.state.modalContent.map((text, index) => {
                    return (
                      <CardItem key={index}>
                        <Text>- {text.substring(0, 200)}</Text>
                      </CardItem>
                    )
                  })}
                </Card>
              </Modal>
            </View>
            <Card>
                <CardItem>
                  <Body>
                    <Text>Discussions</Text>
                  </Body>
                  <Right>
                    <Button transparent
                            onPress={this.refresh.bind(this)}
                            style={{height:15}}>
                      <Icon name='refresh'/>
                    </Button>
                  </Right>
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

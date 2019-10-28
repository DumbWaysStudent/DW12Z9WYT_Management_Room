import React, {Component} from 'react';
import {StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {
  Container,
  Content,
  View,
  Text,
  Item,
  Input,
  Button,
  Header,
  Row,
  Footer,
  FooterTab,
  Icon,
  Body,
  Fab,
} from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default class Checkin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      token: '',
      id: null,
    };
  }

  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    await this.getToken();
    await this.getId();
    this.showRooms();
  }

  async getToken() {
    await AsyncStorage.getItem('token').then(key =>
      this.setState({
        token: key,
      }),
    );
    console.log(this.state.token);
  }

  async getId() {
    await AsyncStorage.getItem('id').then(key =>
      this.setState({
        id: JSON.parse(key),
      }),
    );
    console.log(this.state.id);
  }

  showRooms = () => {
    axios({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      url: `http://192.168.1.34:2019/api/v2/rooms`,
    })
      .then(res => {
        const data = res.data;
        this.setState({data});
        console.log(this.state.data);
      })
      .catch(error => {
        console.log('Api call error');
      });
  };

  render() {
    return (
      <Container>
        <Content>
          <View style={styles.container}>
            <View>
              <Text style={styles.headerText}>Check In</Text>
            </View>
          </View>
        </Content>

        <Content>
          <View>
            <ScrollView horizontal={true}>
              {this.state.data.map(item => (
                <View>
                  <View style={styles.topTouch}>
                    <TouchableOpacity
                      style={styles.touch}
                      onPress={() =>
                        this.props.navigation.navigate('RoomEdit', {
                          roomId: item.id,
                          roomName: item.room_name,
                        })
                      }>
                      <Text>{item.room_name}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </Content>
        <View>
          <Fab
            active={false}
            onPress={() => this.props.navigation.navigate('RoomAdd')}
            style={{backgroundColor: 'green', marginLeft: 100}}
            position="bottomRight">
            <Icon type="FontAwesome" name="plus" />
          </Fab>
        </View>

        <Footer>
          <FooterTab style={{backgroundColor: 'white', borderTopWidth: 1}}>
            <Button onPress={() => this.props.navigation.navigate('checkin')}>
              <Icon name="checkmark-circle-outline" style={{color: 'green'}} />
              <Text style={{color: 'green', fontWeight: 'bold'}}>Check In</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('Room')}>
              <Icon name="ios-bed" style={{color: 'black'}} />
              <Text style={{color: 'black', fontWeight: 'bold'}}>Room</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('Customer')}>
              <Icon name="star" style={{color: 'black'}} />
              <Text style={{color: 'black'}}>Customer</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('setting')}>
              <Icon name="person" style={{color: 'black'}} />
              <Text style={{color: 'black'}}>Settings</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = {
  container: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  topTouch: {
    borderWidth: 2,
    padding: 25,
    margin: 5,
    backgroundColor: 'green',
  },
};

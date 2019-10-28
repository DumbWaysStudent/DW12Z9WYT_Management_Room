import React, {Component} from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
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

export default class RoomEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room_name: '',
      token: '',
      id: null,
      roomId: this.props.navigation.getParam('roomId'),
      roomName: this.props.navigation.getParam('roomName'),
    };
  }
  async componentDidMount() {
    await this.getToken();
    await this.getId();
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
  }

  editRoom = () => {
    axios({
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      url: `http:192.168.1.34:2019/api/v2/room/${this.state.roomId}`,
      data: {
        room_name: this.state.room_name,
      },
    }).then(response => {
      console.log('edit succes', response);
      alert('success');
      this.props.navigation.navigate('Room');
    });
  };

  render() {
    return (
      <Container>
        <Content>
          <View>
            <Text>Edit Room</Text>
          </View>
          <View>
            <Text>Room Name</Text>
            <Input
              placeholder={'Input name here'}
              onChangeText={room_name => this.setState({room_name})}
            />
            <TouchableOpacity
              style={{borderWidth: 2}}
              onPress={() => this.editRoom()}>
              <Text>click to change</Text>
            </TouchableOpacity>
          </View>
          <View></View>
        </Content>
      </Container>
    );
  }
}

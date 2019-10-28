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

export default class RoomAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room_name: '',
      token: '',
      id: null,
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

  createRoom = () => {
    axios({
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      url: `http:192.168.1.34:2019/api/v2/room`,
      data: {
        room_name: this.state.room_name,
      },
    }).then(response => {
      console.log('upload succes', response);
      alert('success');
      this.props.navigation.navigate('Room');
    });
  };

  render() {
    return (
      <Container>
        <Content>
          <View>
            <Text>Add Room</Text>
          </View>
          <View>
            <Text>Room Name</Text>
            <Input
              placeholder={'Input name here'}
              onChangeText={room_name => this.setState({room_name})}
            />
            <TouchableOpacity
              style={{borderWidth: 2}}
              onPress={() => this.createRoom()}>
              <Text>click to add</Text>
            </TouchableOpacity>
          </View>
          <View></View>
        </Content>
      </Container>
    );
  }
}

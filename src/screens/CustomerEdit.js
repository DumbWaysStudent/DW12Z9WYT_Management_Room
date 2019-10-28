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

export default class CustomerEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identity_number: '',
      phone: '',
      name: '',
      token: '',
      id: null,
      guestId: this.props.navigation.getParam('guestId'),
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

  editGuest = () => {
    axios({
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      url: `http:192.168.1.34:2019/api/v2/customer/${this.state.guestId}`,
      data: {
        identity_number: this.state.identity_number,
        name: this.state.name,
        phone: this.state.phone,
      },
    }).then(response => {
      console.log('edit succes', response);
      alert('edit success');
      this.props.navigation.navigate('Customer');
    });
  };

  render() {
    return (
      <Container>
        <Content>
          <View>
            <Text>Edit Customer</Text>
          </View>
          <View>
            <Text>Identity Number</Text>
            <Input
              placeholder={'Input name here'}
              onChangeText={identity_number => this.setState({identity_number})}
            />
            <Text>Name</Text>
            <Input
              placeholder={'Input name here'}
              onChangeText={name => this.setState({name})}
            />
            <Text>Phone Number</Text>
            <Input
              placeholder={'Input name here'}
              onChangeText={phone => this.setState({phone})}
            />
            <TouchableOpacity
              style={{borderWidth: 2}}
              onPress={() => this.editGuest()}>
              <Text>click to edit</Text>
            </TouchableOpacity>
          </View>
          <View></View>
        </Content>
      </Container>
    );
  }
}

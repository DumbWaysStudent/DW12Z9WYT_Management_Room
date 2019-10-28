import React, {Component} from 'react';
import {Text, Form, Item, Input, Button, Icon} from 'native-base';
import {View, TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default class Register extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      icon: 'eye-off',
      //isDisabled: true,
      status: true,
      email: '',
      password: null,
      token: '',
      id: null,
      name: '',
    };
  }

  changeIcon = () => {
    this.setState(prevState => ({
      icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
      status: !prevState.status,
    }));
  };

  userRegister = () => {
    axios({
      method: 'POST',
      url: `http://192.168.1.34:2019/api/v2/register`,
      data: {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
      },
    }).then(res => {
      this.setState({
        token: res.data.token,
        id: res.data.id,
      });

      AsyncStorage.setItem('token', this.state.token);
      AsyncStorage.setItem('id', JSON.stringify(this.state.id));
      this.props.navigation.navigate('Room');
    });
  };

  userValidation = email => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) == true && this.state.password != null) {
      this.setState({
        email,
        isDisabled: false,
      });
    } else {
      this.setState({
        email,
        isDisabled: true,
      });
    }
    this.setState({
      email,
    });
  };

  passValidation = password => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (password != null && reg.test(this.state.email) == true) {
      this.setState({
        password,
        isDisabled: false,
      });
    } else {
      this.setState({
        password,
        isDisabled: true,
      });
    }
    this.setState({
      password,
    });
  };

  render() {
    return (
      <View style={{justifyContent: 'center', flex: 1}}>
        <Text style={{alignSelf: 'center', fontSize: 50, color: 'green'}}>
          REGISTER
        </Text>
        <Text style={{alignSelf: 'center'}}>
          Sign up now to gain more access
        </Text>
        <View style={{margin: 8}}>
          <View>
            <Form style={{justifyContent: 'center'}}>
              <Item>
                <Text>Name :</Text>
                <Input
                  onChangeText={name => {
                    this.setState({name});
                  }}
                />
              </Item>
              <Item>
                <Text>E-mail :</Text>
                <Input
                  onChangeText={email => {
                    this.setState({email});
                  }}
                />
              </Item>
              <Item>
                <Text>Password :</Text>
                <Input
                  secureTextEntry={this.state.status}
                  onChangeText={password => {
                    this.setState({password});
                  }}
                />
                <Icon
                  name={this.state.icon}
                  onPress={() => this.changeIcon()}
                />
              </Item>
            </Form>
          </View>

          <TouchableOpacity
            //onPress={() => this.props.navigation.navigate('ForYou')}
            onPress={() => this.userRegister()}
            primary
            disabled={this.state.isDisabled}>
            <View
              style={{
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 13,
                marginHorizontal: 65,
                backgroundColor: 'green',
                padding: 10,
                marginTop: 32,
              }}>
              <Text style={{color: 'white'}}>SIGN UP</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

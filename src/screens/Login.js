import React, {Component} from 'react';
import {Text, Form, Item, Input, Button, Icon} from 'native-base';
import {View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      icon: 'eye-off',
      status: true,
      buttonDisabled: true,
      email: '',
      allow: 'true',
      password: '',
      token: '',
      id: '',
    };
  }

  login = () => {
    axios({
      method: 'POST',
      url: `http://192.168.1.34:2019/api/v2/login`,
      data: {
        email: this.state.email,
        password: this.state.password,
        id: this.state.id,
      },
    })
      .then(res => {
        console.log(res.data);

        this.setState({
          token:
            res.data.code == 'ERR_WRONG_EMAIL_PASS' ? null : res.data.token,
          id: res.data.code == 'ERR_WRONG_EMAIL_PASS' ? null : res.data.id,
        });

        if (this.state.token) {
          AsyncStorage.setItem('token', this.state.token);
          AsyncStorage.setItem('id', JSON.stringify(this.state.id));
          this.props.navigation.navigate('Room');
          console.log('masuk');
          console.log(this.state.id);
          console.log(this.state.token);
        } else {
          alert('Wrong Email or Password!');
          console.log('gak masuk');
        }
      })
      .catch(err => {
        console.log('axios error:', err);
      });
  };

  changeIcon = () => {
    this.setState(prevState => ({
      icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
      status: !prevState.status,
    }));
  };

  emailValidation = email => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (reg.test(email) == true && this.state.password != null) {
      this.setState({
        email,
        buttonDisabled: false,
      });
    } else {
      this.setState({
        email,
        buttonDisabled: true,
      });
    }
    this.setState({
      email,
    });
  };

  passValidation = password => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if ((password != null) == true && reg.test(this.state.email) == true) {
      this.setState({
        password,
        buttonDisabled: false,
      });
    } else {
      this.setState({
        password,
        buttonDisabled: true,
      });
    }
    this.setState({
      password,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Log In</Text>
          <Text style={styles.titleDesc}>Login first with your account</Text>
        </View>
        <Form>
          <Item>
            <Input
              placeholder="Email"
              onChangeText={email => this.emailValidation(email)}
            />
          </Item>
          <Item style={styles.pastContainer}>
            <Input
              secureTextEntry={this.state.status}
              placeholder="Password"
              onChangeText={password => this.passValidation(password)}
            />
            <Icon name={this.state.icon} onPress={() => this.changeIcon()} />
          </Item>
        </Form>
        <View style={{margin: 13}}>
          <Button
            success
            block
            disabled={this.state.buttonDisabled}
            style={{
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 35,
            }}
            // onPress={() => this.props.navigation.navigate('ForYou')}
            // onPress={() => this.login()}
            onPress={() => this.login()}>
            <Text>Login</Text>
          </Button>
          <View style={{alignItems: 'center', marginTop: 19}}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={{color: 'blue', fontWeight: 'bold'}}>
                Sign up here!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    color: 'green',
    margin: 7,
  },
  titleDesc: {
    marginTop: 20,
  },
  containerTitle: {
    alignItems: 'center',
  },
  pastContainer: {
    flexDirection: 'row',
    borderWidth: 5,
  },
};

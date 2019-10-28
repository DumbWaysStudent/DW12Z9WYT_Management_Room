import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
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
} from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import * as actionUsers from '../Redux/_actions/user';

class setting extends Component {
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
    this.showUser();
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

  // showUser = () => {
  //   axios({
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/json',
  //       Authorization: `Bearer ${this.state.token}`,
  //     },
  //     url: `http://192.168.1.34:2019/api/v2/user/${this.state.id}`,
  //   })
  //     .then(res => {
  //       const data = res.data;
  //       this.setState({data});
  //       console.log(this.state.data);
  //     })
  //     .catch(error => {
  //       console.log('Api call error');
  //     });
  // };

  showUser = () => {
    this.props.getUser((id = this.state.id), (token = this.state.token));
    console.log(this.props.admin.admin);
  };

  async logout() {
    await AsyncStorage.removeItem('token');
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <Container>
        <Header>
          <View style={styles.container}>
            <View>
              <Text style={styles.headerText}>Settings</Text>
            </View>
          </View>
        </Header>
        <Body style={styles.bodyContent}>
          <View style={styles.content}>
            <Text>Halo, {this.props.admin.admin.name}</Text>
            <Text>your email : {this.props.admin.admin.email}</Text>
            <Button onPress={() => this.logout()} style={styles.content}>
              <Text>Log Out</Text>
            </Button>
          </View>
        </Body>
        <Footer>
          <FooterTab style={{backgroundColor: 'white', borderTopWidth: 1}}>
            <Button onPress={() => this.props.navigation.navigate('checkin')}>
              <Icon name="checkmark-circle-outline" style={{color: 'black'}} />
              <Text style={{color: 'black', fontWeight: 'bold'}}>Check In</Text>
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
              <Icon name="person" style={{color: 'green'}} />
              <Text style={{color: 'green'}}>Settings</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    admin: state.admin,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: (id, token) => dispatch(actionUsers.getUser(id, token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(setting);

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'blue',
    padding: 20,
  },
  bodyContent: {
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
};

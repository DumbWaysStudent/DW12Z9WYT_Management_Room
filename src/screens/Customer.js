import React, {Component} from 'react';
import {
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
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
import {connect} from 'react-redux';
import * as actionGuest from '../Redux/_actions/customer';

class Customer extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      token: '',
      id: null,
      modalVisible: false,
    };
  }

  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    await this.getToken();
    await this.getId();
    this.showGuest();
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.showGuest();
    });
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
      url: `http://192.168.1.34:2019/api/v2/customers`,
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

  showGuest = () => {
    this.props.getGuest((id = this.state.id), (token = this.state.token));
    console.log(this.props.guest.guest);
  };

  render() {
    return (
      <Container>
        <Header>
          <View style={styles.container}>
            <View>
              <Text style={styles.headerText}>Customer</Text>
            </View>
          </View>
        </Header>

        <Content>
          <View>
            {this.props.guest.guest.map(item => (
              <View>
                <View style={styles.topTouch}>
                  <TouchableOpacity
                    style={styles.touch}
                    onPress={() =>
                      this.props.navigation.navigate('CustomerEdit', {
                        guestId: item.id,
                      })
                    }>
                    <View>
                      <Image
                        style={{width: 95, height: 95}}
                        source={{uri: item.image}}
                      />
                    </View>
                    <Text>{item.name}</Text>
                    <Text>{item.identity_number}</Text>
                    <Text>{item.phone}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </Content>
        <View>
          <Fab
            active={false}
            style={{backgroundColor: 'green', marginLeft: 100}}
            onPress={() => this.props.navigation.navigate('CustomerAdd')}
            position="bottomRight">
            <Icon type="FontAwesome" name="plus" />
          </Fab>
        </View>

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
            <Button onPress={() => this.props.navigation.navigate('customer')}>
              <Icon name="star" style={{color: 'green'}} />
              <Text style={{color: 'green'}}>Customer</Text>
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

const mapStateToProps = state => {
  return {
    guest: state.guest,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGuest: (id, token) => dispatch(actionGuest.getGuest(id, token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Customer);

const styles = {
  container: {
    alignItems: 'center',
    //backgroundColor: 'blue',
    padding: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  topTouch: {
    borderWidth: 2,
    padding: 15,
    margin: 5,
  },
};

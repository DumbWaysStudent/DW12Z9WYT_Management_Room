import React, {Component} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, FlatList} from 'react-native';
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
  ListItem,
} from 'native-base';
import Modal from 'react-native-modalbox';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import * as actionRooms from '../Redux/_actions/rooms';

class Room extends Component {
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
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.showRooms();
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

  // showRooms = () => {
  //   axios({
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/json',
  //       Authorization: `Bearer ${this.state.token}`,
  //     },
  //     url: `http://192.168.1.34:2019/api/v2/rooms`,
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

  showRooms = () => {
    this.props.getRoom((id = this.state.id), (token = this.state.token));
    console.log(this.props.room.rooms);
  };

  editRoom = (id, name) => {
    axios({
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      url: `http:192.168.1.34:2019/api/v2/room/${id}`,
      data: {
        room_name: this.state.room_name,
      },
    }).then(response => {
      console.log('edit succes', response);
      //alert('success');
      this.props.navigation.navigate('Room');
    });
  };

  allPage(item) {
    return (
      <ListItem>
        <Button
          //success
          style={{padding: 13, backgroundColor: '#808080', borderWidth: 2}}
          // onPress={() =>
          //   this.props.navigation.navigate('RoomEdit', {
          //     roomId: item.id,
          //     roomName: item.room_name,
          //   })
          //}
          onPress={() => this.refs.modal4.open()}>
          <Text>{item.room_name}</Text>
        </Button>
      </ListItem>
    );
  }

  render() {
    return (
      <Container>
        <Header>
          <View style={styles.container}>
            <View>
              <Text style={styles.headerText}>Room</Text>
            </View>
          </View>
        </Header>

        <Content>
          <View>
            <FlatList
              data={this.props.room.rooms}
              renderItem={({item}) => this.allPage(item)}
              keyExtractor={item => item.id}
              numColumns={3}></FlatList>
          </View>
        </Content>

        <View>
          <Fab
            active={false}
            onPress={() => this.refs.modal3.open()}
            //onPress={() => this.props.navigation.navigate('RoomAdd')}
            style={{backgroundColor: 'green', marginLeft: 100}}
            position="bottomRight">
            <Icon type="FontAwesome" name="plus" />
          </Fab>
        </View>
        <Modal
          style={[styles.modal, styles.modal3]}
          position={'center'}
          ref={'modal3'}
          isDisabled={this.state.isDisabled}>
          <Text style={styles.text}>ADD NEW ROOM</Text>
          <TextInput placeholder="Enter Room Name" style={styles.modalInput} />
          <Button
            onPress={() => this.refs.modal3.close()}
            style={styles.modalBoxBtn}>
            <Text>Cancel</Text>
          </Button>
        </Modal>
        <Modal
          style={[styles.modal, styles.modal3]}
          position={'center'}
          ref={'modal4'}
          isDisabled={this.state.isDisabled}>
          <Text style={styles.text}>EDIT ROOM</Text>
          <TextInput
            placeholder="Enter New Room Name"
            style={styles.modalInput}
          />
          <Button
            onPress={() => this.refs.modal3.close()}
            style={styles.modalBoxBtn}>
            <Text>Cancel</Text>
          </Button>
        </Modal>
        <Footer>
          <FooterTab style={{backgroundColor: 'white', borderTopWidth: 1}}>
            <Button onPress={() => this.props.navigation.navigate('checkin')}>
              <Icon name="checkmark-circle-outline" style={{color: 'black'}} />
              <Text style={{color: 'black', fontWeight: 'bold'}}>Check In</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('Room')}>
              <Icon name="ios-bed" style={{color: 'green'}} />
              <Text style={{color: 'green', fontWeight: 'bold'}}>Room</Text>
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

const mapStateToProps = state => {
  return {
    room: state.rooms,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRoom: (id, token) => dispatch(actionRooms.getRoom(id, token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Room);

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
    padding: 25,
    margin: 5,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal3: {
    height: 300,
    width: 300,
  },
  text: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
  },
  modalInput: {
    height: 50,
    width: 200,
    backgroundColor: '#DDDDDD',
    marginVertical: 15,
  },
  button: {
    backgroundColor: 'green',
    width: 300,
    marginTop: 16,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#d0d0d0',
  },
};

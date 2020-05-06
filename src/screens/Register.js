/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Image,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {createUserOnFirebaseAsync} from '../services/FirebaseApi';
import {validateEmail} from '../components/Components';

const img = require('../assets/TodoList.png');

export default class Register extends Component {
  _isMounted = false;
  static navigationOptions = {
    title: 'Registrar',
  };

  state = {
    email: '',
    password: '',
    modalVisible: false,
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async _createUserAsync() {
    if (this._isMounted) {
      this.setState({modalVisible: true});
    }
    try {
      if (
        validateEmail(this.state.email) &&
        this.state.password.trim() !== '' &&
        this.state.password.length > 0
      ) {
        const {user} = await createUserOnFirebaseAsync(
          this.state.email,
          this.state.password,
        );
        if (this._isMounted) {
          this.setState({modalVisible: false});
        }
        Alert.alert(
          'Usuário criado',
          `Usuário ${user.email} foi criado com sucesso!`,
          [
            {
              text: 'Ok',
              onPress: () => {
                this.props.navigation.goBack();
              },
            },
          ],
        );
      } else {
        this.setState({modalVisible: false});
        Alert.alert(
          'Atenção!',
          'Não foi possiível criar seu usuário no momento, o email precisa ter um formato válido, por exemplo: teste@email.com, e a senha precida ter no mínimo 6 caracteres!',
        );
      }
    } catch (error) {
      if (this._isMounted) {
        this.setState({modalVisible: false});
      }
      Alert.alert(
        'Atenção!',
        'Não foi possível criar seu usuário no momento, por favor tente novamente mais tarde!',
      );
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.topView}>
          <Image style={styles.img} source={img} />
          <Text style={styles.title}>Registrando novo usuário</Text>
        </View>
        <View>
          <Modal
            style={{marginTop: 22}}
            animationType="none"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Por favor, espere um instante...');
            }}>
            <View style={styles.containerModal01}>
              <View style={styles.containerModal02}>
                <ActivityIndicator animating size="large" />
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.bottomView}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType={'email-address'}
            autoCapitalize="none"
            onChangeText={(email) => this.setState({email})}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
          />
          <Button
            title="Registrar usuário"
            onPress={() => {
              this._createUserAsync();
            }}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  topView: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
  },
  img: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    width: 200,
  },
  bottomView: {
    flex: 1,
    flexDirection: 'column',
    paddingRight: 20,
    paddingLeft: 20,
  },
  input: {
    marginBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  containerModal01: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  containerModal02: {
    width: 300,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    margin: 40,
  },
});

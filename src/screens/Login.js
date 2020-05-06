/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Image,
  TextInput,
  Button,
  Text,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {signInOnFirebaseAsync} from '../services/FirebaseApi';
import {validateEmail} from '../components/Components';

const img = require('../assets/TodoList.png');

const Login = (props) => {
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const signInAsync = async () => {
    setModalVisible(true);
    try {
      if (
        validateEmail(email) &&
        password.trim() !== '' &&
        password.length > 0
      ) {
        const {user} = await signInOnFirebaseAsync(email, password);
        setModalVisible(false);
        Alert.alert(
          'Usuário autenticado',
          `Usuário ${user.email} foi autenticado com sucesso!`,
        );
        props.navigation.navigate('TaskList');
      } else {
        setModalVisible(false);
        Alert.alert('Atenção!', 'Email ou Password inválido!');
      }
    } catch (error) {
      setModalVisible(false);
      Alert.alert(
        'Atenção!',
        'Não foi possível realizar o login no momento, por favor tente novamnte mais tarde!',
      );
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.topView}>
          <Image style={styles.img} source={img} />
        </View>
        <View>
          <Modal
            style={{marginTop: 22}}
            animationType="none"
            transparent={true}
            visible={modalVisible}
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
            value={props.email}
            keyboardType={'email-address'}
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
          <Button title="Entrar" onPress={() => signInAsync()} />
          <View style={styles.textConteiner}>
            <Text>Não é um membro? vamos se </Text>
            <Text
              style={styles.textRegister}
              onPress={() => {
                props.navigation.navigate('Registrar');
              }}>
              Registrar
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  topView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  img: {
    width: 100,
    height: 100,
  },
  bottomView: {
    flexDirection: 'column',
    paddingRight: 20,
    paddingLeft: 20,
  },
  input: {
    marginBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  textConteiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  textRegister: {
    fontWeight: 'bold',
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

export default Login;

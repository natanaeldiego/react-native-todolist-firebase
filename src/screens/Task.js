import React, {Component} from 'react';
import {
  View,
  TextInput,
  Switch,
  Text,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import {writeTaskOnFirebaseAsync} from '../services/FirebaseApi';

export default class Task extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      resume: '',
      priority: true,
      isDone: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    try {
      if (
        this.props.route.params &&
        this.props.route.params.task !== undefined &&
        this.props.route.params.task !== null
      ) {
        const {task} = this.props.route.params;
        if (this._isMounted) {
          this.setState(task);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async _saveTaskAsync() {
    try {
      await writeTaskOnFirebaseAsync(this.state);
      this.props.navigation.goBack();
    } catch (error) {
      Alert.alert('Erro Saving', error.message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={this.state.title}
          onChangeText={(value) => this.setState({title: value})}
        />
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Resumo"
          multiline={true}
          numberOfLines={4}
          value={this.state.resume}
          onChangeText={(value) => this.setState({resume: value})}
        />
        <View style={styles.switchContainer}>
          <Switch
            value={this.state.priority}
            onValueChange={(value) => this.setState({priority: value})}
          />
          <Text style={styles.switchText}>Prioridade máxima</Text>
        </View>
        <View style={styles.switchContainer}>
          <Switch
            value={this.state.isDone}
            onValueChange={(value) => this.setState({isDone: value})}
          />
          <Text style={styles.switchText}>Está feito?</Text>
        </View>
        <Button
          style={styles.button}
          title="Salvar"
          onPress={() => this._saveTaskAsync()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },
  input: {
    marginBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  multilineInput: {
    height: 100,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
  },
  switchText: {
    marginLeft: 10,
    color: 'black',
    fontSize: 18,
  },
});

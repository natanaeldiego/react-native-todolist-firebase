import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {TaskListView} from '../components/Components';
import {readTasksFromFirebaseAsync} from '../services/FirebaseApi';

export default class DoneTasks extends Component {
  _isMounted = false;
  state = {
    tasks: [],
  };

  componentDidMount() {
    this._isMounted = true;
    readTasksFromFirebaseAsync(this._fetchTasks.bind(this));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _fetchTasks(tasks) {
    if (tasks !== null && tasks !== undefined && tasks.length > 0) {
      const tasksToDo = tasks.filter((t) => t.isDone);
      if (tasksToDo && tasksToDo !== null && tasksToDo !== undefined) {
        if (this._isMounted) {
          this.setState({tasks: [...tasksToDo]});
        }
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.tasks !== null &&
        this.state.tasks !== undefined &&
        this.state.tasks.length > 0 ? (
          <TaskListView
            tasks={this.state.tasks}
            navigation={this.props.navigation}
          />
        ) : (
          <Text style={styles.nenhumaTarefa}>Nenhuma tarefa</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  },
  icon: {
    width: 26,
    height: 26,
  },
  img: {
    width: 50,
    height: 50,
  },
  nenhumaTarefa: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
    fontSize: 20,
    marginTop: 50,
  },
});

import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  App,
  Login,
  Register,
  ToDoTasks,
  DoneTasks,
  Task,
} from '../screens/Screens';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export const TaskTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        iconStyle: {width: 20, height: 20},
      }}>
      <Tab.Screen name="A fazer" component={ToDoTasks} />
      <Tab.Screen name="Feito" component={DoneTasks} />
    </Tab.Navigator>
  );
};

export const StackScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Login}
          options={{title: 'My home'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="screen">
        <Stack.Screen name="App" component={App} options={{title: 'Login'}} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login'}}
        />
        <Stack.Screen name="Registrar" component={Register} />
        <Stack.Screen
          name="TaskList"
          options={{
            headerLeft: null,
            headerTitle: 'Lista de tarefas',
          }}
          component={TaskTab}
        />
        <Stack.Screen
          name="Task"
          options={{title: 'Tarefa'}}
          component={Task}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Routes;

import React from 'react';
import { View, StyleSheet, Platform, StatusBar, Text, TouchableOpacity } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Constants } from 'expo';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import AddEntry from './components/AddEntry';
import reducer from './reducers';
import History from './components/History';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { purple, white } from './utils/colors';
import EntryDetail from './components/EntryDetail';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home View</Text>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('DrawerOpen')}>
        <Text style={styles.btnText}>To Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

function Dashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dashboard</Text>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('DrawerOpen')}>
        <Text style={styles.btnText}>Open Drawer</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
    },
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      title: 'Dashboard',
      headerTintColor: 'red',
      headerStyle: {
        backgroundColor: 'green',
      },
    },
  },
});

const Tabs = TabNavigator(
  {
    History: {
      screen: History,
      navigationOptions: {
        tabBarLabel: 'History',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
        ),
      },
    },
    AddEntry: {
      screen: AddEntry,
      navigationOptions: {
        tabBarLabel: 'Add Entry',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        ),
      },
    },
  },
  {
    navigationOptions: { header: null },
    tabBarOptions: { activeTintColor: Platform.OS === 'ios' ? purple : white },
    style: { height: 56, backgroundColor: Platform.OS === 'ios' ? white : purple },
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
  },
);

const MainNavigator = StackNavigator({
  Home: { screen: Tabs },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    },
  },
});

const Drawer = DrawerNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: () => <FontAwesome name="home" size={20} color="red" />,
    },
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: () => <FontAwesome name="dashboard" size={20} color="red" />,
    },
  },
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          {/* <Stack /> */}
          {/* <UdaciStatusBar backgroundColor={purple} barStyle="light-content" /> */}
          {/* <Tabs /> */}
          {/* <MainNavigator /> */}
          <Drawer />
        </View>
      </Provider>
    );
  }
}

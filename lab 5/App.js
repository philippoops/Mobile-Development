import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat';

import Login from './screen/Login';
import Registration from './screen/Registration';
import Dashboard from './screen/Dashboard';
import LoginScreen from './screen/Verification';
import Header from './components/Header';
import { GlobalStyles } from './UI/colors';
const Stack = createStackNavigator();

function App() {
  const [initilizing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state
  function onAuthoChanged(user) {
    setUser(user);
    if (initilizing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthoChanged);
    return subscriber;
  }, []);

  if (initilizing) return null;
  if (!user) {
    return (
      <Stack.Navigator>
        {/* // Login page */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: () => <Header name="Gepard Technology" />,
            headerStyle: {
              height: 100,
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 30,
              backgroundColor: GlobalStyles.colors.secondary,
              shadowColor: GlobalStyles.colors.black,
              elevation: 25,
            },
          }}
        />
        {/* // Registration Page */}
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{
            headerTitle: () => <Header name="Gepard" />,
            headerStyle: {
              height: 100,
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 30,
              backgroundColor: GlobalStyles.colors.secondary,
              shadowColor: GlobalStyles.colors.black,
              elevation: 25,
            },
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={Dashboard}
        options={{
          headerTitle: () => <Header name="Dashboard" />,
          headerStyle: {
            height: 100,
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
            backgroundColor: GlobalStyles.colors.secondary,
            shadowColor: GlobalStyles.colors.black,
            elevation: 25,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

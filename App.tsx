import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';
import Main from './components/Main';
import { View } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  const currentTheme = darkTheme;
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </PaperProvider>
  );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fad196',
  },
};

const darkTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DarkTheme.colors,
    primary: '#000',
    surface: '#121212'
  },
};
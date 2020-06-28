import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import Main from './components/Main';
import ThemeContext from './utils/themeContext';
import reducer from './utils/reducer';
import AsyncStorage from '@react-native-community/async-storage';

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    isDark: false
  });

  AsyncStorage.getItem("@theme").then((result) => {
    if (result == "dark" && !state.isDark) {
      dispatch({ type: "TOGGLE_DARK_MODE", value: true })
    }
  })

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      <PaperProvider theme={state.isDark ? darkTheme : lightTheme}>
        <StatusBar style={state.isDark ? "light" : "dark"} />
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fad196',
  },
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#202020',
    surface: '#202020',
    text: '#fff',
    onSurface: '#fff'
  },
};
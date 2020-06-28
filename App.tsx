import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import Main from './components/Main';
import ThemeContext from './utils/SettingsContext';
import AsyncStorage from '@react-native-community/async-storage';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';

export default function App() {
  const [state, dispatch] = React.useReducer((state: {
    isDark: boolean,
    keepAwake: boolean
  }, action) => {
    if(action.type == "TOGGLE_DARK_MODE"){
      return {
        isDark: action.value,
        keepAwake: state.keepAwake
      }
    } else if(action.type == "TOGGLE_KEEP_AWAKE"){
      if(action.value){
        activateKeepAwake();
      } else {
        deactivateKeepAwake();
      }
      
      return {
        isDark: state.isDark,
        keepAwake: action.value
      };
    }
  }, {
    isDark: false,
    keepAwake: false
  });

  AsyncStorage.getItem("@theme").then((result) => {
    if (result == "dark" && !state.isDark) {
      dispatch({ type: "TOGGLE_DARK_MODE", value: true })
    }
  });

  AsyncStorage.getItem("@keepAwake").then((result) => {
    if (result == "on" && !state.keepAwake) {
      dispatch({ type: "TOGGLE_KEEP_AWAKE", value: false })
    }
  });

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
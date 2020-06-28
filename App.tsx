import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import Main from './components/Main';
import ThemeContext from './utils/SettingsContext';
import AsyncStorage from '@react-native-community/async-storage';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import { AppLoading } from 'expo';

function reducer(state: {
	isDark: boolean,
	keepAwake: boolean
}, action) {
	if (action.type == "TOGGLE_DARK_MODE") {
		return {
			isDark: action.value,
			keepAwake: state.keepAwake
		}
	} else if (action.type == "TOGGLE_KEEP_AWAKE") {
		if (action.value) {
			activateKeepAwake();
		} else {
			deactivateKeepAwake();
		}

		return {
			isDark: state.isDark,
			keepAwake: action.value
		};
	}
}

export default function App() {
	const [state, dispatch] = React.useReducer(reducer, {
		isDark: false,
		keepAwake: false
	});

	const [isLoading, setIsLoading] = useState(true);

	async function loadSettings() {
		let theme = await AsyncStorage.getItem("@theme")
		if (theme == "dark" && !state.isDark) {
			dispatch({ type: "TOGGLE_DARK_MODE", value: true })
		}

		let keepAwake = await AsyncStorage.getItem("@keepAwake")
		if (keepAwake == "on" && !state.keepAwake) {
			dispatch({ type: "TOGGLE_KEEP_AWAKE", value: false })
		}
	}

	if (isLoading) {
		return (
			<AppLoading
				startAsync={loadSettings}
				onFinish={() => setIsLoading(false)}
				onError={console.warn}
			/>
		);
	}

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
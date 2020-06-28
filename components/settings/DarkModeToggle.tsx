import React, { useContext } from 'react';
import { View } from 'react-native';
import { Text, Switch } from 'react-native-paper';
import ThemeContext from '../../utils/SettingsContext';
import AsyncStorage from '@react-native-community/async-storage';

export default function DarkModeToggle() {
    const { dispatch, state } = useContext(ThemeContext);

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 12,
        }}>
            <Text>Dark theme</Text>
            <View>

                <Switch value={state.isDark} onValueChange={async (value) => {
                    await AsyncStorage.setItem("@theme", value ? "dark" : "light")
                    dispatch({ type: "TOGGLE_DARK_MODE", value });
                }} />
            </View>
        </View>
    );
}
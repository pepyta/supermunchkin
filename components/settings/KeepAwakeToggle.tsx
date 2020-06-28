import React, { useContext, useReducer } from 'react';
import { View } from 'react-native';
import { Text, Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import SettingsContext from '../../utils/SettingsContext';

export default function KeepAwakeToggle() {
    const { dispatch, state } = useContext(SettingsContext);

    return (

        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 12,
        }}>
            <Text>Keep screen awake</Text>
            <View>
                <Switch value={state.keepAwake} onValueChange={async (value) => {
                    await AsyncStorage.setItem("@keepawake", value ? "on" : "off");
                    dispatch({ type: "TOGGLE_KEEP_AWAKE", value });
                }} />
            </View>
        </View>
    );
}
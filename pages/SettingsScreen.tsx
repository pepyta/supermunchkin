import React, { useState, useContext } from 'react';
import { Card, Title, Paragraph, Switch, Text } from 'react-native-paper';
import Container from '../components/Container';
import { View } from 'react-native';
import ThemeContext from '../utils/themeContext';
import AsyncStorage from '@react-native-community/async-storage';

export default function SettingsScreen() {
    const { dispatch, state } = useContext(ThemeContext);

    return (
        <View style={{
            marginTop: 10
        }}>

            <Container>

                <Card>
                    <Card.Content>
                        <Title>Visual Prefences</Title>
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
                    </Card.Content>
                </Card>
            </Container>
        </View>
    );
}
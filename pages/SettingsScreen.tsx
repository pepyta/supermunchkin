import React, { useState, useContext } from 'react';
import { Card, Title, Paragraph, Switch, Text } from 'react-native-paper';
import Container from '../components/Container';
import { View } from 'react-native';
import ThemeContext from '../utils/SettingsContext';
import DarkModeToggle from '../components/settings/DarkModeToggle';
import KeepAwakeToggle from '../components/settings/KeepAwakeToggle';

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
                        <DarkModeToggle />
                        <KeepAwakeToggle />
                    </Card.Content>
                </Card>
            </Container>
        </View>
    );
}
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import HomeScreen from '../pages/HomeScreen';
import CreateProfile from '../pages/CreateProfileScreen';
import { DrawerActions } from '@react-navigation/native';
import ProfileScreen from '../pages/ProfileScreen';
import MonsterScreen from '../pages/MonsterScreen';
import FightScreen from '../pages/FightScreen';

const Stack = createStackNavigator();

export default function StackNavigator({ navigation }) {
    const theme = useTheme();

    return (
        <Stack.Navigator
            screenOptions={{
                header: ({ scene, previous, navigation }) => {
                    const { options } = scene.descriptor;
                    const title =
                        options.headerTitle !== undefined
                            ? options.headerTitle
                            : options.title !== undefined
                                ? options.title
                                : scene.route.name;
                    return (
                        <Appbar.Header
                            style={{
                                backgroundColor: theme.colors.primary
                            }}>
                            {previous ? (
                                <Appbar.BackAction
                                    onPress={navigation.goBack}
                                />
                            ) : (
                                    <Appbar.Action
                                        icon="menu"
                                        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
                                )}
                            <Appbar.Content
                                title={
                                    title
                                }
                                titleStyle={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                }}
                            />
                        </Appbar.Header>
                    );
                }
            }}
        >
            <Stack.Screen
                name="Profiles"
                component={HomeScreen} />
            <Stack.Screen
                name="CreateProfile"
                component={CreateProfile}
                options={{
                    title: "Create profile"
                }} />
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    title: "Your profile"
                }} />
            <Stack.Screen
                name="MonsterScreen"
                component={MonsterScreen}
                options={{
                    title: "You're the monster"
                }} />
            <Stack.Screen
                name="FightScreen"
                component={FightScreen}
                options={{
                    title: "You're in a fight"
                }} />
        </Stack.Navigator>
    );
}
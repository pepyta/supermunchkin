import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './Drawer';
import StackNavigator from './StackNavigator';

const Drawer = createDrawerNavigator();

export default function RootNavigator() {
    return (
        <Drawer.Navigator drawerContent={({ navigation }) => <DrawerContent navigation={navigation} />}>
            <Drawer.Screen name="Main" component={StackNavigator} />
        </Drawer.Navigator>
    );
};
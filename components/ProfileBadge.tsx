import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function ProfileBadge(props) {
    const theme = useTheme();
        return(
            
            <View style={{
                backgroundColor: theme.dark ? "#121212" : "#efefef",
                borderRadius: 5,
                paddingHorizontal: 7,
                paddingVertical: 3,
                marginRight: 10
            }}>
                <Text style={{
                    color: theme.dark ? "#fff" : "#000"
                }}>{props.children}</Text>
            </View>
        );
}
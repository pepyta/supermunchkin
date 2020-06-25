import React from 'react';
import { Card, Title, Paragraph, TouchableRipple, Theme, useTheme } from 'react-native-paper';
import { View } from 'react-native';

class ProfileCard extends React.Component<{
    id: number,
    name: string,
    level: number,
    gear: number,
    isMale: boolean,
    delete: (id: number) => void,
    navigation: any,
    theme: Theme
}> {
    render() {
        return (
            <Card style={{ borderRadius: 5, marginBottom: 12 }}>
                <TouchableRipple
                    onPress={() => {
                        this.props.navigation.navigate("ProfileScreen", this.props)
                    }}
                    onLongPress={() => {
                        this.props.delete(this.props.id);
                    }}
                    rippleColor="rgba(0, 0, 0, .32)">
                    <Card.Content style={{ padding: 20, borderRadius: 5 }}>
                        <View>
                            <Title>
                                {this.props.name}
                            </Title>
                            <Paragraph>
                                Level: {this.props.level} | Gear: {this.props.gear}
                            </Paragraph>
                        </View>
                    </Card.Content>
                </TouchableRipple >
            </Card>
        );
    }
}

export default function ProfileCardWithHooks({
    id,
    name,
    level,
    gear,
    isMale,
    deleteFunction,
    navigation
}){
    const theme = useTheme();
    return <ProfileCard id={id} name={name} level={level} gear={gear} isMale={isMale} delete={deleteFunction} navigation={navigation} theme={theme} />
}
import React from 'react';
import { Card, Title, Paragraph, TouchableRipple } from 'react-native-paper';
import { View } from 'react-native';

export default class ProfileCard extends React.Component<{
    id: number,
    name: string,
    level: number,
    gear: number,
    isMale: boolean,
    delete: (id: number) => void,
    navigation: any
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
                    <Card.Content style={{ padding: 20 }}>
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
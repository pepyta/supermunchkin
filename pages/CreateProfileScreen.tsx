import React from 'react';
import { Card, Title, TextInput, RadioButton, Text, Button, IconButton } from 'react-native-paper';
import { Row, Col } from 'react-native-easy-grid';
import { View } from 'react-native';
import { createProfile } from '../utils/storage';
import { NavigationHelpers } from '@react-navigation/native';
import { DrawerNavigationEventMap } from '@react-navigation/drawer/lib/typescript/src/types';

export default class CreateProfileScreen extends React.Component<{
	navigation: NavigationHelpers<Record<string, object | undefined>, DrawerNavigationEventMap>
}> {
    state = {
        name: "",
        isMale: true
    };

    async addProfile() {
        await createProfile(this.state.name.trim(), this.state.isMale);
    }

    render() {
        return (
            <Card>
                <Card.Content>
                  
                    <Title>
                        New adventurer
                    </Title>
                    <View style={{
                        flex: 200,
                        backgroundColor: "red"
                    }}>

                    </View>
                    <TextInput
                        label="Adventurer's name"
                        style={{ height: 40 }}
                        value={this.state.name}
                        mode="outlined"
                        onChangeText={name => this.setState({ name })}
                        autoFocus={true}
                    />

                    <View style={{
                        margin: 20
                    }}>
                        <Button icon={this.state.isMale ? "gender-male" : "gender-female"} style={{
                            width: 150,
                            alignSelf: "center"
                        }} mode="text" color={"black"} onPress={() => {
                            this.setState({
                                isMale: !this.state.isMale
                            })
                        }}>
                            {this.state.isMale ? "Male" : "Female"}
                        </Button>
                    </View>

                    <Button icon="plus" mode="text" disabled={this.state.name.trim() == ""} color="black" onPress={async () => {
                        await this.addProfile();
                        this.props.navigation.goBack();
                    }}>
                        Create adventurer
                    </Button>
                </Card.Content>
            </Card>
        );
    }
}
import React from 'react';
import { Profile, updateProfile } from '../utils/storage';
import { View, StyleSheet } from 'react-native';
import { Button, IconButton, FAB, Text, useTheme } from 'react-native-paper';
import FABGroup from '../components/FABGroup';

export default function(params: {
    navigation: any,
    route: {
        params: Profile
    }
}){
    return <ProfileScreen darkMode={useTheme().dark} navigation={params.navigation} route={params.route} />
}
class ProfileScreen extends React.Component<{
    navigation: any,
    route: {
        params: Profile
    },
    darkMode: boolean
}, {
    gear: number,
    level: number,
    isMale: boolean
}> {
    state = {
        gear: this.props.route.params.gear,
        level: this.props.route.params.level,
        isMale: this.props.route.params.isMale
    }

    async update(target: "gear" | "level", value: number) {
        let data = {};
        data[target] = this.state[target] + value;
        var profile = Object.assign({}, this.props.route.params);
        profile.gear = this.state.gear;
        profile.level = this.state.level;
        profile[target] += value;
        this.setState(data);
        await updateProfile(this.props.route.params.id, profile);
    }

    async changeGender() {
        var profile = Object.assign({}, this.props.route.params);
        profile.gear = this.state.gear;
        profile.level = this.state.level;
        profile.isMale = !this.state.isMale;
        this.setState(profile);
        await updateProfile(this.props.route.params.id, profile);
    }


    styles = StyleSheet.create({
        fab: {
            position: 'absolute',
            margin: 16,
            right: 0,
        },
    })

    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <View style={{
                    flex: 0.4,
                    justifyContent: "center"
                }}>
                    <Text style={{
                        fontSize: 26,
                        textAlign: "center"
                    }}>
                        Total
                </Text>
                    <Text style={{
                        fontSize: 30,
                        textAlign: "center"
                    }}>
                        {this.state.level + this.state.gear}
                    </Text>
                </View>
                <View style={{
                    flex: 0.2,
                    justifyContent: "center"
                }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 0.3, justifyContent: "center" }}>
                            <IconButton style={{ alignSelf: "flex-end" }} icon="minus" disabled={this.state.level == 1} onPress={() => { this.update("level", -1) }} />
                        </View>
                        <View style={{ flex: 0.4 }}>
                            <Text style={{ fontSize: 20, textAlign: "center" }}>
                                Level
                            </Text>
                            <Text style={{ fontSize: 24, textAlign: "center" }}>
                                {this.state.level}
                            </Text>
                        </View>
                        <View style={{ flex: 0.3 }}>
                            <IconButton style={{ alignSelf: "flex-start" }} icon="plus" disabled={this.state.level > 21} onPress={() => { this.update("level", 1) }} />
                        </View>
                    </View>
                </View>
                <View style={{
                    flex: 0.2,
                    justifyContent: "center"
                }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 0.3, justifyContent: "center" }}>
                            <IconButton style={{ alignSelf: "flex-end" }} icon="minus" onLongPress={() => { this.update("gear", this.state.gear * -1) }} disabled={this.state.gear == 0} onPress={() => { this.update("gear", -1); }} />
                        </View>
                        <View style={{ flex: 0.4 }}>
                            <Text style={{ fontSize: 20, textAlign: "center" }}>
                                Gear
                            </Text>
                            <Text style={{ fontSize: 24, textAlign: "center" }}>
                                {this.state.gear}
                            </Text>
                        </View>
                        <View style={{ flex: 0.3 }}>
                            <IconButton style={{ alignSelf: "flex-start" }} icon="plus" onPress={() => { this.update("gear", 1) }} />
                        </View>
                    </View>
                </View>
                <View style={{
                    flex: 0.2,
                    justifyContent: "center",
                    alignContent: "center"
                }}>
                    <Button icon={this.state.isMale ? "gender-male" : "gender-female"} style={{
                        width: 150,
                        alignSelf: "center"
                    }} mode="text" color={this.props.darkMode ? "white" : "black"} onPress={() => {
                        this.changeGender();
                    }}>
                        {this.state.isMale ? "Male" : "Female"}
                    </Button>
                </View>
                <FABGroup navigation={this.props.navigation} base={this.state.gear + this.state.level} />
            </View>
        );
    }
}
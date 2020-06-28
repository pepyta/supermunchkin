import React from 'react';
import { View } from 'react-native';
import { Button, Text, IconButton, useTheme } from 'react-native-paper';

export default function(){
    return <MonsterScreen darkMode={useTheme().dark} />
}

class MonsterScreen extends React.Component<{
    darkMode: boolean
}> {
    state = {
        level: 1,
        bonuses: 0,
        clone: false
    }

    render() {
        return( 
            <>
            
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
                        {(this.state.level + this.state.bonuses) * (this.state.clone ? 2 : 1)}
                    </Text>
                </View>
                <View style={{
                    flex: 0.2,
                    justifyContent: "center"
                }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 0.3, justifyContent: "center" }}>
                            <IconButton style={{ alignSelf: "flex-end" }} icon="minus" disabled={this.state.level == 1} onPress={() => { this.setState({ level: this.state.level - 1 }) }} />
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
                            <IconButton style={{ alignSelf: "flex-start" }} icon="plus" onPress={() => { this.setState({ level: this.state.level + 1 }) }} />
                        </View>
                    </View>
                </View>
                <View style={{
                    flex: 0.2,
                    justifyContent: "center"
                }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 0.3, justifyContent: "center" }}>
                            <IconButton style={{ alignSelf: "flex-end" }} icon="minus" onPress={() => { this.setState({ bonuses: this.state.bonuses - 1}) }} />
                        </View>
                        <View style={{ flex: 0.4 }}>
                            <Text style={{ fontSize: 20, textAlign: "center" }}>
                                Bonuses
                            </Text>
                            <Text style={{ fontSize: 24, textAlign: "center" }}>
                                {this.state.bonuses}
                            </Text>
                        </View>
                        <View style={{ flex: 0.3 }}>
                            <IconButton style={{ alignSelf: "flex-start" }} icon="plus" onPress={() => { this.setState({ bonuses: this.state.bonuses + 1 }) }} />
                        </View>
                    </View>
                </View>
                <View style={{
                    flex: 0.2,
                    justifyContent: "center",
                    alignContent: "center"
                }}>
                    <Button icon="content-copy" style={{
                        width: 250,
                        alignSelf: "center"
                    }} mode="text" color={this.props.darkMode ? "white" : "black"} onPress={() => {
                        this.setState({
                            clone: !this.state.clone
                        })
                    }}>
                        {this.state.clone ? "It's cloned" : "Use companion card"}
                    </Button>
                </View>
            </>
            )
    }
}
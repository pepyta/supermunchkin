import React, { Ref } from 'react';
import { Card, Title, Paragraph, TouchableRipple, Theme, useTheme, Text, Button } from 'react-native-paper';
import { View } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";

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
    bottomSheetRef = React.createRef<RBSheet>();

    render() {
        return (
            <>
                <Card style={{ borderRadius: 5, marginBottom: 12 }}>
                    <TouchableRipple
                        onPress={() => {
                            this.props.navigation.navigate("ProfileScreen", this.props)
                        }}
                        onLongPress={() => {
                            this.bottomSheetRef.current.open();
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
                <RBSheet
                    customStyles={{
                        container: {
                            backgroundColor: this.props.theme.dark ? this.props.theme.colors.primary : "#fff"
                        }
                    }}
                    closeOnDragDown={true}
                    ref={this.bottomSheetRef}
                    height={300}
                    openDuration={250}
                >
                    <View style={{
                        width: "100%"
                    }}>
                        <Button style={{
                            marginHorizontal: 10,
                            marginTop: 10
                        }}
                            color={this.props.theme.dark ? "white" : "black"}
                            icon={"delete"}
                            mode="outlined"
                            onPress={() => {
                                this.setState({
                                    bottomSheetVisible: false
                                });
                                this.props.delete(this.props.id);
                            }}>
                            Delete profile
                </Button>
                    </View>
                </RBSheet>
            </>
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
}) {
    const theme = useTheme();
    return <ProfileCard id={id} name={name} level={level} gear={gear} isMale={isMale} delete={deleteFunction} navigation={navigation} theme={theme} />
}
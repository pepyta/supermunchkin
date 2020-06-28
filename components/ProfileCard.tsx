import React from 'react';
import { Card, Title, Paragraph, TouchableRipple, Theme, useTheme, Text, Button } from 'react-native-paper';
import { View } from 'react-native';
import { BottomSheet } from 'react-native-btr';

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
    state = {
        bottomSheetVisible: false
    }

    render() {
        return (
            <>
            <Card style={{ borderRadius: 5, marginBottom: 12 }}>
                <TouchableRipple
                    onPress={() => {
                        this.props.navigation.navigate("ProfileScreen", this.props)
                    }}
                    onLongPress={() => {
                        this.setState({
                            bottomSheetVisible: true
                        })
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
            
        <BottomSheet
          visible={this.state.bottomSheetVisible}
          onBackButtonPress={() => {
            this.setState({
                bottomSheetVisible: false
            })
          }}
          onBackdropPress={() => {
            this.setState({
                bottomSheetVisible: false
            })
          }}
        >
            <View style={{
                width: "100%",
                minHeight: 300,
                backgroundColor: "white"
            }}>
                <Button style={{
                    marginHorizontal: 10,
                    marginTop: 10
                }}
                color="black"
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
        </BottomSheet>
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
}){
    const theme = useTheme();
    return <ProfileCard id={id} name={name} level={level} gear={gear} isMale={isMale} delete={deleteFunction} navigation={navigation} theme={theme} />
}
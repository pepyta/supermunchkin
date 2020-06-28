import * as React from 'react';
import { FAB, Portal, useTheme, Theme, Modal } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

class FABGroup extends React.Component<{
    theme: Theme,
    navigation: any,
    base: number,
}> {
    state = {
        diceOpen: false,
        open: false,
        dice: 1
    };

    _onStateChange = ({ open }) => this.setState({ open });

    render() {
        const { open } = this.state;

        return (
            <>                    
                <FAB.Group style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0
                }}
                fabStyle={{
                    backgroundColor: this.props.theme.colors.primary
                }}
                    visible={true}
                    open={open}
                    icon={open ? 'close' : 'plus'}
                    actions={[
                        { icon: 'dice-5', label: 'Roll with a dice', onPress: () => { this.setState({ diceOpen: true, dice: Math.floor(Math.random() * 6 + 1) }) } },
                        { icon: 'sword', label: 'Start a fight', onPress: () => { this.props.navigation.navigate("FightScreen", {
                            base: this.props.base
                        }) } },
                        { icon: 'cow', label: "Count monster's score", onPress: () => { this.props.navigation.navigate("MonsterScreen") } },
                    ]}
                    onStateChange={this._onStateChange}
                    onPress={() => {
                        if (open) {
                            // do something if the speed dial is open
                        }
                    }}
                />

                <Portal>
                    <Modal visible={this.state.diceOpen} onDismiss={() => {this.setState({ diceOpen: false })}}>
                        <MaterialCommunityIcons size={96} style={{
                            backgroundColor: "white",
                            alignSelf: "center",
                            padding: 0,
                            borderRadius: 12
                        }} name={`dice-${this.state.dice}`} />
                    </Modal>
               </Portal>
            </>
        );
    }
}

export default function FABGroupWithHooks({ navigation, base }) {
    const theme = useTheme();
    return <FABGroup theme={theme} navigation={navigation} base={base} />
}
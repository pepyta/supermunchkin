import React from 'react';
import { View } from 'react-native';

export default class Container extends React.Component {
    render(){
        return (
            <View style={{
                margin: 12,
                marginTop: 0
            }}>
                {this.props.children}
            </View>
        );
    }
}
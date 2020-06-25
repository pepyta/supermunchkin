import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch, Theme, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationHelpers } from '@react-navigation/native';
import { DrawerNavigationEventMap } from '@react-navigation/drawer/lib/typescript/src/types';
import { getProfiles } from '../utils/storage';

class DrawerContent extends React.Component<{
	navigation: NavigationHelpers<Record<string, object | undefined>, DrawerNavigationEventMap>,
	theme: Theme
}> {
	state = {
		levels: 0,
		adventurers: 0
	};

	async componentDidMount(){
		let profiles = await getProfiles();

		this.setState({
			levels: profiles.reduce((a, b) => (a + b.level - 1), 0),
			adventurers: profiles.length
		})
	}

	render() {
		return (
			<DrawerContentScrollView style={{
				backgroundColor: this.props.theme.colors.surface
			}} {...this.props}>
				<View style={styles.drawerContent}>
					<View style={styles.userInfoSection}>
						<Title style={styles.title}>Super Munchkin</Title>
						<Caption style={styles.caption}>An application from Gál Péter</Caption>
						<View style={styles.row}>
							<View style={styles.section}>
								<Paragraph style={[styles.paragraph, styles.caption]}>
									{this.state.adventurers}
                      			</Paragraph>
								<Caption style={styles.caption}>Adventurers</Caption>
							</View>
							<View style={styles.section}>
								<Paragraph style={[styles.paragraph, styles.caption]}>
									{this.state.levels}
                      			</Paragraph>
								<Caption style={styles.caption}>Monsters killed</Caption>
							</View>
						</View>
					</View>
					<View style={styles.drawerSection}>
						<DrawerItem
							icon={({ color, size }) => (
								<MaterialCommunityIcons
									name="home"
									color={color}
									size={size}
								/>
							)}
							label="Home"
							onPress={() => {
								this.props.navigation.navigate("Profiles");
							 }}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<MaterialCommunityIcons name="settings" color={color} size={size} />
							)}
							label="Settings"
							onPress={() => {
								this.props.navigation.navigate("Settings");
							 }}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<MaterialCommunityIcons name="github-box" color={color} size={size} />
							)}
							label="Source code"
							onPress={() => { 
								Linking.openURL("https://github.com/pepyta/supermunchkin");
							}}
						/>
					</View>
				</View>
			</DrawerContentScrollView>
		);
	}
}

export default function DrawerWithHooks({ navigation }){
	const theme = useTheme();
	return <DrawerContent navigation={navigation} theme={theme} />
}

const styles = StyleSheet.create({
	drawerContent: {
		flex: 1,
	},
	userInfoSection: {
		paddingLeft: 20,
	},
	title: {
		marginTop: 20,
		fontWeight: 'bold',
	},
	caption: {
		fontSize: 14,
		lineHeight: 14,
	},
	row: {
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'center',
	},
	section: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 15,
	},
	paragraph: {
		fontWeight: 'bold',
		marginRight: 3,
	},
	drawerSection: {
		marginTop: 15,
	},
	preference: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
});
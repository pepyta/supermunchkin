import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import ProfileCard from '../components/ProfileCard';
import { FAB, useTheme, Snackbar, Title, Subheading } from 'react-native-paper';
import { getProfiles, deleteProfile } from '../utils/storage';
import { Profile } from '../utils/storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { componentDidMount } from '../utils/hooks';

export default function HomeScreen({ navigation }) {
    const theme = useTheme();
    const [profiles, setProfiles] = useState(new Array<Profile>());
    const [snackBarVisible, setSnackBarVisible] = useState(false);

    componentDidMount(() => {
        navigation.addListener('focus', () => {
            getProfiles().then((result) => {
                setProfiles(result);
            });
        });
    });

    const styles = StyleSheet.create({
        fab: {
            backgroundColor: theme.colors.primary,
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: snackBarVisible ? 60 : 0,
        },
    })


    async function removeProfile(id: number) {
        setProfiles(profiles.filter((profile, index) => id !== index));
        setSnackBarVisible(true);
        await deleteProfile(id);
    }

    return (
        <>
            {profiles.length == 0 ? 
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={{
                    flexDirection: "row",
                    margin: 20
                }}>
                    <View style={{
                        flex: 0.3
                    }}>
                        <MaterialCommunityIcons color={theme.dark ? "white" : "black"} name={"close"} size={80} />
                    </View>
                    <View style={{
                        flex: 0.7
                    }}>
                        <Title>
                            No profile found
                        </Title>
                        <Subheading>
                            Click on the add button to create a profile!
                        </Subheading>
                    </View>
                </View>
            </View> :
            <FlatList
                contentContainerStyle={{ padding: 12, paddingBottom: 0 }}
                data={profiles}
                renderItem={(profile) => <ProfileCard id={profile.index} name={profile.item.name} isMale={profile.item.isMale} level={profile.item.level} gear={profile.item.gear} deleteFunction={removeProfile} navigation={navigation} />}
                keyExtractor={(profile) => `profile-${profile.id}-${profile.name}`}
            />}
            <FAB
                style={styles.fab}
                icon="plus"
                label="Create profile"
                onPress={() => navigation.navigate('CreateProfile')}
            />
            <Snackbar
                style={{
                    borderRadius: 8
                }}
                visible={snackBarVisible}
                onDismiss={() => {
                    setSnackBarVisible(false);
                }}
                action={{
                    label: 'Okay',
                    onPress: () => {
                        setSnackBarVisible(false);
                    },
                }}
            >
                You've successfully deleted that profile!
            </Snackbar>
        </>
    );
}
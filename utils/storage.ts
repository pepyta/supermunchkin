import AsyncStorage from '@react-native-community/async-storage';

export type Profile = {
    id: number,
    name: string,
    level: number,
    gear: number,
    isMale: boolean
};

export async function getProfiles(){
    let resp = await AsyncStorage.getItem("@profiles");

    if(resp === null) return new Array<Profile>();

    let data:Array<Profile> = JSON.parse(resp);
    return data;
}

export async function createProfile(name: string, isMale: boolean){
    let profiles = await getProfiles();

    profiles.push({
        id: profiles.length,
        name,
        isMale,
        level: 1,
        gear: 0
    });

    await AsyncStorage.setItem("@profiles", JSON.stringify(profiles));
}

export async function deleteProfile(id: number){
    let profiles = await getProfiles();

    await AsyncStorage.setItem("@profiles", JSON.stringify(profiles.filter((profile, index) => index !== id)));
}

export async function updateProfile(id: number, profile: Profile){
    let profiles: Array<Profile> = await getProfiles();
    
    profiles[id] = profile;

    await AsyncStorage.setItem("@profiles", JSON.stringify(profiles));
}
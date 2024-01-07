import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { BackHandler } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { auth } from './firebase';
import ConfirmationDialog from './ConfirmationDialog';

const HomeScreen = ({ navigation }) => {
    const [username, setUsername] = useState(null);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);


    useEffect(() => {

        const user = getAuth().currentUser;

        if (user) {
            setUsername(user.displayName);
        }

        const backAction = () => {
            if (navigation.isFocused()) {
                BackHandler.exitApp();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    }, [navigation]);

    const handleButtonPress = () => {
        // Define the action to take when the button is pressed
        // You can navigate to another screen or perform a specific action here
    };

    const handleProfileButtonPress = () => {
        navigation.navigate('Profile');
    };

    const handleLogoutButtonPress = () => {
        setShowConfirmationDialog(true);
    };

    const handleLogoutCancelled = () => {
        setShowConfirmationDialog(false);
    };

    const handleLogoutConfirmed = () => {
        setShowConfirmationDialog(false);
        signOut(auth)
            .then(() => {
                navigation.navigate('Login');
            })
            .catch((error) => {
                console.error('Error logging out:', error);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.rectangle25}>
                <Image
                    style={styles.homePic}
                    source={require('./assets/homeCover.jpg')}
                />
            </View>
            <Text style={styles.welcomeText}>Hi {username},</Text>
            <Text style={styles.welcomeText}>Welcome to MyCardio MedCare!</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={handleProfileButtonPress}
            >
                <Image source={require('./assets/profile.png')} style={styles.vectorIcon} />
                <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonPredict}
                onPress={handleButtonPress}
            >
                <Image source={require('./assets/p.png')} style={styles.vectorIcon} />
                <Text style={styles.buttonTextPredict}>Get Predict</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonAbout}
                onPress={handleButtonPress}
            >
                <Image source={require('./assets/aboutUs.png')} style={styles.vectorIconUs} />
                <Text style={styles.buttonTextPredict}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonLogout}
                onPress={handleLogoutButtonPress}
            >
                <Image source={require('./assets/logout.png')} style={styles.vectorIcon} />
                <Text style={styles.buttonTextPredict}>Logout</Text>
            </TouchableOpacity>

            <ConfirmationDialog
                isVisible={showConfirmationDialog}
                message="Are you sure you want to logout?"
                onCancel={handleLogoutCancelled}
                onConfirm={handleLogoutConfirmed}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderTopColor: '#FF3939',
        borderTopWidth: 50,
    },
    homePic: {
        position: 'relative',
        width: 430,
        height: 337,
        left: 0,
        top: -133,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        top: -100,
    },
    button: {
        position: 'absolute',
        width: 150,
        height: 80,
        left: 20,
        top: 480,
        backgroundColor: '#FF3939',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#F81414',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 6,
        elevation: 6,
    },

    buttonPredict: {
        position: 'absolute',
        width: 150,
        height: 80,
        left: 210,
        top: 480,
        backgroundColor: '#FF3939',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#F81414',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 6,
        elevation: 6,
    },
    buttonAbout: {
        position: 'absolute',
        width: 150,
        height: 80,
        left: 20,
        top: 580,
        backgroundColor: '#FF3939',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#F81414',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 6,
        elevation: 6,
    },
    buttonLogout: {
        position: 'absolute',
        width: 150,
        height: 80,
        left: 210,
        top: 580,
        backgroundColor: '#FF3939',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#F81414',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 6,
        elevation: 6,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonTextPredict: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        left: 5,
    },
    vectorIcon: {
        position: 'absolute',
        left: 10,
        top: 10,
        width: 25,
        height: 25,
    },
    vectorIconUs: {
        position: 'absolute',
        left: 5,
        top: 5,
        width: 40,
        height: 40,
    },
});

export default HomeScreen;

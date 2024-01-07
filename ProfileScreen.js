// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

// const EditProfileScreen = () => {
//     const [username, setUsername] = useState(''); 
//     const [contact, setContact] = useState(''); 

//     // Function to handle the profile update
//     const handleUpdateProfile = () => {
//         // Implement the logic to update the user's profile details
//         console.log('Updating profile:', { username, contact });
//         // You may want to integrate this with your Firebase update logic
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Edit Profile</Text>

//             {/* Input fields for editing profile details */}
//             <TextInput
//                 style={styles.input}
//                 placeholder="Username"
//                 value={username}
//                 onChangeText={(text) => setUsername(text)}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Contact Number"
//                 value={contact}
//                 onChangeText={(text) => setContact(text)}
//                 keyboardType="number-pad"
//             />

//             {/* Button to update profile */}
//             <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
//                 <Text style={styles.buttonText}>Update Profile</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#ffffff',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     input: {
//         width: '80%',
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         borderRadius: 5,
//         paddingHorizontal: 10,
//         marginVertical: 10,
//     },
//     button: {
//         backgroundColor: '#5FFF9F',
//         borderRadius: 5,
//         paddingVertical: 15,
//         paddingHorizontal: 30,
//         marginTop: 20,
//     },
//     buttonText: {
//         color: 'black',
//         fontSize: 18,
//     },
// });

// export default EditProfileScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const EditProfileScreen = () => {
    const [username, setUsername] = useState('');
    const [contact, setContact] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        // Fetch user data from Firestore
        const userId = 'YOUR_USER_ID'; // Replace with the actual user ID
        const firestore = firebase.firestore();
        const userRef = firestore.collection('users').doc(userId);

        userRef.get().then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                setUsername(userData.username);
                setContact(userData.contact);

                // Fetch profile image from Firebase Storage
                const storage = firebase.storage();
                const imageRef = storage.ref(`profileImages/${userId}.jpg`);

                imageRef.getDownloadURL().then((url) => {
                    setProfileImage(url);
                }).catch((error) => {
                    // Handle error fetching image
                    console.error('Error fetching profile image:', error);
                });
            } else {
                // Handle user not found
                console.error('User not found');
            }
        }).catch((error) => {
            // Handle error fetching user data
            console.error('Error fetching user data:', error);
        });
    }, []);

    // Function to handle the profile update
    const handleUpdateProfile = () => {
        // Implement the logic to update the user's profile details
        console.log('Updating profile:', { username, contact });
        // You may want to integrate this with your Firebase update logic
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Profile</Text>

            {profileImage && <Image source={{ uri: profileImage }} style={styles.profileImage} />}

            {/* Input fields for editing profile details */}
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Contact Number"
                value={contact}
                onChangeText={(text) => setContact(text)}
                keyboardType="number-pad"
            />

            {/* Button to update profile */}
            <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
                <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#5FFF9F',
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginTop: 20,
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
    },
});

export default EditProfileScreen;

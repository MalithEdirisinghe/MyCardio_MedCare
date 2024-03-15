import { Image } from 'react-native';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import Predict from './Predict';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from './SplashScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const HomeTabNavigator = () => (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FF3939', // Set the background color to green
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={() => ({
          tabBarIcon: () => (
            <Image
              source={require('./assets/HomeBlack.png')}
              style={{ width: 35, height: 35 }}
            />
          ),
          headerShown: false,
          headerLeft: null, // Remove the back button
        })}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={() => ({
          tabBarIcon: () => (
            <Image
              source={require('./assets/profile.png')}
              style={{ width: 25, height: 25 }}
            />
          ),
          headerShown: false,
          headerLeft: null, // Remove the back button
        })}
      />

      <Tab.Screen
        name="Predict"
        component={Predict}
        options={() => ({
          tabBarIcon: () => (
            <Image
              source={require('./assets/predict.png')}
              style={{ width: 25, height: 25 }}
            />
          ),
          headerShown: false,
          headerLeft: null, 
          // Remove the back button
        })}
        
      />
      {/* Add other Tab.Screen components here */}
    </Tab.Navigator>
  );


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen}
          options={() => ({
            headerShown: false,
            headerLeft: null, // Remove the back button
          })} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={() => ({
            headerShown: false,
            headerLeft: null, // Remove the back button
          })}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={() => ({
            headerShown: false,
            headerLeft: null, // Remove the back button
          })}
        />

        <Stack.Screen
          name="Homes"
          component={HomeTabNavigator}
          options={() => ({
            headerShown: false,
            headerLeft: null, // Remove the back button
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
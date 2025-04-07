import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Home from './Home';
import Chart from './Chart';
import Wardrobe from './Wardrobe';
import Party from './Party';
import More from './More';
import CategoryPage from './CategoryPage';
import Friends from './Friends';
import StartPage from './StartPage';
import SignIn from './SignIn';
import ItemDetail from './ItemDetail';

import { friends } from './Data';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Bottom Tabs (wrapped in their own component for clarity)
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopWidth: 0,
        elevation: 0,
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color || '#000'} />
        ),
      }}
    />

    <Tab.Screen
      name="Chart"
      component={Chart}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <Ionicons name={focused ? 'bar-chart' : 'bar-chart-outline'} size={24} color={color || '#000'} />
        ),
      }}
    />

    <Tab.Screen
      name="Avatar"
      component={Wardrobe}
      options={{
        tabBarStyle: { display: 'none' },
        tabBarIcon: () => (
          <Image
            source={{ uri: friends[0].avatar }}
            style={{
              width: 30,
              height: 30,
              borderRadius: 20,
            }}
          />
        ),
      }}
    />

    <Tab.Screen
      name="Party"
      component={Party}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <Ionicons name={focused ? 'people' : 'people-outline'} size={24} color={color || '#000'} />
        ),
      }}
    />

    <Tab.Screen
      name="More"
      component={More}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <Ionicons name={focused ? 'ellipsis-horizontal-circle' : 'ellipsis-horizontal-circle-outline'} size={24} color={color || '#000'} />
        ),
      }}
    />

    

  </Tab.Navigator>
);

// Root App
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="CategoryPage" component={CategoryPage} />
          <Stack.Screen name="Friends" component={Friends} />
          <Stack.Screen name="StartPage" component={StartPage} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="ItemDetail" component={ItemDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

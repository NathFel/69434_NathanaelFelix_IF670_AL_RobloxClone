// BlankPage.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BlankPage() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is a Blank Page</Text>
       <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Main', { screen: 'Home' })}
      />
      <Button title="Go to Chart" onPress={() => navigation.navigate('Chart')} />
      <Button title="Go to Avatar" onPress={() => navigation.navigate('Avatar')} />
      <Button title="Go to Party" onPress={() => navigation.navigate('Party')} />
      <Button title="Go to More" onPress={() => navigation.navigate('More')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10
  },
  title: {
    fontSize: 20, marginBottom: 20
  }
});

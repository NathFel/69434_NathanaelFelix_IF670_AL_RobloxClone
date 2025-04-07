import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";

const StartPage = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={{
        uri: 'https://www.whatspaper.com/wp-content/uploads/2023/05/hd-roblox-wallpaper-whatspaper-3.webp',
      }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Image
          source={{ uri: 'https://static.wikia.nocookie.net/central/images/b/bf/Roblox_Logo_White.svg/revision/latest/scale-to-width-down/200?cb=20220901000101' }}
          style={styles.logo}
          resizeMode="contain"
        />

        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.signInButton}
            onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.footerLinks}>
          <Text style={styles.link}>Terms</Text>
          <Text style={styles.link}>Privacy</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

export default StartPage;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 60,
    paddingHorizontal: 24,
  },
  logo: {
    position: 'absolute',
    top: 120,
    width: 280,
    height: 60,
  },
  createButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: '100%',
    marginBottom: 12,
  },
  createText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signInButton: {
    borderColor: '#fff',
    borderWidth: 1.5,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: '100%',
    marginBottom: 24,
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  link: {
    color: '#3da4ff',
    textDecorationLine: 'underline',
    fontSize: 16,
    marginHorizontal: 10,
  },
  dot: {
    color: '#fff',
    fontSize: 14,
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const  SignIn = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <ImageBackground
      source={{
        uri: 'https://www.whatspaper.com/wp-content/uploads/2023/05/hd-roblox-wallpaper-whatspaper-3.webp',
      }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={30} color="#fff" />
        </TouchableOpacity>

        {/* Logo */}
        <Image
          source={{
            uri: 'https://static.wikia.nocookie.net/central/images/b/bf/Roblox_Logo_White.svg/revision/latest/scale-to-width-down/200?cb=20220901000101',
          }}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Input Fields */}
        <TextInput
          style={styles.input}
          placeholder="Username / Email / Phone"
          placeholderTextColor="#ccc"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#ccc"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons
              name={passwordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="#ccc"
            />
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => navigation.replace('Main')}
        >
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        {/* Other Links */}
        <TouchableOpacity style={styles.otherButton}>
          <Text style={styles.link}>Email Me a One-Time Code</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.otherButton}>
          <Text style={styles.link}>Quick Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.subtleLink}>Forgot Password or Username?</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footerLinks}>
          <Text style={styles.footerLink}>Terms</Text>
          <Text style={styles.footerLink}>Privacy</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

export default SignIn;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    left: 24,
    zIndex: 10,
  },
  logo: {
    position: 'absolute',
    top: 120,
    alignSelf: 'center',
    width: 280,
    height: 60,
  },
  input: {
    marginTop: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    paddingVertical: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 2,
    marginBottom: 18,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
  signInButton: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  signInText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtleLink: {
    color: '#fff',
    textDecorationLine: 'underline',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  footerLink: {
    color: '#3da4ff',
    textDecorationLine: 'underline',
    fontSize: 14,
    marginHorizontal: 10,
  },
  otherButton: {
    borderColor: '#fff',
    borderWidth: 1.5,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: '100%',
    marginBottom: 24,
  },
});

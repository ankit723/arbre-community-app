import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HelloWave } from '@/components/HelloWave';

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigation = useNavigation();

  const handleLogin = () => {
    let valid = true;
    if (!email) {
      setEmailError('Please enter your email');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Please enter your password');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      setEmail("");
      setPassword("");
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPasswordScreen');
  };
  const handleSignUp = () => {
    console.log("Sign Up button pressed");
    navigation.navigate('PageOne');
  };
  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} 
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ThemedText type="title" style={styles.titletext}>Hello! <HelloWave /></ThemedText>
        <ThemedText type="default"> Welcome back, you've been missed </ThemedText>
        <View style={styles.inputContainer}>
          <Text style={styles.otherText}>Email</Text> 
          <TextInput
            style={styles.input}
            placeholder="Enter Your Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          
          <Text style={styles.otherText}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter Your Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Image
                source={
                  showPassword
                    ? require('../assets/images/eye-open.png') 
                    : require('../assets/images/eye-closed.png') 
                }
                style={styles.eyeIconImage}
              />
            </TouchableOpacity>
          </View>
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        </View>
        <View style={styles.optionsContainer}>
          <View style={styles.checkboxContainer}>
            <Text style={styles.label}>Remember Me</Text>
            <CheckBox
              style={styles.checkbox}
              onClick={() => setRememberMe(!rememberMe)}
              isChecked={rememberMe}
              checkBoxColor="#000"
              uncheckedCheckBoxColor="#ccc"
            />
          </View>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            styles.loginButton,
            { width: screenWidth > 768 ? '50%' : '90%' },
            isPressed && styles.loginButtonPressed,
          ]}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForgotPassword}>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.forgotPassword}>Sign Up!</Text>
          </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  titletext:{
    fontSize: 30,
    marginBottom:10,
  },
  container: {
    flex: 1,
    marginTop: 50,
  },
  otherText: {
    fontSize: 13,
    fontFamily: 'Helvetica',
    marginBottom: 10,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  inputContainer: {
    width: '90%',
    marginBottom: 16,
    marginTop: 50,

  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIconImage: {
    height: 20,
    width: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    marginTop: 2,
  },
  optionsContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    margin: 8,
  },
  forgotPassword: {
    color: '#0066cc',
  },
  loginButton: {
    paddingVertical: 10,
    backgroundColor: '#0066cc',
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 60,
  },
  loginButtonPressed: {
    backgroundColor: '#004999',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

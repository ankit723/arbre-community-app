// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// export default function ForgotPasswordScreen() {
//   const [email, setEmail] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const navigation = useNavigation();

//   const handleForgotPassword = () => {
//     let valid = true;
//     if (!email) {
//       setEmailError('Please enter your email');
//       valid = false;
//     } else {
//       setEmailError('');
//     }

//     if (valid) {
//       alert('Your password link has been sent successfully');
//       setEmail("");
//     }
//   };

//   const handleHomeScreen = () => {
//     navigation.navigate('index');
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={handleHomeScreen} style={styles.backButton}>
//         <Text style={styles.homeScreen}>&#8592; Back To Home Screen</Text>
//       </TouchableOpacity>
//       <Text style={styles.title}>Forgot Password</Text>
//       <TextInput
//         style={styles.input}
//         value={email}
//         placeholder="Enter your email"
//         keyboardType="email-address"
//         autoCapitalize="none"
//         onChangeText={setEmail}
//       />
//       {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
//       <Button title="Submit" onPress={handleForgotPassword} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//     fontWeight: 'bold',
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: '15%',
//     width: '90%',
//     paddingHorizontal: 8,
//     borderRadius: 10,
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: 8,
//     alignSelf: 'flex-start',
//     marginLeft: '5%',
//   },
//   homeScreen: {
//     color: '#0066cc',
//     fontSize: 16,
//     marginBottom: '50%',
//   },
//   backButton: {
//     alignSelf: 'flex-start',
//     marginBottom: 20, 
//     paddingHorizontal: 16, 
//     marginLeft: '4%',
//       position: 'absolute',
//       top: '30%', 
//       left: '5%', 
//       zIndex: 1, 
//   },
// });
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';

const { width: screenWidth } = Dimensions.get('window');

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigation = useNavigation();

  const handleForgotPassword = () => {
    let valid = true;
    if (!email) {
      setEmailError('Please enter your email');
      valid = false;
    } else {
      setEmailError('');
    }

    if (valid) {
      alert('Your password link has been sent successfully');
      setEmail("");
    }
  };

  const handleHomeScreen = () => {
    navigation.navigate('index');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on the platform
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TouchableOpacity onPress={handleHomeScreen} style={styles.backButton}>
          <Text style={styles.homeScreen}>&#8592; Back To Home Screen</Text>
        </TouchableOpacity>
        <ThemedText type="title" style={styles.title}>Forgot Password</ThemedText>
        <ThemedText type="default"></ThemedText>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TouchableOpacity
          style={[
            styles.submitButton,
            { width: screenWidth > 768 ? '50%' : '90%' }, // Responsive width
          ]}
          onPress={handleForgotPassword}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    zIndex: 1, // Ensure title is above other elements if necessary
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    width: '90%',
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    alignSelf: 'flex-start',
    marginLeft: '5%',
  },
  homeScreen: {
    color: '#0066cc',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: '10%', 
    left: '5%',
    zIndex: 2,
    paddingHorizontal: 16,
  },
  submitButton: {
    paddingVertical: 10,
    backgroundColor: '#0066cc',
    borderRadius: 25, // Increased for more curve
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

import React from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Define validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

export default function ForgotPasswordScreen() {
  // Handle password reset request
  const handleResetSubmit = async (values: { email: string }) => {
    try {
      await axios.post('https://your-backend-api.com/reset-password', values);
      Alert.alert('Success', 'Password reset link sent to your email.');
    } catch (error) {
      Alert.alert('Error', 'Failed to send reset link. Please try again.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Forgot Password</ThemedText>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={handleResetSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email ? <ThemedText style={styles.error}>{errors.email}</ThemedText> : null}
            {/* <Button title="Send Reset Link" onPress={handleSubmit} /> */}
          </View>
        )}
      </Formik>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  form: {
    gap: 12,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
  },
});

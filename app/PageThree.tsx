import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import { Formik } from 'formik';
import ProgressBar from 'react-native-progress/Bar';
import * as Yup from 'yup';

const { width: screenWidth } = Dimensions.get('window');

const PageThree = ({ route, navigation }) => {
  const { formData } = route.params;

  const handlePrevScreen = (values) => {
    navigation.navigate('PageTwo', { formData: values });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Formik
        initialValues={{ ...formData, phoneNumber: '', email: '' }}
        validationSchema={Yup.object({
          phoneNumber: Yup.string()
            .matches(/^\d{10}$/, 'Phone No must be 10 digits long')
            .required('Phone number is required'),
          email: Yup.string().email('Invalid email address').required('Required'),
        })}
        onSubmit={(values) => {
          console.log(values);
          navigation.navigate('PageFour', { formData: values });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View style={styles.formWrapper}>
              <Text style={styles.subtitle}>Contact Details</Text>
              <View style={styles.progressBarContainer}>
                <ProgressBar progress={0.5000001} width={screenWidth / 2 - 40} />
              </View>
              <View style={styles.formContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                  style={styles.input}
                  keyboardType="phone-pad" />
                {errors.phoneNumber && touched.phoneNumber && (
                  <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                )}

                <Text style={styles.label}>Email</Text>
                <TextInput
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  style={styles.input}
                  keyboardType="email-address" />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.backButton]}
                onPress={() => handlePrevScreen(values)}
              >
                <Text style={styles.buttonText}>&#8592; Back</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop:220,
  },
  formWrapper: {
    width: '90%',
    maxWidth: 600,
    alignSelf: 'center',
    padding: 20,
    flex: 1, 
  },
  formContainer: {
    marginTop: 20,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#0066cc',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%', 
    maxWidth: 600,
    marginBottom: 20, 
  },
  button: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  backButton: {
    backgroundColor: '#cccccc',
  },
  submitButton: {
    backgroundColor: '#0066cc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default PageThree;

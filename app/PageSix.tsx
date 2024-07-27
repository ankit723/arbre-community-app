import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions
} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import * as Yup from 'yup';

const { width: screenWidth } = Dimensions.get('window');

const statesOfIndia = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const PageSix = ({ route, navigation }) => {
  const { formData } = route.params;

  const handlePrevScreen = () => {
    navigation.navigate('PageFive', { formData });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.subtitle}>Address Details</Text>
          <View style={styles.progressBarContainer}>
            <ProgressBar progress={1} width={screenWidth / 2 - 40} />
          </View>
          <Formik
            initialValues={{ ...formData, addressLine1: '', addressLine2: '', pinCode: '', district: '', state: '' }}
            validationSchema={Yup.object({
              addressLine1: Yup.string().required('Address Line 1 is required'),
              addressLine2: Yup.string(),
              pinCode: Yup.string()
                .matches(/^\d{6}$/, 'Pin Code must be exactly 6 digits')
                .required('Pin Code is required'),
              district: Yup.string().required('District is required'),
              state: Yup.string().required('State is required'),
            })}
            onSubmit={(values) => {
              console.log(values);
              // Handle form submission here (e.g., send data to a server)
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <><View style={styles.formContainer}>
                <Text style={styles.label}>Address Line 1</Text>
                <TextInput
                  onChangeText={handleChange('addressLine1')}
                  onBlur={handleBlur('addressLine1')}
                  value={values.addressLine1}
                  style={styles.input} />
                {errors.addressLine1 && touched.addressLine1 && <Text style={styles.errorText}>{errors.addressLine1}</Text>}

                <Text style={styles.label}>Address Line 2</Text>
                <TextInput
                  onChangeText={handleChange('addressLine2')}
                  onBlur={handleBlur('addressLine2')}
                  value={values.addressLine2}
                  style={styles.input} />
                {errors.addressLine2 && touched.addressLine2 && <Text style={styles.errorText}>{errors.addressLine2}</Text>}

                <Text style={styles.label}>Pin Code</Text>
                <TextInput
                  onChangeText={handleChange('pinCode')}
                  onBlur={handleBlur('pinCode')}
                  value={values.pinCode}
                  style={styles.input}
                  keyboardType="numeric" />
                {errors.pinCode && touched.pinCode && <Text style={styles.errorText}>{errors.pinCode}</Text>}

                <Text style={styles.label}>District</Text>
                <TextInput
                  onChangeText={handleChange('district')}
                  onBlur={handleBlur('district')}
                  value={values.district}
                  style={styles.input} />
                {errors.district && touched.district && <Text style={styles.errorText}>{errors.district}</Text>}

                <Text style={styles.label}>State</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={values.state}
                    onValueChange={handleChange('state')}
                    onBlur={handleBlur('state')}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select State" value="" />
                    {statesOfIndia.map((state) => (
                      <Picker.Item key={state} label={state} value={state} />
                    ))}
                  </Picker>
                </View>
                {errors.state && touched.state && <Text style={styles.errorText}>{errors.state}</Text>}
              </View><View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.backButton]}
                    onPress={() => handlePrevScreen(formData)}
                  >
                    <Text style={styles.buttonText}>&#8592; Back</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.button, styles.submitButton]}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                </View></>
            )}
          </Formik>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop:70,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between', 
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    padding: 20,
    marginBottom:100,
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
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
    height: 40,
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
  },
  picker: {
    height: 40,
    width: '100%',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
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

export default PageSix;

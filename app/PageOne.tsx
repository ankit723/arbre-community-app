import React from 'react';
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ProgressBar from 'react-native-progress/Bar';
import { ThemedText } from '@/components/ThemedText';

const { width: screenWidth } = Dimensions.get('window');

const PageOne = ({ navigation }) => {
  const handlePrevScreen = () => {
    navigation.navigate('index');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.titleContainer}>
          <ThemedText type="title" style={styles.titleText}>Member Form</ThemedText>
          <Text style={styles.subtitle}>Personal Details</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <ProgressBar progress={0.1667} width={screenWidth / 2 - 40} />
        </View>
        <Formik
          initialValues={{ salutation: '', gender: '', name: '', middleName: '', surname: '' }}
          validationSchema={Yup.object({
            salutation: Yup.string().required('Required'),
            gender: Yup.string().required('Required'),
            name: Yup.string().required('Required'),
            middleName: Yup.string(),
            surname: Yup.string().required('Required'),
          })}
          onSubmit={(values) => {
            console.log(values);
            navigation.navigate('PageTwo', { formData: values });
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched }) => (
            <><View style={styles.formContainer}>
              <Text style={styles.label}>Salutation</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={values.salutation}
                  onValueChange={(itemValue) => setFieldValue('salutation', itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Below" value="" />
                  <Picker.Item label="Mr." value="Mr." />
                  <Picker.Item label="Ms." value="Ms." />
                </Picker>
              </View>

              <Text style={styles.label}>Gender</Text>
              <View style={styles.radioGroup}>
                <TouchableWithoutFeedback onPress={() => setFieldValue('gender', 'Male')}>
                  <View style={styles.radioButtonContainer}>
                    <View style={[styles.radioButton, values.gender === 'Male' && styles.radioButtonSelected]} />
                    <Text style={styles.radioLabel}>Male</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setFieldValue('gender', 'Female')}>
                  <View style={styles.radioButtonContainer}>
                    <View style={[styles.radioButton, values.gender === 'Female' && styles.radioButtonSelected]} />
                    <Text style={styles.radioLabel}>Female</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              {errors.gender && touched.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

              <Text style={styles.label}>Name</Text>
              <TextInput
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                style={styles.input} />
              {errors.name && touched.name && <Text style={styles.errorText}>{errors.name}</Text>}

              <Text style={styles.label}>Middle Name</Text>
              <TextInput
                onChangeText={handleChange('middleName')}
                onBlur={handleBlur('middleName')}
                value={values.middleName}
                style={styles.input} />

              <Text style={styles.label}>Surname</Text>
              <TextInput
                onChangeText={handleChange('surname')}
                onBlur={handleBlur('surname')}
                value={values.surname}
                style={styles.input} />
              {errors.surname && touched.surname && <Text style={styles.errorText}>{errors.surname}</Text>}


            </View>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.submitButton, styles.backButton]}
                  onPress={handlePrevScreen}
                >
                  <Text style={styles.submitButtonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitButtonText}>Next</Text>
                </TouchableOpacity>
              </View></>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  prevScreen: {
    color: '#0066cc',
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    // marginTop:30,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    padding: 20,
    paddingBottom: 80, 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50, 
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pickerContainer: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: 'center',
  },
  picker: {
    height: 50,
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
  // buttonContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginTop: 30,
  // },
  backButton: {
    backgroundColor: '#cccccc',
  },
  submitButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 30, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 10, 
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
    color: '#000', 
    textDecorationLine: 'underline',
    textDecorationColor: '#0066cc',
    marginBottom: 20,
    textAlign: 'center',
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 8,
  },
  radioButtonSelected: {
    backgroundColor: '#000',
  },
  radioLabel: {
    fontSize: 16,
  },
  progressBarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});


export default PageOne;

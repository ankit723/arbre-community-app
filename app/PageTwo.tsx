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
import * as Yup from 'yup';
import ProgressBar from 'react-native-progress/Bar'; 

const { width: screenWidth } = Dimensions.get('window');

const PageTwo = ({ route, navigation }) => {
  const { formData } = route.params;

  const handlePrevScreen = (values) => {
    navigation.navigate('PageOne', { formData: values });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Formik
        initialValues={{ ...formData, fatherName: formData.middleName, fatherMiddleName: '', fatherSurnameName: formData.surname }}
        validationSchema={Yup.object({
          fatherName: Yup.string().required('Required'),
          fatherMiddleName: Yup.string(),
          fatherSurnameName: Yup.string().required('Required'),
        })}
        onSubmit={(values) => {
          console.log(values);
          navigation.navigate('PageThree', { formData: values });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View style={styles.formWrapper}>
              <Text style={styles.title}>Father Information</Text>
              <View style={styles.progressBarContainer}>
                <ProgressBar progress={0.33334} width={screenWidth / 2 - 40} />
              </View>

              <View style={styles.formContainer}>
                <Text style={styles.label}>Father Name</Text>
                <TextInput
                  onChangeText={handleChange('fatherName')}
                  onBlur={handleBlur('fatherName')}
                  value={values.fatherName}
                  style={styles.input} />
                {errors.fatherName && touched.fatherName && <Text style={styles.errorText}>{errors.fatherName}</Text>}

                <Text style={styles.label}>Father Middle Name</Text>
                <TextInput
                  onChangeText={handleChange('fatherMiddleName')}
                  onBlur={handleBlur('fatherMiddleName')}
                  value={values.fatherMiddleName}
                  style={styles.input} />

                <Text style={styles.label}>Father Surname</Text>
                <TextInput
                  onChangeText={handleChange('fatherSurnameName')}
                  onBlur={handleBlur('fatherSurnameName')}
                  value={values.fatherSurnameName}
                  style={styles.input} />
                {errors.fatherSurnameName && touched.fatherSurnameName && <Text style={styles.errorText}>{errors.fatherSurnameName}</Text>}
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
    marginTop:160,
  },
  formWrapper: {
    width: '90%',
    maxWidth: 600,
    alignSelf: 'center',
    padding: 20,
    flex: 1, 
  },
  formContainer: {
    marginTop: 30,
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
    marginBottom: 40, 
    width: '90%', 
    maxWidth: 600,
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
  title: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
  progressBarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default PageTwo;

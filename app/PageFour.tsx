import React from 'react';
import {
    StyleSheet,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { RadioButton } from 'react-native-paper';

const { width: screenWidth } = Dimensions.get('window');

const PageFour = ({ route, navigation }) => {
    const { formData } = route.params;

    const handlePrevScreen = (values) => {
        navigation.navigate('PageThree', { formData: values });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Formik
                initialValues={{ ...formData, designation: '' }}
                validationSchema={Yup.object({
                    designation: Yup.string().required('Required'),
                })}
                onSubmit={(values) => {
                    console.log(values);
                    navigation.navigate('PageFive', { formData: values });
                }}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    setFieldValue,
                    errors,
                    touched,
                }) => (
                    <View style={styles.innerContainer}>
                        <View style={styles.formWrapper}>
                            <Text style={styles.subtitle}>Teaching Details</Text>
                            <View style={styles.progressBarContainer}>
                                <ProgressBar progress={0.666668} width={screenWidth / 2 - 40} />
                            </View>
                            <View style={styles.formContainer}>
                                <Text style={styles.label}>Designation</Text>
                                <RadioButton.Group
                                    onValueChange={(value) => setFieldValue('designation', value)}
                                    value={values.designation}
                                >
                                    <View style={styles.radioContainer}>
                                        <RadioButton value="Assistant Primary" />
                                        <Text style={styles.radioText}>Assistant Primary</Text>
                                    </View>
                                    <View style={styles.radioContainer}>
                                        <RadioButton value="Assistant Upper Primary" />
                                        <Text style={styles.radioText}>Assistant Upper Primary</Text>
                                    </View>
                                    <View style={styles.radioContainer}>
                                        <RadioButton value="Head Primary" />
                                        <Text style={styles.radioText}>Head Primary</Text>
                                    </View>
                                    <View style={styles.radioContainer}>
                                        <RadioButton value="Head Upper-Primary" />
                                        <Text style={styles.radioText}>Head Upper-Primary</Text>
                                    </View>
                                </RadioButton.Group>
                                {errors.designation && touched.designation && (
                                    <Text style={styles.errorText}>{errors.designation}</Text>
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
                    </View>
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
        marginTop:210,
    },
    innerContainer: {
        flex: 1,
        width: '90%',
        maxWidth: 600,
        alignSelf: 'center',
    },
    formWrapper: {
        flex: 1, 
        padding: 20,
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
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    radioText: {
        fontSize: 16,
        marginLeft: 8,
    },
    errorText: {
        color: 'red',
        marginBottom: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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

export default PageFour;

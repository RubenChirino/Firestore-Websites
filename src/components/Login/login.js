import React from "react";
//import { Formik } from "formik";
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function Login(){

    const validateFields = values => {
        const errors = {};

        if(!values.username){
            errors.username = 'Required username';
        }
        
        if(!values.password){
            errors.password = 'Required password';
        } else if (values.password.length < 5){
            errors.password = "Length must be greater than 5"
        }

        return errors;
    }

    const handleSubmit = (values, {setFieldError}) => {
        return console.log(values).catch((err) => {
            setFieldError('username', 'Error');
        });
    }

    const initialValues = {
        username: '', 
        password: ''
    }

    return(
        <div className="form-group">
            <Formik 
            initialValues={initialValues} 
            validate={validateFields} 
            onSubmit={handleSubmit}>
                {
                    ({ errors, isSubmitting }) => <Form>
                        <Field placeholder="Username" name="username" /> 
                        <ErrorMessage name="username" component="small" />             

                        <Field placeholder="Password" name="password" />
                        <ErrorMessage name="password" component="small" />  
                     
                        <button className="btn" disabled={isSubmitting}>
                            Login
                        </button>
                    </Form>
                }
            </Formik>
        </div>
    )

}

/*

 {
                            errors.password && <small>{errors.password}</small>
                        }*/
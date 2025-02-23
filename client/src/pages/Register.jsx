import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, {useState} from 'react';


const validationSchema = Yup.object({
    username: Yup.string().required('Username Required'),
    password: Yup.string().min(5).max(100).required('Password must be at least 5 characters'),
    firstname: Yup.string().min(1).max(100).required('First Name Required'),
    lastname: Yup.string().min(1).max(100).required('Last Name Required')
});

const initialValues = {
    username: '',
    password: '',
    firstname: '',
    lastname: ''
};






export default function Register() {
    
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        axios.post("http://localhost:3001/users/register", data)
            .then(() => {
                navigate('/login');
            })
            .catch((err) => {
                console.error("Registration failed:", err.response?.data?.message || err.message);
            });
    
    };
    
    return (
        <div className="registration-form-container">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className="registration-form">
                    <div className="input-group">
                        <label htmlFor="username">Username:</label>
                        <ErrorMessage name="username" component="span" className="error-message" />
                        <Field
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            className="input-field"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <ErrorMessage name="password" component="span" className="error-message" />
                        <Field
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            className="input-field"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="firstname">First Name:</label>
                        <ErrorMessage name="firstname" component="span" className="error-message" />
                        <Field
                            id="firstname"
                            name="firstname"
                            placeholder="Enter your first name"
                            className="input-field"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="lastname">Last Name:</label>
                        <ErrorMessage name="lastname" component="span" className="error-message" />
                        <Field
                            id="lastname"
                            name="lastname"
                            placeholder="Enter your last name"
                            className="input-field"
                        />
                    </div>

                    <button type="submit" className="submit-btn">Register Now</button>
                </Form>
            </Formik>
        </div>
    );
}
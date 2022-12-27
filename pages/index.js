import Layout from "../components/Layout";
import { useState } from 'react';

import { useRouter } from 'next/router';
import { store } from "../container/store";
import { setAuthInformation } from "../container/Page/pageActions";
import { doLogin } from "../container/Users/usersAction";
import { useSelector } from "react-redux";


import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Formik } from "formik";
import { signInSchema } from "../constants/validator";
import Notification from "../components/common/Notification";

export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { users } = useSelector(state => state);

    const formSubmit = async (formData) => {
         console.log('formData===', formData);
        // return;
        // console.log('Password', password);
        // console.log('env variable ', process.env.JWT_SECRET);
        // const response = await fetch('http://localhost:3000/posts').then(response => response);

        if (formData.email && formData.password) {
            console.log('env variable ', process.env.JWT_SECRET);
            try {
                await store.dispatch(doLogin(formData.email, formData.password));
                //router.push('/dashboard');
                //return null;
            } catch (e) {
                console.log('e=========', e);
            }

        }
    }

    return (
        <Layout>
            
            <div className="container my-4">
               <Notification />

                <h1 className="h3 mb-3 fw-normal">Sign In</h1>
                <hr />
                <Formik
                    className="w-50 mx-auto"
                    validationSchema={signInSchema}
                    onSubmit={formSubmit}
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        isValid,
                        errors,
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" controlId="validationFormikUsername">
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup hasValidation>
                                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            placeholder="Email"
                                            aria-describedby="inputGroupPrepend"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" controlId="validationFormik03">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.password}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Button type="submit">Sign In</Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Layout>
    )
}

import Layout from "../components/Layout";

import { useRouter } from 'next/router';


import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Formik } from "formik";
import { signUpSchema } from "../constants/validator";
import { store } from "../container/store";
import { doSignUp } from "../container/Users/usersAction";
import Notification from "../components/common/Notification";

export default function SignUp() {
    const router = useRouter();
    const formSubmit = async (formData) => {
        console.log('formData=====', formData);
        store.dispatch(doSignUp(formData));
    }

    return (
        <Layout>
            <div className="container my-4">
            <Notification />

                <h1 className="h3 mb-3 fw-normal">Register for free</h1>
                <hr />
                <Formik
                    className="w-50 mx-auto"
                    validationSchema={signUpSchema}
                    onSubmit={formSubmit}
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        terms: false,
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
                                <Form.Group as={Col} md="6" controlId="validationFormik01">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        placeholder="John"
                                        isInvalid={!!errors.firstName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.firstName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationFormik02">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        placeholder="Doe"
                                        isInvalid={!!errors.lastName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.lastName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
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
                                <Form.Group as={Col} md="6" controlId="validationFormik03">
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
                                <Form.Group as={Col} md="6" controlId="validationFormik04">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Confirm Password"
                                        name="confirmPassword"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        isInvalid={!!errors.confirmPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    required
                                    name="terms"
                                    label="Agree to terms and conditions"
                                    onChange={handleChange}
                                    isInvalid={!!errors.terms}
                                    feedback={errors.terms}
                                    feedbackType="invalid"
                                    id="validationFormik0"
                                />
                            </Form.Group>
                            <Button type="submit">Register</Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Layout>
    )
}

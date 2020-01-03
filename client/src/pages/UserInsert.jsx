import React, { Component } from 'react'
import api from '../api'
import { Formik } from 'formik'
import { Form, Button } from 'react-bootstrap'
const emailValidator = require('email-validator')

class UserInsert extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fetched: false,
        }
    }

    componentDidMount = () => {
        api.getUserEmails().then(emails => {
            this.setState({
                emails: emails.data,
                fetched: true,
            })
        })
    }

    render() {
        const { emails } = this.state
        return (
            <div style={{ marginLeft: "100px" }}>
                <h1 style={{ paddingTop: "30px" }}>Create new user</h1> <br />
                {this.state.fetched
                    ? <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            phone: '',
                            password: '',
                            isAdmin: false,
                        }}
                        validate={values => {
                            const errors = {};
                            if (!values.name) {
                                errors.name = 'Required'
                            }
                            if (!values.email) {
                                errors.email = this.setState.emails
                            }
                            if (!emailValidator.validate(values.email)) {
                                errors.email = 'An invalid email address'
                            }
                            if (emails.some(e => e.email === values.email)) {
                                errors.email = 'This email is in database'
                            }
                            if (!values.phone) {
                                errors.phone = 'Required'
                            }
                            if (! /^\d+$/.test(values.phone)) {
                                errors.phone = 'Only digit can be used'
                            }
                            if (values.phone.length !== 9) {
                                errors.phone = 'Not correct phone'
                            }
                            if (!values.password) {
                                errors.password = 'Required'
                            }
                            if (!values.password.match(/[a-z]/g) ||
                                !values.password.match(/[A-Z]/g) ||
                                !values.password.match(/[0-9]/g) ||
                                values.password.length < 8) {
                                errors.password = 'Password must contain a lowercase and uppercase letters, number and minimum 8 characters'
                            }
                            return errors
                        }}
                        onSubmit={(values) => {
                            api.insertUser(values)
                            window.alert('User created successfully')
                        }}
                        render={({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting
                        }) => (
                                <Form onSubmit={handleSubmit} noValidate className="ml-5 mr-5">
                                    <Form.Group >
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            name='name'
                                            onChange={handleChange}
                                            value={values.name}
                                            isInvalid={!!errors.name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            name='email'
                                            onChange={handleChange}
                                            value={values.email}
                                            isInvalid={!!errors.email}
                                            type="email"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control
                                            name='phone'
                                            onChange={handleChange}
                                            value={values.phone}
                                            isInvalid={!!errors.phone}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.phone}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            name='password'
                                            onChange={handleChange}
                                            value={values.password}
                                            isInvalid={!!errors.password}
                                            type="password"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Check
                                        type='checkbox'
                                        name='isAdmin'
                                        value={values.isAdmin}
                                        checked={values.isAdmin}
                                        onChange={handleChange}
                                        label="Admin"
                                    />
                                    <br />
                                    <Button variant="primary" type='submit' className='mr-3'>Create</Button>
                                    <Button variant="secondary" href={'/users/list'}>Cancel</Button>
                                </Form>
                            )

                        }

                    />
                    : <p>Loading</p>
                }
            </div>
        )
    }
}

export default UserInsert
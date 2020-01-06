import React, { Component } from 'react'
import api from '../api'
import { Formik } from 'formik'
import { Form, Button } from 'react-bootstrap'

class UserUpdate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            fetched: false,
        }
    }

    componentDidMount = () => {
        const { id } = this.state
        api.getUserById(id).then(u => {
            this.setState({
                user: u.data,
                fetched: true,
            })
        })
    }

    render() {
        return (
            <div style={{marginLeft: "100px"}}>
                <h1 style={{paddingTop: "30px"}}>Edit user</h1> <br />
                {this.state.fetched
                    ? <Formik
                    initialValues={{
                        ...this.state.user
                    }}
                    validate={values => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = 'Required'
                        }
                        if (!values.phone) {
                            errors.phone = 'Required'
                        }
                        if (! /^\d+$/.test(values.phone)) {
                            errors.phone = 'Only digit can be used'
                        }
                        if (values.phone.length < 7) {
                            errors.phone = 'Not correct phone'
                        }
                        return errors
                    }}
                    onSubmit={(values) => {
                        api.updateUserById(this.state.id, values)
                        window.location.assign("/users/list")
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
                                        disabled="disabled"
                                    />
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

                                <Form.Check
                                    type='checkbox'
                                    name='isAdmin'
                                    value={values.isAdmin}
                                    checked={values.isAdmin}
                                    onChange={handleChange}
                                    label="Admin"
                                />
                                <br />
                                <Button variant="primary" type='submit' className='mr-3'>Update</Button>
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

export default UserUpdate

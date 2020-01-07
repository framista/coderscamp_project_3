import React, { Component } from 'react'
import api from '../api'
import { Formik } from 'formik'
import { Form, Button } from 'react-bootstrap'

class VehicleRouteInsert extends Component {

    render() {
        return (
            <div style={{ marginLeft: "100px" }}>
                <h1 style={{ paddingTop: "30px" }}>Create new vehicle Route</h1> <br />
                <Formik
                    initialValues={{
                        vehicle: '',
                        driver: '',
                        date: '',
                        starting: '',
                        destination: '',
                        km: '',
                        fuel: '',
                        isFinished: false,
                        comments: '',
                    }}
                    validate={values => {
                        const errors = {};
                        if (!values.vehicle) {
                            errors.vehicle = 'Required'
                        }
                        if (!values.driver) {
                            errors.driver = 'Required'
                        }
                        if (! /^\d+$/.test(values.km)) {
                            errors.km = 'Only digit can be used'
                        }
                        
                        if (! /^\d+$/.test(values.fuel)) {
                            errors.fuel = 'Only digit can be used'
                        }
                        return errors
                    }}
                    onSubmit={(values) => {
                        api.insertVehicleRoute(values)
                        window.alert('Vehicle Route created successfully')
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
                                    <Form.Label>Driver</Form.Label>
                                    <Form.Control
                                        name='driver'
                                        onChange={handleChange}
                                        value={values.brand}
                                        isInvalid={!!errors.brand}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.brand}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Vehicle</Form.Label>
                                    <Form.Control
                                        name='vehicle'
                                        onChange={handleChange}
                                        value={values.brand}
                                        isInvalid={!!errors.brand}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.brand}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        name='date'
                                        onChange={handleChange}
                                        value={values.plate}
                                        isInvalid={!!errors.plate}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.plate}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>From</Form.Label>
                                    <Form.Control
                                        name='starting'
                                        onChange={handleChange}
                                        value={values.brand}
                                        isInvalid={!!errors.brand}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.brand}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>To</Form.Label>
                                    <Form.Control
                                        name='destination'
                                        onChange={handleChange}
                                        value={values.brand}
                                        isInvalid={!!errors.brand}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.brand}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Distance in km</Form.Label>
                                    <Form.Control
                                        name='km'
                                        type='number'
                                        min="0"
                                        step="1"
                                        onChange={handleChange}
                                        value={values.number}
                                        isInvalid={!!errors.number}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.number}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Used fuel in litres</Form.Label>
                                    <Form.Control
                                        name='fuel'
                                        type='number'
                                        min="0"
                                        step="1"
                                        onChange={handleChange}
                                        value={values.number}
                                        isInvalid={!!errors.number}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.number}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Check
                                    type='checkbox'
                                    name='isFinished'
                                    value={values.isAvailable}
                                    checked={values.isAvailable}
                                    onChange={handleChange}
                                    label="Finished"
                                />
                                <br />
                                <Button variant="primary" type='submit' className='mr-3'>Create</Button>
                                <Button variant="secondary" href={'/vehicleRoutes/list'}>Cancel</Button>
                            </Form>
                        )

                    }

                />

            </div>
        )
    }
}

export default VehicleRouteInsert
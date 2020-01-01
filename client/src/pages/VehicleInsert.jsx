import React, { Component } from 'react'
import api from '../api'
import { Formik } from 'formik'
import { Form, Button } from 'react-bootstrap'

class VehicleInsert extends Component {

    state = {
        typeVehicles: ['Micro', 'Sedan', 'CUV', 'SUV', 'Coupe', 'Hatchback', 'Pickup',
            'VAN', 'Campervan', 'Mini Truck', 'Minivan', 'Truck', 'Big Truck', 'Bus'],
    }

    render() {
        return (
            <div className="ml-3">
                <h1 className="mt-5">Create new vehicle</h1> <br />
                <Formik
                    initialValues={{
                        brand: '',
                        type: 'Micro',
                        plate: '',
                        fuelType: 'Diesel',
                        productionYear: "2000",
                        number: 0,
                        isAvailable: false,
                    }}
                    validate={values => {
                        const errors = {};
                        if (!values.brand) {
                            errors.brand = 'Required'
                        }
                        if (!values.plate) {
                            errors.plate = 'Required'
                        }
                        if (! /^\d+$/.test(values.number)) {
                            errors.number = 'Only digit can be used'
                        }
                        if (! /^\d+$/.test(values.productionYear)) {
                            errors.productionYear = 'Only digit can be used'
                        }
                        return errors
                    }}
                    onSubmit={(values) => {
                        api.insertVehicle(values)
                        //post
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
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control
                                        name='brand'
                                        onChange={handleChange}
                                        value={values.brand}
                                        isInvalid={!!errors.brand}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.brand}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control as="select" name='type' onChange={handleChange} value={values.type}>
                                        {this.state.typeVehicles.map(typeVehicle =>
                                            <option key={typeVehicle} value={typeVehicle}>{typeVehicle}</option>
                                        )}
                                    </Form.Control>
                                </Form.Group >

                                <Form.Group >
                                    <Form.Label>Plate</Form.Label>
                                    <Form.Control
                                        name='plate'
                                        onChange={handleChange}
                                        value={values.plate}
                                        isInvalid={!!errors.plate}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.plate}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Production year</Form.Label>
                                    <Form.Control
                                        name='productionYear'
                                        type='number'
                                        min="1980"
                                        max="2020"
                                        step="1"
                                        onChange={handleChange}
                                        value={values.productionYear}
                                        isInvalid={!!errors.productionYear}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.productionYear}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Fuel type</Form.Label>
                                    <Form.Control as="select" name="fuelType" onChange={handleChange} value={values.fuelType}>
                                        <option value="Gasoline">Gasoline</option>
                                        <option value="Diesel">Diesel</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Number</Form.Label>
                                    <Form.Control
                                        name='number'
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
                                    name='isAvailable'
                                    value={values.isAvailable}
                                    checked={values.isAvailable}
                                    onChange={handleChange}
                                    label="Available"
                                />
                                <br />
                                <Button variant="primary" type='submit' className='mr-3'>Create</Button>
                                <Button variant="secondary" href={'/vehicles/list'}>Cancel</Button>
                            </Form>
                        )

                    }

                />

            </div>
        )
    }
}

export default VehicleInsert
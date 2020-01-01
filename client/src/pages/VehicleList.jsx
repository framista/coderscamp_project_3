import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'
import styled from 'styled-components'
import 'react-table/react-table.css'
import { Button } from 'react-bootstrap'


const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
    margin-top: 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

const Add = styled.div`
    right: 50px;
    position: absolute;
    margin-top: 10px;
`

class DeleteVehicle extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do you want to detele the vehicle ${this.props.plate} permanently?`
            )
        ) {
            api.deleteVehicleById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class UpdateVehicle extends Component {
    updateUser = event => {
        event.preventDefault()
        window.location.href = `/vehicles/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class VehicleList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            vehicles: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = () => {
        this.setState({ isLoading: true })
        api.getAllVehicles().then(vehicles => {
            this.setState({
                vehicles: vehicles.data,
                isLoading: false,
            })
        })

    }

    render() {
        const { vehicles, isLoading } = this.state

        const columns = [
            {
                Header: 'Brand',
                accessor: 'brand',
            },
            {
                Header: 'Type',
                accessor: 'type',
            },
            {
                Header: 'Plate',
                accessor: 'plate',
            },
            {
                Header: 'Fuel type',
                accessor: 'fuelType',
            },
            {
                Header: 'Production year',
                accessor: 'productionYear',
            },
            {
                Header: 'Number',
                accessor: 'number',
            },
            {
                Header: 'Available',
                accessor: 'isAvailable',
                Cell: (props) => props.value.toString()
            },
            {
                Header: 'Delete',
                accessor: '',
                Cell: function (props) {
                    return (
                        <span>
                            <DeleteVehicle id={props.original._id} />
                        </span>
                    )
                }
            },
            {
                Header: 'Update',
                accessor: '',
                Cell: function (props) {
                    return (
                        <span>
                            <UpdateVehicle id={props.original._id} />
                        </span>
                    )
                }
            },
        ]

        let showTable = true
        if (!vehicles.length) {
            showTable = false
        }

        return (
            <Wrapper>
                <h1>Vehicles</h1>
                {showTable && (
                    <ReactTable
                        data={vehicles}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
                <Add>
                    <Button variant="primary" style={{fontSize: "30px"}} href={'/vehicles/create'}>+</Button>
                </Add>
            </Wrapper>
        )
    }
}

export default VehicleList
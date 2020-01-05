import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'
import styled from 'styled-components'
import 'react-table/react-table.css'
import { Button } from 'react-bootstrap'


const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
    margin-left: 70px
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

class DeleteVehicleRoute extends Component {
    deleteVehicleRoute = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do you want to detele the vehicle permanently?`
            )
        ) {
            api.deleteVehicleRouteById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteVehicleRoute}>Delete</Delete>
    }
}

class UpdateVehicleRoute extends Component {
    updateVehicleRoute = event => {
        event.preventDefault()
        window.location.href = `/vehicleRoutes/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateVehicleRoute}>Update</Update>
    }
}

class VehicleRouteList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            vehicleRoutes: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = () => {
        this.setState({ isLoading: true })
        api.getAllVehicleRoutes().then(vehicleRoutes => {
            this.setState({
                vehicleRoutes: vehicleRoutes.data,
                isLoading: false,
            })
        })

    }

    render() {
        const { vehicleRoutes, isLoading } = this.state

        const columns = [
            {
                Header: 'Vehicle',
                accessor: 'vehicle',
            },
            {
                Header: 'Driver',
                accessor: 'driver',
            },
            {
                Header: 'Route',
                accessor: 'starting',
            },
            {
                Header: 'Status',
                accessor: 'isFinished',
                Cell: (props) => props.value.toString()
            },
            {
                Header: 'Update',
                accessor: '',
                Cell: function (props) {
                    return (
                        <span>
                            <UpdateVehicleRoute id={props.original._id} />
                        </span>
                    )
                }
            },
            {
                Header: 'Delete',
                accessor: '',
                Cell: function (props) {
                    return (
                        <span>
                            <DeleteVehicleRoute id={props.original._id} />
                        </span>
                    )
                }
            },
        ]

        let showTable = true
        if (!vehicleRoutes.length) {
            showTable = false
        }

        return (
            <Wrapper>
                <h1 style={{paddingTop: "30px"}}>Vehicle Routes</h1>
                {showTable && (
                    <ReactTable
                        data={vehicleRoutes}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
                <Add>
                    <Button variant="primary" style={{fontSize: "30px"}} href={'/vehicleRoutes/create'}>+</Button>
                </Add>
            </Wrapper>
        )
    }
}

export default VehicleRouteList
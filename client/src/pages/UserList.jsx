import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'
import styled from 'styled-components'
import 'react-table/react-table.css'
import { Button } from 'react-bootstrap'
const moment = require('moment')

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

class DeleteUser extends Component {
    deleteUser = event => {
        event.preventDefault()
        if (
            window.confirm(
                `Do you want to detele the user permanently?`
            )
        ) {
            api.deleteUserById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class UpdateUser extends Component {
    updateUser = event => {
        event.preventDefault()
        window.location.href = `/users/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = () => {
        this.setState({ isLoading: true })
        api.getAllUsers().then(users => {
            this.setState({
                users: users.data,
                isLoading: false,
            })
        })

    }

    render() {
        const { users, isLoading } = this.state

        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Phone',
                accessor: 'phone',
            },
            {
                Header: 'Created',
                accessor: 'lastActiveAt',
                Cell: props => moment(props.value).format("DD-MM-YYYY")
            },
            {
                Header: 'Admin',
                accessor: 'isAdmin',
                Cell: (props) => props.value.toString()
            },
            {
                Header: 'Update',
                accessor: '',
                Cell: function (props) {
                    return (
                        <span>
                            <UpdateUser id={props.original._id} />
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
                            <DeleteUser id={props.original._id} />
                        </span>
                    )
                }
            },
        ]

        let showTable = true
        if (!users.length) {
            showTable = false
        }

        return (
            <Wrapper>
                <h1 style={{paddingTop: "30px"}}>Users</h1>
                {showTable && (
                    <ReactTable
                        data={users}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
                <Add>
                    <Button variant="primary" style={{fontSize: "30px"}} href={'/users/create'}>+</Button>
                </Add>
            </Wrapper>
        )
    }
}

export default UserList
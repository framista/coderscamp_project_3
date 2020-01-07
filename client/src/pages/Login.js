import React, { Component } from 'react';
import axios from 'axios';
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import "./Login.css";


class Login extends Component {
    constructor(props) {
        super(props);
        localStorage.removeItem('key-jwt');
        this.state = {
            email: '',
            password: '',
            error: ''
        };
    }

    change(e) {
        console.log(e.target.name)
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submit(e) {
        e.preventDefault();
        console.log(this.state.email)
        console.log(this.state.password)
        axios.post('http://localhost:5000/api/auth', {
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            localStorage.setItem('key-jwt', res.data);
            this.props.history.push('/vehicles/list')
        }).catch(() => this.setState({
            error: true
        }));
    }

    render() {
        const { error } = this.state;
        return (
            <div className="Login">
                <form onSubmit={e => this.submit(e)}>
                    <FormGroup controlId="email" >
                        <Form.Label>Email</Form.Label>
                        <FormControl
                            autoFocus
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={e => this.change(e)}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" >
                        <Form.Label>Password</Form.Label>
                        <FormControl
                            value={this.state.password}
                            onChange={e => this.change(e)}
                            type="password"
                            name="password"
                        />
                    </FormGroup>
                    <Button type="submit">
                        Log in
                    </Button>
                    {error && <p>Invalid credentials</p>}
                </form>
            </div>
        );
    }

}

export default Login;
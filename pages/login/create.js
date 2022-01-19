import NavBar from "../../components/nav";
import React, {Component} from "react";
import Head from "next/head";
import toast from 'react-hot-toast';
import * as api from "../../util/api";

export default class Login_Create extends Component {

    state = {
        username: null,
        password: null,
        email: null,
        clicked: true,
        captchaAllowed: true
    }

    componentDidMount() {
        this.username = this.username.bind(this);
        this.email = this.email.bind(this);
        this.password = this.password.bind(this);
        this.submit = this.submit.bind(this);

        this.setState({clicked: false});

        // check if user is logged in
        if (sessionStorage.getItem("user")) {
            window.location.href = "/dash"
        }
    }

    username = event => {
        this.setState({username: event.target.value});
    }

    password = event => {
        this.setState({password: event.target.value});
    }

    email = event => {
        this.setState({email: event.target.value});
    }

    async submit() {
        this.setState({clicked: false});
        let error = false;
        if (!this.state.username) {
            toast.error("Please provide a name")
            error = true;
        }

        if (!this.state.email) {
            if (!error) {
                toast.error("Please provide a Email")
                error = true;
            }
        }

        if (!this.state.password) {
            if (!error) {
                toast.error("Please provide a Password")
                error = true;
            }
        } else {
            if (this.state.password.length < 6) {
                if (!error) {
                    toast.error("Please provide a Longer Password")
                    error = true;
                }
            }
        }

        if (!error) {
            // submit
            const toastId = toast.loading('Sending request...');

            let data = {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
            };

            try {
                let res = await api.userCreate(data);
                console.log(res)
                if (res.error) {
                    toast.error(`API Error: ${res.message}`, {
                        id: toastId,
                    });
                    this.setState({buttonClicked: false});
                } else {
                    // save data and user is logged in now
                    if (res.message === "OK") {

                        sessionStorage.setItem("user", JSON.stringify(res.data));

                        window.location.href = "/dash"
                    }
                }
            } catch (e) {
                toast.error(`API Error, Please try again later`, {
                    id: toastId,
                });
            }

        }
    }

    render() {
        const {captchaAllowed} = this.state;
        return (
            <>
                <Head>
                    <title> Testing | Create Account </title>

                </Head>

                <NavBar/>

                <div className={'con'}>
                    <div className="form">
                        <div className="title">Welcome</div>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <div className="subtitle">Let's create your account!</div>
                        <div className="input-container ic1">
                            <input onChange={this.username} id="username" className="input" type="text" placeholder=" "/>
                            <div className="cut"></div>
                            <label htmlFor="username" className="placeholder">User name</label>
                        </div>
                        <div className="input-container ic2">
                            <input onChange={this.email} id="email" className="input" type="text" placeholder=" "/>
                            <div className="cut cut-short"></div>
                            <label htmlFor="email" className="placeholder">Email</label>
                        </div>
                        <div className="input-container ic2">
                            <input onChange={this.password} type="password" id="password" className="input" placeholder=" "/>
                            <div className="cut cut-short"></div>
                            <label htmlFor="password" className="placeholder">Password</label>
                        </div>

                        <br/>

                        <button onClick={this.submit} type="text" className="submit">Submit
                        </button>
                    </div>
                </div>

            </>
        )
    }
}
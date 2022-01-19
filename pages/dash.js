import Head from 'next/head'
import NavBar from "../components/nav";
import {Component} from "react";

export default class Index extends Component {

    state = {
       user: null
    }

    componentDidMount() {
        if(sessionStorage.getItem("user")) {
            try {
                let userInfo = sessionStorage.getItem("user");
                userInfo = JSON.parse(userInfo);
                this.setState({user:userInfo});

            } catch (e) {
                window.location.href = "/login?e=" + e
            }
        } else {
            window.location.href = "/login"
        }
    }

    render() {
        const {user} = this.state;
        return (
            <div>
                <Head>
                    <title>NextJS Login Example</title>
                    <meta name="description" content="Generated by create next app" />
                </Head>

                <NavBar/>

                <h1 style={{'color':"#fff"}} >Hello, {user ? user.name : "Need Auth"}</h1>

            </div>
        )
    }
}

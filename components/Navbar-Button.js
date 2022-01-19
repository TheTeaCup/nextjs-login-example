import React from "react";

export default class Button extends React.Component {
    state = {
        loggedIn: false
    }

    componentDidMount() {
        if (sessionStorage.getItem("user")) {
            this.setState({loggedIn: true});

        }
    }

    render() {
        const {loggedIn} = this.state;
        return (
            <>
                {loggedIn ? (
                    <>
                        <a href={"/dash"}>
                            <button className="btn navbar-btn">
                                <i className="fas fa-sign-in-alt"/> Dashboard
                            </button>
                        </a>
                    </>
                ) : (
                    <>
                        <a href={"/login"}>
                            <button className="btn navbar-btn">
                                <i className="fas fa-sign-in-alt"/> Sign In
                            </button>
                        </a>
                    </>
                )}
            </>
        );

    }
}
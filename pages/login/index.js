import React, {Component} from "react";
import NavBar from "../../components/nav";
import styled from "styled-components";
import Head from "next/head";
import * as api from "../../util/api";

export default class Index extends Component {

    state = {
        email: null,
        password: null,
        error: false,
        message: false,
        loginClicked: false,
        state: "/panel",
        awaiting: false
    }

    componentDidMount() {
        this.loginVer = this.loginVer.bind(this);
        this.password = this.password.bind(this);
        this.email = this.email.bind(this);
        this.setState({awaiting: true})

        // check if user is logged in
        if (sessionStorage.getItem("user")) {
            window.location.href = "/dash"
        }

    }

    password = event => {
        this.setState({password: event.target.value});
    }

    email = event => {
        this.setState({email: event.target.value});
    }

    async  loginVer() {

        this.setState({awaiting: true})

        if (!this.state.email) {
            this.setState({error: true, message: "Please provide a email address"});
            setTimeout(() => {
                this.setState({error: false});
            }, 4000)
        } else if (!this.state.password) {
            this.setState({error: true, message: "Please provide a password"});
            setTimeout(() => {
                this.setState({error: false});
            }, 4000)
        } else {
            this.setState({loginClicked: true});
            // attempt to login
            let data = {
                username: this.state.email,
                password: this.state.password
            };

            try {
                let response = await api.userLogin(data);
                console.log(response);

                if (response.message === "OK") {


                    sessionStorage.setItem("user", JSON.stringify(response.data));

                    window.location.href = "/dash"
                }

                if (response.error) {
                    if (response.message === "no user found") {
                        this.setState({error: true, message: 'No user was found', loginClicked: false});
                    }

                    if (response.message === "incorrect password") {
                        this.setState({
                            error: true,
                            message: 'The password you interred is incorrect.',
                            loginClicked: false
                        });
                    }

                    if (response.message === "DB error") {
                        this.setState({
                            error: true,
                            message: 'Database error please try again later',
                            loginClicked: false
                        });
                    }
                }
            } catch (e) {
                this.setState({
                    error: true,
                    message: 'API Error Please try again later.',
                    loginClicked: false
                });
            }
        }

    }

    render() {
        const {error, message, loginClicked, state} = this.state;

        return (
            <>
                <Head>
                    <title>Testing | Login</title>

                </Head>

                <NavBar/>

                <HomePage>
                    <Cube>

                        <Title>Testing - Login</Title>

                        <Center>
                            <Form>

                                <center>

                                    {error ? (
                                        <ErrorCon>
                                            {message}
                                        </ErrorCon>
                                    ) : (
                                        <></>
                                    )}

                                    <div className="input-group">
                                        <input type="text" onChange={this.email} name="" id="email"/>
                                        <label htmlFor="email">Email</label>
                                    </div>

                                    <div className="input-group">
                                        <input type="password" onChange={this.password} name="" id="password"/>
                                        <label htmlFor="password">Password</label>
                                    </div>


                                    <OtherDiv>
                                        {loginClicked ? (
                                            <LoginButtonClicked disabled={true}>
                                                Login
                                            </LoginButtonClicked>
                                        ) : (
                                            <LoginButton onClick={this.loginVer}>Login</LoginButton>
                                        )}

                                        <CreateButton onClick={(event) => {
                                            event.preventDefault();
                                            window.location.href = '/login/create'
                                        }}>Create Account</CreateButton>

                                    </OtherDiv>

                                </center>

                            </Form>
                        </Center>

                    </Cube>
                </HomePage>

            </>
        )

    }

}


const HomePage = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  margin-top: 50px;
`;

const Cube = styled.div`
  background-color: #203647;
  width: 50%;
  @media screen and (max-width: 1000px) {
    width: 90%;
  }
  padding: 3rem;
  --tw-bg-opacity: 1;
  border-radius: 0.5rem;
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  text-align: center;
  position: relative;
`

const Title = styled.h2`
  color: rgba(255, 255, 255, 0.5);
  font-weight: 700;
  font-size: 2.25rem;
  line-height: 2.5rem;
`

const Desc = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 0.5rem;
`

const Center = styled.div`
  -webkit-box-pack: center;
  justify-content: center;
`

const Form = styled.form`
  /*  margin-left: 20px;
  
    @media screen and (max-width: 1000px) {
      max-width: unset;
      min-width: unset;
      width: 100%;
      
      margin-left: unset;
    }
    
    max-width: 80%;
    min-width: 50%;*/
`


const LoginButton = styled.div`
  border-radius: 4px;
  outline: none;
  border: none;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  background-color: #007CC7;
  transition: all 0.2s ease-in-out;
  padding: 10px 22px;
  text-decoration: none;
  width: 50%;
  @media screen and (max-width: 1000px) {
    width: unset;
  }

  :hover {
    transition: all 0.2s ease-in-out;
    background-color: #0f8fe0;
  }
`

const ErrorCon = styled.div`
  background-color: brown;
  border-radius: 15px;
  padding: 1em;
  width: 50%;
  margin: 20px;
  color: #fff;
  @media screen and (max-width: 1000px) {
    width: unset;
  }
`

const LoginButtonClicked = styled.div`
  border-radius: 4px;
  outline: none;
  border: none;
  font-size: 18px;
  color: #fff;
  cursor: not-allowed;
  background-color: #0d78bb;
  transition: all 0.2s ease-in-out;
  padding: 10px 22px;
  text-decoration: none;
  width: 50%;
  @media screen and (max-width: 1000px) {
    width: unset;
  }
`

const OtherDiv = styled.div`
  display: inline;
`

const Discord = styled.button`
  border-radius: 4px;
  outline: none;
  border: none;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  background-color: #5865F2;
  transition: all 0.2s ease-in-out;
  padding: 10px 22px;
  text-decoration: none;
  margin: 5px;

  :hover {
    transition: all 0.2s ease-in-out;
    background-color: #606bef;
  }
`

const Github = styled.button`
  border-radius: 4px;
  outline: none;
  border: none;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  background-color: #363535;
  transition: all 0.2s ease-in-out;
  padding: 10px 22px;
  text-decoration: none;
  margin: 5px;

  :hover {
    transition: all 0.2s ease-in-out;
    background-color: #363535;
  }
`

const HR = styled.hr`
  width: 50%;
`

const GithubDisabled = styled.button`
  border-radius: 4px;
  outline: none;
  border: none;
  font-size: 18px;
  color: #fff;
  cursor: not-allowed;
  transition: all 0.2s ease-in-out;
  padding: 10px 22px;
  text-decoration: none;
  margin: 5px;
  background-color: #363535;
`

const CreateButton = styled(LoginButton)`  border-radius: 4px;
  outline: none;
  border: none;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: 10px 22px;
  text-decoration: none;
  margin: 5px;
`

const PSButton = styled(LoginButton)`
  background-color: rgba(255, 255, 255, 0.5);
  margin: 5px;

  :hover {
    transition: all 0.2s ease-in-out;
    background-color: rgba(255, 255, 255, 0.6);
  }
`
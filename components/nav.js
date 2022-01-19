import React, {useState} from "react";
import Button from "./Navbar-Button";
import Mobile_Button from "./Navbar-Button-Mobile";
import styled from "styled-components";


function Navbar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);


    return (
        <>
            <Nav>
                <NavName href="/">
                    Testing
                </NavName>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? "fas fa-times" : "fas fa-bars"}/>
                </div>
                <ul id="mobile" className={click ? "nav-menu active" : "nav-menu"}>

                    <NavItem>
                        <NavLink href="/pricing" onClick={closeMobileMenu}>
                            Pricing
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink href="/discord" target={"_about"} onClick={closeMobileMenu}>
                            Discord
                        </NavLink>
                    </NavItem>

                    <li>
                        <Mobile_Button/>
                    </li>
                </ul>
                <Button/>
            </Nav>
        </>
    );
}

export default Navbar;

const Nav = styled.nav`
  background: #21517D;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
`

const NavName = styled.a`
  color: #fff;
  justify-self: start;
  margin-left: 20px;
  cursor: pointer;
  text-decoration: none;
  font-size: 2rem;
  font-family: "Monoid Bold", Fallback, sans-serif;
  @media screen and (max-width: 960px) {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(25%, 50%);
  }
`

const NavItem = styled.li`
  display: flex;
  align-items: center;
  height: 80px;
`

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;

  :hover {
    background-color: transparent;
    border-radius: 4px;
    transition: all 0.2s ease-out;
  }

  @media screen and (max-width: 960px) {
    text-align: center;
    padding: 2rem;
    width: 100%;
    display: table;
    :hover {
      background-color: transparent;
      border-radius: 0;
    }
  }
`
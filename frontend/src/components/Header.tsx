import styled, { css } from "styled-components";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/argentBankLogo.png";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { resetAuth, selectUser } from "../features/authSlice";
import type React from "react";


const Navigation = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 20px;

    a {
        font-weight: bold;
        color: #2c3e50;
    }


`;

const NavLogo = styled(Link)`
    display: flex;
    align-items: center;

    img {
        max-width: 100%;
        width: 200px;
    }
`;
const NavLinks = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
`;

const LinkStyle = css`
    display: flex;
    gap: 5px;
    text-decoration: none;
    margin-right: 0.5rem;

    &.active {
        color: #42b983;
    }

    &:hover {
        text-decoration: underline;
    }
`;
const NavLinkItem = styled(NavLink)`
    ${LinkStyle}
`;

const LinkItem = styled.a`
    ${LinkStyle}
`;


const Header = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);

    const handleLogout = (event: React.SyntheticEvent) => {
        event.preventDefault();
        dispatch(resetAuth());
        navigate("/login");
    };


    return (
        <header>
            <Navigation>
                <NavLogo to="/">
                    <img alt="Argent Bank Logo" src={logo}/>
                    <h1 className="sr-only">Argent Bank</h1>
                </NavLogo>
                <NavLinks>
                    {user ? (
                        <>
                            <NavLinkItem to="/profile">
                                <i className="fa fa-user-circle"></i>
                                {user.firstName}
                            </NavLinkItem>
                            <LinkItem href="" onClick={handleLogout}>
                                <i className="fa fa-sign-out"></i>
                                Sign Out
                            </LinkItem>
                        </>
                    ) : (
                        <NavLinkItem to="/login">
                            <i className="fa fa-user-circle"></i>
                            Sign In
                        </NavLinkItem>
                    )}
                </NavLinks>
            </Navigation>
        </header>
    );
};

export default Header;
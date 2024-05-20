import { MainContainer } from "../../App";
import styled from "styled-components";

import type React from "react";
import { useEffect, useState } from "react";
import { useGetUserProfileQuery, useLoginMutation } from "../../services/userApi";
import { useNavigate } from "react-router-dom";
import { selectToken, setToken, setUser } from "../../features/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";


const LoginSection = styled.section`
    box-sizing: border-box;
    background-color: white;
    width: 300px;
    margin: 3rem auto 0;
    padding: 2rem;

    h1 {
        font-size: 1.5rem;
        font-weight: 700;
    }

    svg {
        font-size: 5rem;
    }
`;
const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 1rem;

    label {
        font-weight: bold;
    }

    input {
        padding: 5px;
        font-size: 1.2rem;
    }
`;
const InputRemember = styled.div`
    display: flex;

    label {
        margin-left: 0.25rem;
    }
`;
const SignInBtn = styled.button<{ $error: boolean }>`
    display: block;
    width: 100%;
    padding: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    margin-top: 1rem;
    border-color: ${props => !props.$error ? "#00bc77" : "red"};
    background-color: ${props => !props.$error ? "#00bc77" : "red"};
    color: #fff;
`;

const Login = () => {
    const [error, setError] = useState(false);

    const [formState, setFormState] = useState<{ email: string, password: string }>({
        email: "tony@stark.com",
        password: "password123",
    });

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const token = useAppSelector(selectToken);

    const {data: userData, isLoading} = useGetUserProfileQuery(undefined, {
        skip: !token,
        refetchOnMountOrArgChange: true,
    });

    const [login] = useLoginMutation();

    const handleLogin = async (event: React.SyntheticEvent) => {
        setError(false);
        event.preventDefault();
        try {
            const {token} = await login(formState).unwrap();
            dispatch(setToken({token}));
        } catch (err) {
            console.error("Login failed", err);
            setError(true);
        }
    };

    useEffect(() => {
        if (token && userData) {
            dispatch(setUser(userData));
            navigate("/profile");
        }
    }, [dispatch, navigate, token, userData]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <MainContainer $dark={true}>
            <LoginSection>
                <i className="fa fa-user-circle"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleLogin}>
                    <InputWrapper>
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={(e) => setFormState((prevState: any) => ({...prevState, email: e.target.value}))}
                            id="username"
                            value={formState.email}
                            type="text"/>
                    </InputWrapper>
                    <InputWrapper>
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => setFormState((prevState: any) => ({
                                ...prevState,
                                password: e.target.value,
                            }))}
                            id="password"
                            value={formState.password}
                            type="password"/>
                    </InputWrapper>
                    <InputRemember>
                        <input id="remember-me" type="checkbox"/>
                        <label htmlFor="remember-me">Remember me</label
                        >
                    </InputRemember>
                    <SignInBtn type="submit" $error={error}>{!error ? "Sign In" : "Try Again !"}</SignInBtn>
                </form>
            </LoginSection>
        </MainContainer>
    );
};

export default Login;
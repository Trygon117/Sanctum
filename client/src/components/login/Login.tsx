import { useSelector, useDispatch } from "react-redux";
import "./login.css";
import { useState } from "react";
import * as query from "../../functions/query";
import { setAccount } from "../../store/page/pageSlice";

const Login = (props) => {
    const lightMode = useSelector((state: any) => state.page.lightMode);
    const [formMode, setFormMode] = useState("login");
    const dispatch = useDispatch();

    const submit = (e) => {
        e.preventDefault();

        const email = e.target.querySelector('#email') ? e.target.querySelector('#email').value : null;
        const username = e.target.querySelector('#username').value;
        const password = e.target.querySelector('#password').value;
        const password2 = e.target.querySelector('#password2') ? e.target.querySelector('#password2').value : null;

        console.log(e.target.action, email, username, password, password2);

        if (username && password && (e.target.action.includes('/login') || (e.target.action.includes('/signup') && password2 && email))) {
            if (e.target.action.includes('/login') || (password === password2)) {
                const data = { email, username, password, password2 };

                query.POST(e.target.action, data)
                    .then((data) => {
                        console.log(data);
                        dispatch(setAccount(data.account));
                    });
            } else {
                console.log("Missing Credentials");
            }
        }
    }

    return (
        formMode === "login" ?
            <div className={lightMode ? "login-box" : "login-box dark"}>
                <form id="LoginForm" className={lightMode ? "form" : "form dark"} name="loginForm" onSubmit={submit} action="/login">
                    <span className="form-title">Login</span>

                    <span className="form-field">
                        <label className="form-label" htmlFor="username">Username or Email</label>
                        <input className="form-input" id="username" type="text" name="username" defaultValue={""}
                            onChange={(e) => {
                                if (e.target.parentElement) {
                                    e.target.value.length > 0 ?
                                        e.target.parentElement.classList.add('has-content')
                                        :
                                        e.target.parentElement.classList.remove('has-content');
                                }
                            }} />
                    </span>

                    <span className="form-field">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input className="form-input" id="password" type="password" name="password" defaultValue={""}
                            onChange={(e) => {
                                if (e.target.parentElement) {
                                    e.target.value.length > 0 ?
                                        e.target.parentElement.classList.add('has-content')
                                        :
                                        e.target.parentElement.classList.remove('has-content');
                                }
                            }} />
                    </span>

                    <span className="form-footer">
                        <div className="form-link" onClick={() => setFormMode('create')}>Create Account</div>
                        <input className="form-submit" type="submit" value='Log In' />
                    </span>
                </form>
            </div>
            :
            <div className={lightMode ? "login-box" : "login-box dark"}>
                <form id="LoginForm" className={lightMode ? "form" : "form dark"} name="loginForm" onSubmit={submit} action="/signup">
                    <span className="form-title">Create an Account</span>

                    <span className="form-field">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input className="form-input" id="email" type="email" name="email" pattern='/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/' defaultValue={""}
                            onChange={(e) => {
                                if (e.target.parentElement) {
                                    e.target.value.length > 0 ?
                                        e.target.parentElement.classList.add('has-content')
                                        :
                                        e.target.parentElement.classList.remove('has-content');
                                }
                            }} />
                    </span>

                    <span className="form-field">
                        <label className="form-label" htmlFor="username">Username</label>
                        <input className="form-input" id="username" type="text" name="username" pattern='/^[A-Za-z0-9_\-.]{1,16}$/' defaultValue={""}
                            onChange={(e) => {
                                if (e.target.parentElement) {
                                    e.target.value.length > 0 ?
                                        e.target.parentElement.classList.add('has-content')
                                        :
                                        e.target.parentElement.classList.remove('has-content');
                                }
                            }} />
                    </span>

                    <span className="form-field">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input className="form-input" id="password" type="password" name="password" pattern='/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/' defaultValue={""}
                            onChange={(e) => {
                                if (e.target.parentElement) {
                                    e.target.value.length > 0 ?
                                        e.target.parentElement.classList.add('has-content')
                                        :
                                        e.target.parentElement.classList.remove('has-content');
                                }
                            }} />
                    </span>

                    <span className="form-field">
                        <label className="form-label" htmlFor="password2">Re-Enter Password</label>
                        <input className="form-input" id="password2" type="password" name="password2" pattern='/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/' defaultValue={""}
                            onChange={(e) => {
                                if (e.target.parentElement) {
                                    e.target.value.length > 0 ?
                                        e.target.parentElement.classList.add('has-content')
                                        :
                                        e.target.parentElement.classList.remove('has-content');
                                }
                            }} />
                    </span>

                    <span className="form-footer">
                        <div className="form-link" onClick={() => setFormMode('login')}>Log In</div>
                        <input className="form-submit" type="submit" value='Sign Up' />
                    </span>
                </form>
            </div>
    );
}

export default Login;
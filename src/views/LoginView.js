import { Link } from "react-router-dom";
import { Layouts } from "../layouts";
import logo from "../assets/img/logo.png";
import { Components } from "../components";
import { useState } from "react";
import { Services } from '../services';
import { Utils } from "../utils";

export function LoginView(props) {
    let abortController = new AbortController();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        setIsDisabled(true);
        setErrorMessages([]);

        try {
            const payload = {
                email, password
            };
            
            const {admin, tk} = await Services.AuthService.login(
                JSON.stringify(payload), abortController.signal);

            Utils.Auth.setUser(admin);
            Utils.Auth.setSessionToken(tk);
            window.location.replace('/');
        } catch (error) {
            if ('messages' in error)
                error.messages.then(messages => setErrorMessages(messages));
        }finally{setIsDisabled(false)}
    }
    return (
        <Layouts.AuthLayout>
            <div className="signin-box">
                <h2 className="slim-logo">
                    <Link to="/">
                        <img src={logo} alt="Novaworkonline logo" width="80"/>
                    </Link>
                </h2>
                <h2 className="signin-title-primary">Bienvenu!</h2>
                <h3 className="signin-title-secondary">Connectez-vous pour continuer.</h3>
                <Components.ErrorMessages >
                    {errorMessages}
                </Components.ErrorMessages>
                <Components.LoginForm handleFormSubmit={handleFormSubmit} isDisabled={isDisabled}
                email={email} password={password} setEmail={setEmail} setPassword={setPassword}/>
            </div>
        </Layouts.AuthLayout>
    )
}
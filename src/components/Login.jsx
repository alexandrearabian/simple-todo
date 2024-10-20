// Login.jsx
import { useState } from "react";
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from "../firebase/authentication"; // your auth methods
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);

    const handleEmailSignIn = () => {
        signInWithEmail(email, password);
    };

    const handleEmailSignUp = () => {
        signUpWithEmail(email, password);
    };

    return (
        <div className="login-container">
            <h1>
                Welcome to your simple <span style={{ color: 'var(--mainColor)' }}>to-do </span>list!
            </h1>



            <div className="email-section">
                <input
                    className="input-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    className="input-email"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />



                {isSignUp ? (
                    <button className="sign-in-email" onClick={handleEmailSignUp}>Sign Up</button>
                ) : (
                    <button className="sign-in-email" onClick={handleEmailSignIn}>Sign In</button>
                )}

                <button className="sign-in-google" onClick={signInWithGoogle}>
                    <FontAwesomeIcon icon={faGoogle} />  Sign in with Google
                </button>

                {/* <p onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? "Already have an account? Sign in." : "Don't have an account? Sign up."}
                </p> */}
            </div>
        </div>
    );
}

export default Login;

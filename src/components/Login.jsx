// Login.jsx
import { useState } from "react";
import { signInWithGoogle } from "../firebase/authentication";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig.jsx";
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailAuth = async (email, password) => {
        try {
            // Try signing in the user
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User signed in successfully.");
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                // If the user does not exist, sign them up
                try {
                    await createUserWithEmailAndPassword(auth, email, password);
                    console.log("User signed up successfully.");
                } catch (signupError) {
                    console.error("Error signing up: ", signupError.message);
                }
            } else {
                // Handle other errors
                console.error("Error signing in: ", error.message);
            }
        }
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



                <button className="sign-in-email" onClick={handleEmailAuth}>Sign Up</button>


                <button className="sign-in-google" onClick={signInWithGoogle}>
                    <FontAwesomeIcon icon={faGoogle} />  <span style={{ fontSize: 'large', color: 'var(--darker)' }}>Sign in with Google</span>
                </button>

                {/* <p onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? "Already have an account? Sign in." : "Don't have an account? Sign up."}
                </p> */}
            </div>
        </div>
    );
}

export default Login;

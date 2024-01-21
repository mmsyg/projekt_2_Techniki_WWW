import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
    // State variables for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Destructuring signup function, error, and loading state from useSignup hook
    const {signup, error, isLoading} = useSignup();

    // Function to handle form submission
    const handleSubmit = async(e) => {
        e.preventDefault(); // Preventing the default form submission behavior

        await signup(email, password); // Calling the signup function with email and password
    };

    // Rendering the Signup form
    return (
        <form className="panel" onSubmit={handleSubmit}>
            <h3>Nowe konto</h3>
            <label>Email:</label>
            <input
                type="email" // Email input field
                onChange={(e) => setEmail(e.target.value)} // Updating email state on change
                value={email} // Binding email state to the input field
            />

            <label>Hasło:</label>
            <input
                type="password" // Password input field
                onChange={(e) => setPassword(e.target.value)} // Updating password state on change
                value={password} // Binding password state to the input field
            />

            <button disabled={isLoading}>Zarejestruj się</button> 
            {error && <div className="error">{error}</div>} 
        </form>
    );
}

export default Signup;

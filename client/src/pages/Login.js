import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  // State variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Destructuring login function, error, and loading state from useLogin hook
  const { login, error, isLoading } = useLogin();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing the default form submission behavior

    await login(email, password); // Calling the login function with email and password
  };

  // Rendering the Login form
  return (
    <form className="panel" onSubmit={handleSubmit}>
      <h3>Logowanie</h3>
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

      <button disabled={isLoading}>Zaloguj</button> 
      {error && <div className="error">{error}</div>} 
    </form>
  );
};

export default Login;

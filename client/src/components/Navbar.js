
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";


const Navbar = () => {
    // Using the useLogout hook to get the logout function
    const {logout} = useLogout()
    // Destructuring to extract the user object from the authentication context
    const { user} = useAuthContext()

    // Function to handle logout click
    const handleClick = () => {
        logout() // Calling the logout function
    }


    return (
        <header>
            <div className="navbar">
                <Link className="linki1" to="/">
                    <h1>Kontakty Osobiste</h1> {/* Link to the home page with a title */}
                </Link>
                <nav>
                    {user && // Conditional rendering based on user authentication state
                        <div>
                            <span>{user.email}</span> 
                            <button onClick={handleClick}>Wyloguj</button> 
                        </div>}
                    {!user && // Conditional rendering for unauthenticated users
                        <div>
                            <Link className="linki" to="/login">Zaloguj</Link> 
                            <Link className="linki" to="/signup">Zarejestruj</Link> 
                        </div>}
                </nav>
            </div>
        </header>
    );
};


export default Navbar;

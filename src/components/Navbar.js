import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

// Styles
import styles from './Navbar.module.css'

export default function Navbar() {
    const { logout } = useLogout()
    // Everytime there is a change in the user (login, logout) this function is going to revaluate. Then we will show some content conditionally (depending if we have a user or not)
    const { user } = useAuthContext()

    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}>myMoneyApp</li>

                {/* If we do NOT have an user then show the login and signup options */}
                {!user && (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                )}

                {/* If we have an user then show the logout option */}
                {user && (
                    <>
                        <li>Hello, {user.displayName}</li>
                        <li>
                            <button className="btn" onClick={logout}>Logout</button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

import { Link } from "react-router-dom";
import { useContext } from "react";

import styles from "./Navbar.module.css";

import Logo from "../../assets/images/logo.png";

import { Context } from "../../context/UserContext";

const Navbar = () => {

    const { authenticated, logout } = useContext(Context);

    return (
      <nav className={styles.navbar}>
        <div className={styles.navbar_logo}> 
            <img src={Logo} alt="Adopt A Pet Logo" /> 
            <h2>Adopt A Pet</h2>
        </div>
        <ul>
            <li><Link to="/">Home</Link></li>

            {authenticated ? (
              <>
                <li onClick={logout}><button>Sair</button></li>
              </>
            ) : (  
              <>
                <li><Link to="login">Login</Link></li>
                <li><Link to="register">Cadastrar</Link></li>
              </>
            )}
        </ul>
      </nav>
    );
  }   
  
  export default Navbar;
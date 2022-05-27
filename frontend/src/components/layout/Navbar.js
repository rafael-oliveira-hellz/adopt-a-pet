import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";

import Logo from "../../assets/images/logo.png";

const Navbar = () => {
    return (
      <nav className={styles.navbar}>
        <div className={styles.navbar_logo}> 
            <img src={Logo} alt="Adopt A Pet Logo" /> 
            <h2>Adopt A Pet</h2>
        </div>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="login">Login</Link></li>
            <li><Link to="register">Cadastrar</Link></li>
        </ul>
      </nav>
    );
  }   
  
  export default Navbar;
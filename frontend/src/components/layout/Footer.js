import styles from "./Footer.module.css";

const Footer = () => {
    return (
      <footer className={styles.footer}>
          <p>
              <span className="bold">Adopt A Pet</span> &copy; 2022
          </p>
      </footer>
    );
  }   
  
  export default Footer;
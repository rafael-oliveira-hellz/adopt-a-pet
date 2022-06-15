import styles from './Container.module.css';

const Container = ({ children }) => (
  <main className={styles.container}> {children} </main>
);

export default Container;

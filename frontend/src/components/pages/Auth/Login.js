import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../form/Input';
import Button from '../../form/Button';

import styles from '../../form/Form.module.css';

import { Context } from '../../../context/UserContext';

const Login = () => {

    const [user, setUser] = useState({});
    const { login } = useContext(Context);

    const handleChange = (e) => {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      login(user);
    }


    return (
      <section className={styles.form_container}>
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <Input 
            type="email" 
            text="E-mail" 
            name="email" 
            placeholder="Digite o seu e-mail" 
            handleOnChange={handleChange}
          />

          <Input 
            type="password" 
            text="Senha" 
            name="password" 
            placeholder="Digite uma senha entre 8 e 16 caracteres" 
            handleOnChange={handleChange}
          />

          <Button type="submit" value="Login" />
        </form>

        <p>Não tem conta? <Link to="/register">Clique aqui</Link></p>
      </section>
    );
  }   
  
  export default Login;
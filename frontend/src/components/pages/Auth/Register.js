import { useState, useContext } from 'react';

import { Link } from 'react-router-dom';

import Input from '../../form/Input';
import Button from '../../form/Button';

import styles from '../../form/Form.module.css';

import { Context } from '../../../context/UserContext';

const Register = () => {
  const [user, setUser] = useState({});
  const { register } = useContext(Context);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    register(user);
  };

  return (
    <section className={styles.form_container}>
      <h1>Registrar</h1>

      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          text="Nome"
          name="name"
          placeholder="Digite o seu nome"
          handleOnChange={handleChange}
        />

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

        <Input
          type="password"
          text="Confirme a senha"
          name="password_confirmation"
          placeholder="Digite a senha novamente"
          handleOnChange={handleChange}
        />

        <Button type="submit" value="Cadastrar" />
      </form>

      <p>
        Já possui uma conta? <Link to="/login">Entrar</Link>
      </p>
    </section>
  );
};

export default Register;

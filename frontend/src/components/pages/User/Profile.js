import { useState } from "react";
import UseFlashMessage from "../../../hooks/useFlashMessage";
import api from "../../../utils/api";
import styles from '../../form/Form.module.css';
import profileStyles from './Profile.module.css';

import Input from "../../form/Input";
import Button from "../../form/Button";

const Profile = ({ user, updateUser }) => {

    const [userData, setUserData] = useState({});
    const [userPassword, setUserPassword] = useState({});
    const [userPasswordConfirm, setUserPasswordConfirm] = useState({});
    const { setFlashMessage } = UseFlashMessage();

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    }

    const handlePasswordChange = (e) => {
        setUserPassword({
            ...userPassword,
            [e.target.name]: e.target.value,
        });
    }

    const handlePasswordConfirmChange = (e) => {
        setUserPasswordConfirm({
            ...userPasswordConfirm,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userPassword.password !== userPasswordConfirm.password) {
            setFlashMessage('As senhas não conferem!', 'error');
            return;
        }

        const data = {
            ...userData,
            password: userPassword.password,
        };

        try {
            const response = await api.put('/users/profile', data);
            setFlashMessage('Perfil atualizado com sucesso!', 'success');
            updateUser(response.data);
        } catch (failure) {
            setFlashMessage(failure.response.data.error, 'error');
        }
    }

    return (
        <section className={styles.form_container}>
            <h1>Perfil</h1>
            <p>Preview Imagem</p>

            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    text="Nome"
                    name="name"
                    placeholder="Digite o seu nome"
                    value={userData.name}
                    handleOnChange={handleChange}
                />

                <Input
                    type="email"
                    text="E-mail"
                    name="email"
                    placeholder="Digite o seu e-mail"
                    value={userData.email}
                    handleOnChange={handleChange}
                />

                <Input
                    type="password"
                    text="Senha"
                    name="password"
                    placeholder="Digite uma senha entre 8 e 16 caracteres"
                    value={userPassword.password}
                    handleOnChange={handlePasswordChange}
                />

                <Input
                    type="password"
                    text="Confirmar senha"
                    name="password"
                    placeholder="Digite uma senha entre 8 e 16 caracteres"
                    value={userPasswordConfirm.password}
                    handleOnChange={handlePasswordConfirmChange}
                />

                <Button type="submit" value="Atualizar" />
            </form>
        </section>
    );
}

export default Profile;
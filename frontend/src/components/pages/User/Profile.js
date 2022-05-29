import { useState, useEffect } from "react";
import UseFlashMessage from "../../../hooks/useFlashMessage";
import api from "../../../utils/api";
import styles from '../../form/Form.module.css';
import profileStyles from './Profile.module.css';

import Input from "../../form/Input";
import Button from "../../form/Button";

const Profile = () => {

    const [user, setUser] = useState({})
    const [preview, setPreview] = useState()
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = UseFlashMessage();

    useEffect(() => {
        api
        .get('/users/checkToken', {
            headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            },
        })
        .then((response) => {
            console.log(response.data)
            setUser(response.data)
            
            console.log(response.data.user.name)
        })
    }, [token])

    function handleChange(e) {
    }

    function onFileChange(e) {
    }

    const handleSubmit = async (e) => {
    }

    return (
        <section className={profileStyles.profile_container}>
            <div className={profileStyles.profile_header}>
                <h1>Perfil</h1>
                <p>Preview Imagem</p>
            </div>

            <form className={styles.form_container} onSubmit={handleSubmit}>
                <Input
                    type="file"
                    name="avatar"
                    text="Avatar"
                    handleOnChange={onFileChange}
                />

                <Input
                    type="text"
                    text="Nome"
                    name="name"
                    placeholder="Digite o seu nome"
                    value={user.name || ''}
                    handleOnChange={handleChange}
                />

                <Input
                    type="email"
                    text="E-mail"
                    name="email"
                    placeholder="Digite o seu e-mail"
                    value={user.email || ''}
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
                    text="Confirmar senha"
                    name="password_confirmation"
                    placeholder="Digite uma senha entre 8 e 16 caracteres"
                    handleOnChange={handleChange}
                />

                <Button type="submit" value="Atualizar" />
            </form>
        </section>
    );
}

export default Profile;
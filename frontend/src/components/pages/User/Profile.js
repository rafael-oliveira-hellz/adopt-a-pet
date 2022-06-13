import { useState, useEffect } from "react";
import UseFlashMessage from "../../../hooks/useFlashMessage";
import api from "../../../utils/api";
import styles from "../../form/Form.module.css";
import profileStyles from "./Profile.module.css";

import Input from "../../form/Input";
import Button from "../../form/Button";
import RoundedImageFrame from "../../layout/RoundedImageFrame";

const Profile = () => {
  const [user, setUser] = useState({});
  const [preview, setPreview] = useState();
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = UseFlashMessage();

  useEffect(() => {
    api
      .get("/users/checkToken", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data.currentUser);
      });
  }, [token]);

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  function onFileChange(e) {
    setPreview(e.target.files[0]);
    setUser({ ...user, [e.target.name]: e.target.files[0] });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let messageType = "success";

    const formData = new FormData();

    const userFormData = await Object.keys(user).forEach((key) =>
      formData.append(key, user[key])
    );

    formData.append("user", userFormData);

    const data = await api
      .patch(`users/edit/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((err) => {
        messageType = "error";

        return err.response.data;
      });

    setFlashMessage(data.message, messageType);
  };

  return (
    <section className={profileStyles.profile_container}>
      <div className={profileStyles.profile_header}>
        <h1>Perfil</h1>

        {(user.avatar || preview) && (
          <RoundedImageFrame
            src={
              preview
                ? URL.createObjectURL(preview)
                : `${process.env.REACT_APP_API}images/users/${user.avatar}`
            }
            alt={user.name}
          />
        )}
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
          value={user.name || ""}
          handleOnChange={handleChange}
        />

        <Input
          type="email"
          text="E-mail"
          name="email"
          placeholder="Digite o seu e-mail"
          value={user.email || ""}
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
};

export default Profile;

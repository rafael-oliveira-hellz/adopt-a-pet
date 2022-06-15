import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../../utils/api';

import styles from './AddPet.module.css';

/* Components */
import PetForm from '../../form/PetForm';

/* Hooks */
import UseFlashMessage from '../../../hooks/useFlashMessage';

const AddPet = () => {
  const [token] = useState(localStorage.getItem('token') || '');
  const { setFlashMessage } = UseFlashMessage();
  const navigate = useNavigate();

  async function registerPet(pet) {
    let messageType = 'success';

    const formData = new FormData();

    await Object.keys(pet).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append('images', pet[key][i]);
        }
      } else {
        formData.append(key, pet[key]);
      }
    });

    const data = await api
      .post('/pets/create', formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data)
      .catch((err) => {
        messageType = 'error';

        return err.response.data;
      });

    setFlashMessage(data.message, messageType);

    if (messageType !== 'error') {
      navigate('/pets/my-pets');
    }
  }

  return (
    <section className={styles.addpet_header}>
      <div>
        <h1>Cadastrar um pet</h1>

        <p>Depois ele ficará disponível para adoção!</p>
      </div>

      <PetForm handleSubmit={registerPet} btnText="Cadastrar Pet" />
    </section>
  );
};

export default AddPet;

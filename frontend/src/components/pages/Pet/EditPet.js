import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

/** Hooks */
import UseFlashMessage from '../../../hooks/useFlashMessage';

/** Utils */
import api from '../../../utils/api';

/** Layout */
import Button from '../../form/Button';
import RoundedImageFrame from '../../layout/RoundedImageFrame';
import styles from '../../pages/Pet/AddPet.module.css';
import PetForm from '../../form/PetForm';

const EditPet = () => {
  const [pet, setPet] = useState({});
  const [token] = useState(localStorage.getItem('token') || '');
  const { setFlashMessage } = UseFlashMessage();

  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPet(response.data.pet);
      });
  }, [id, token]);

  const updatePet = async (pet) => {
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
      .patch(`/pets/${pet._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        messageType = 'error';

        return err.response.data;
      });

    setFlashMessage(data.message, messageType);
  };

  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Editando o pet: {pet.name}</h1>
        <p>Depois os dados serão atualizados no sistema...</p>
      </div>

      {pet.name && (
        <PetForm handleSubmit={updatePet} btnText="Atualizar" petData={pet} />
      )}
    </section>
  );
};

export default EditPet;

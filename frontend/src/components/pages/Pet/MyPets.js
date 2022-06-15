import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/** Hooks */
import UseFlashMessage from '../../../hooks/useFlashMessage';

/** Utils */
import api from '../../../utils/api';

/** Layout */
import Button from '../../form/Button';
import RoundedImageFrame from '../../layout/RoundedImageFrame';
import styles from './Dashboard.module.css';

const MyPets = () => {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem('token') || '');
  const { setFlashMessage } = UseFlashMessage();

  useEffect(() => {
    api
      .get('/pets/my-pets', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets);
      });
  }, [token]);

  async function removePet(id) {
    let messageType = 'success';

    const data = await api
      .delete(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatePets = pets.filter((pet) => pet._id !== id);
        setPets(updatePets);

        return response.data;
      })
      .catch((err) => {
        messageType = 'error';

        return err.response.data;
      });

    setFlashMessage(data.message, messageType);
  }

  return (
    <section>
      <div className={styles.petlist_header}>
        <h1>Meus Pets</h1>

        <Link to="/pet/add">Cadastrar um pet</Link>
      </div>

      <div className={styles.petlist_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div className={styles.petlist_row} key={pet._id}>
              <RoundedImageFrame
                src={`${process.env.REACT_APP_API}images/pets/${pet.images[0]}`}
                alt={pet.name}
                width="px125"
              />
              <span className="bold">{pet.name}</span>
              <div className={styles.actions}>
                {pet.available ? (
                  <>
                    {pet.adopter && (
                      <Button
                        className={styles.conclude_adoption_btn}
                        value="Concluir adoção"
                      />
                    )}
                    <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                    <Button
                      HandleOnClick={() => {
                        removePet(pet._id);
                      }}
                      value="Excluir"
                    />
                  </>
                ) : (
                  <p>Pet já adotado!</p>
                )}
              </div>
            </div>
          ))}
        {pets.length === 0 && <p>Nenhum pet cadastrado</p>}
      </div>
    </section>
  );
};

export default MyPets;

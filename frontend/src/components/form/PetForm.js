import { useState } from 'react';

import formStyles from './Form.module.css';

import Input from './Input';
import Button from './Button';
import Select from './Select';

const PetForm = ({ handleSubmit, petData, btnText }) => {
  const [pet, setPet] = useState(petData || {});
  const [preview, setPreview] = useState([]);
  const petColors = {
    Cinza: '#666666',
    Preto: '#000000',
    Branco: '#FFFFFF',
    Marrom: '#8B4513',
    Caramelo: '#FFD700',
    Mesclado: '#FFFACD',
    Malhado: '#FFA500',
  };

  const onFileChange = (e) => {
    setPreview(Array.from(e.target.files));
    setPet({ ...pet, images: [...e.target.files] });
  };

  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const handleColorChange = (e) => {
    setPet({ ...pet, color: e.target.options[e.target.selectedIndex].text });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    handleSubmit(pet);
  };

  return (
    <form className={formStyles.form_container} onSubmit={handleSubmitForm}>
      <div className={formStyles.preview_pet_images}>
        {preview.length > 0
          ? preview.map((image, index) => (
              <img
                key={`${pet.name} + ${index}`}
                src={URL.createObjectURL(image)}
                alt={pet.name}
              />
            ))
          : pet.images &&
            pet.images.map((image, index) => (
              <img
                key={`${pet.name} + ${index}`}
                src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                alt={pet.name}
              />
            ))}
      </div>
      <Input
        text="Imagem do pet"
        type="file"
        name="images"
        handleOnChange={onFileChange}
        multiple={true}
      />

      <Input
        text="Nome do pet"
        type="text"
        name="name"
        handleOnChange={handleChange}
        value={pet.name || ''}
        placeholder="Digite o nome do pet"
      />

      <Input
        text="Idade do pet"
        type="text"
        name="age"
        handleOnChange={handleChange}
        value={pet.age || ''}
        placeholder="Digite a idade do pet"
      />

      <Input
        text="Peso do pet"
        type="text"
        name="weight"
        handleOnChange={handleChange}
        value={pet.weight || ''}
        placeholder="Digite o peso do pet"
      />

      <Input
        text="Raça do pet"
        type="text"
        name="breed"
        handleOnChange={handleChange}
        value={pet.breed || ''}
        placeholder="Digite a raça do pet"
      />

      <Input
        text="Descrição do pet"
        type="text"
        name="description"
        handleOnChange={handleChange}
        value={pet.description || ''}
        placeholder="Digite a descrição do pet"
      />

      <Input
        text="Tipo do pet"
        type="text"
        name="type"
        handleOnChange={handleChange}
        value={pet.type || ''}
        placeholder="Digite o tipo do pet"
      />

      <Select
        text="Selecione a cor do pet"
        name="color"
        handleOnChange={handleColorChange}
        value={pet.color || ''}
        options={Object.keys(petColors)}
        color={Object.values(petColors)}
        // TODO - background color is not working, might fix later
        // color={petColors[0].hex[0]}
      />

      <Button value={btnText} type="submit" />
    </form>
  );
};

export default PetForm;

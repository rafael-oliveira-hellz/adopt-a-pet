import { useState } from "react";

import formStyles from "./Form.module.css";

import Input from "./Input";
import Button from "./Button";
import Select from "./Select";

const PetForm = ({ handleSubmit, petData, btnText }) => {
  const [pet, setPet] = useState(petData || {});
  const [preview, setPreview] = useState([]);
  const petColors = [
    {
      color: [
        "Cinza",
        "Preto",
        "Branco",
        "Marrom",
        "Caramelo",
        "Mesclado",
        "Malhado",
      ],
      hex: [
        "#666666",
        "#000000",
        "#FFFFFF",
        "#8B4513",
        "#FFD700",
        "#FFFACD",
        "#FFA500",
      ],
    },
  ];

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const handleColorChange = (e) => {
    setPet({ ...pet, color: e.target.value });
  };

  return (
    <form className={formStyles.form_container} onSubmit={handleSubmit}>
      <Input
        text="Img do pet"
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
        value={pet.name || ""}
        placeholder="Digite o nome do pet"
      />

      <Input
        text="Idade do pet"
        type="text"
        name="age"
        handleOnChange={handleChange}
        value={pet.age || ""}
        placeholder="Digite a idade do pet"
      />

      <Input
        text="Peso do pet"
        type="text"
        name="weight"
        handleOnChange={handleChange}
        value={pet.weight || ""}
        placeholder="Digite o peso do pet"
      />

      <Select
        text="Selecione a cor do pet"
        name="color"
        handleOnChange={handleColorChange}
        value={pet.color || ""}
        options={petColors[0].color}
        // color={petColors[0].hex[0]}
      />

      <Button value={btnText} type="submit" />
    </form>
  );
};

export default PetForm;

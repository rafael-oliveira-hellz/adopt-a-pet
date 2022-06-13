import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../utils/api";

import styles from "./AddPet.module.css";

/* Components */
import PetForm from "../../form/PetForm";

/* Hooks */
import UseFlashMessage from "../../../hooks/useFlashMessage";

const AddPet = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.addpet_header}>
      <div>
        <h1>Cadastrar um pet</h1>

        <p>Depois ele ficará disponível para adoção!</p>
      </div>

      <PetForm btnText="Cadastrar Pet" />
    </section>
  );
};

export default AddPet;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MyPets = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/pets/my-pets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPets(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section>
      <div>
        <h1>Meus Pets</h1>

        <Link to="/pet/add">Cadastrar um pet</Link>
      </div>

      <div>
        {pets.length > 0 && <p>Meus Pets Cadastrados</p>}
        {pets === [] && <p>Nenhum pet cadastrado</p>}
      </div>
    </section>
  );
};

export default MyPets;

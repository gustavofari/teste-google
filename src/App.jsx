import "./App.css";
import { FiSearch } from "react-icons/fi";
import api from "./services/api";
import { useState, useEffect } from "react";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCEP] = useState({});

  async function handleSearch() {
    if (input === "") {
      alert("Preencha algum cep!");
    }

    try {
      const response = await api.get(`${input}/json`);
      setCEP(response.data);
    } catch (error) {
      alert("error!");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">BUSCADOR DE CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite o CEP"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {cep.logradouro != null ? ( //or Object.keys(cep).length > 0 &&
        <main className="main">
          <h2>{cep.cep}</h2>
          <p>{cep.logradouro}</p>
          <p>{cep.complemento}</p>
          <p>{cep.bairro}</p>
          <p>
            {cep.localidade} - {cep.uf}
          </p>
        </main>
      ) : null}
    </div>
  );
}

export default App;

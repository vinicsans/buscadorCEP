import { useState } from 'react';
import './App.css';
import { FiSearch } from 'react-icons/fi';
import api from './services/api';

function App() {

  const [input, setInput] = useState("");
  const [cep, setCEP] = useState("");
  const [loaded, setLoaded] = useState("hide")

  async function handleSearch() {

    if (input === '') {
      alert('Digite seu CPF corretamente.')
      return
    } 

    try {
      const response = await api.get(`${input}/json`);
      setCEP(response.data);
      setLoaded("")
      setInput("")
    } catch {
      alert('Preencha seu CEP corretamente.');
      setInput("");
    }

  }

  return (
    <div className="container">

      <h1 className="title">Buscar CEP</h1>

      <div className="input-container">

        <input type="text" placeholder="Digite seu CEP" onChange={(e) => setInput(e.target.value)}/>

        <button className="button-search" onClick={handleSearch}>
          <FiSearch size={24} color="#FFF"/>
        </button>

      </div>

      <main className={loaded}>
        <span>{cep.logradouro}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
      </main>


    </div>
  );
}

export default App;

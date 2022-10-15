
import { useState } from 'react';
import {FiSearch} from 'react-icons/fi'
import api from './services/api';
import './styles.css'

function App() {

  const [busca, setBusca] = useState('')
  const [dados, setDados] = useState(null)

  async function handleSearch(){
    if (busca ===''){
      setDados(null)
      alert('Digite um cep')
      return;
    }

    try {
      const response = await api.get(`${busca}/json`);
      setDados(response.data)
      console.log(response.data)


    } catch (error) {
      setBusca('');
      setDados(null)
      alert('Erro ao buscar o CEP')
    }
  }

  return (
    <div className="container">
      <h1 className='title'>Busca CEP</h1>
      <div className='containerInput'>
        <input type='text' placeholder='Digite um CEP...' value={busca} onChange={(e) => setBusca(e.target.value)} />
        <button className='buttonSearch' onClick={handleSearch}>
          <FiSearch size={18} color='#fff' />
        </button>
      </div>
      {dados && (
        <main className='main'>
          <h2>{dados.cep}</h2>
          <span>Logradouro: {dados.logradouro}</span>
          <span>Complemento: {dados.complemento}</span>
          <span>Bairro: {dados.bairro}</span>
          <span>Uf: {dados.uf}</span>
        </main>
      )}
      
    </div>
  );
}

export default App;

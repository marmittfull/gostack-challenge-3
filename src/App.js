import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {

    listRepositories()

  }, [])

  async function listRepositories() {
    const response = await api.get('/repositories')
    setRepositories(response.data)
  }


  async function handleAddRepository() {

    const data = Date.now()
    const repository = {
      title: `Repository ${data}`,
      url: `http://repositorio${data}.com`,
      techs: ['NodeJS', 'ReactJS']
    }
    
    api.post('/repositories', repository).then(response => {
      setRepositories([...repositories, response.data])
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(() => {
      
      listRepositories()
      
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => 
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

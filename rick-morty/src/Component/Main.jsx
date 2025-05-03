import React, { useEffect, useState } from 'react'
import './Main.css'
const Main = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
            .then(response => response.json())
            .then(data => setData(data.results))
            .catch(error => console.error('Error fetching data:', error));
    }, [page]);

    useEffect(() => {
        console.log('Data fetched:', data);
    }, [data]);

    function getRandomCharacterId() {
        return Math.floor(Math.random() * 826) + 1;
    }

  return (
    <div className='main'>
        <h1>Rick and Morty Characters</h1>
        <button className="random-Char" onClick={()=> window.open(`/character/${getRandomCharacterId()}`, '_blank')}>Random Character Detail</button>
        <div className="character-list">
            {data.map(character => (
                <div key={character.id} className="character-card" onClick={() => window.open(`/character/${character.id}`, '_blank')}>
                    <img className="char-image" src={character.image} alt={character.name}/>
                    <div className="character-info">
                        <h2>{character.name}</h2>
                        <div className='character-details'>
                            <h3>Species: {character.species}</h3>
                            <h3>Status: {character.status}</h3> 
                        </div>     
                    </div>       
                </div>
            ))}
        </div>

        <div className="pagination">
            <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))} disabled={page === 1}>Previous</button>
            <span>Page- {page}</span>
            <button onClick={() => setPage(prevPage => prevPage + 1)}>Next</button>
        </div>
    </div>
  )
}

export default Main
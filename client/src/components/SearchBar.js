import { useState } from 'react';
import './SearchBar.css';

function SearchBar(){
    
    const [exactMatches, setExactMatches] = useState([]);
    const [fuzzyMatches, setFuzzyMatches] = useState([]);
    const handleChangeEvent = (e)=>{
        // console.log(e.target.value);
        if(!e.target.value) {
            setExactMatches([]);
            setFuzzyMatches([]);
            return;
        };
        fetch(`/api?search=${e.target.value}`)
            .then( res => {
                return res.json();
            })
            .then( data =>{
                console.log(data);
                setExactMatches(data.exact);
                setFuzzyMatches(data.fuzzy);
            })
            .catch( err => console.error(err));
    }
    return (
        <div className="search-box">
            <input className="search-bar" type="text" onChange={handleChangeEvent} />
            {
                exactMatches.length === 0 && fuzzyMatches.length === 0 
                ? null :
                <ul>
                    {exactMatches.map( (string, index) => 
                            <li className="exact-results" key={index}>{string}</li>
                    )}
                    {fuzzyMatches.map( (string, index) => 
                            <li className="fuzzy-results" key={index}>{string}</li>
                    )}
                </ul>
            }
            
        </div>
        
        
    )
}

export default SearchBar;
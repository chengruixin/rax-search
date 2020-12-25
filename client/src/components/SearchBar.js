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
        <div>
            <input className="search-bar" type="text" onChange={handleChangeEvent} />
            <div>
                <div>
                    Exact:
                    <ul>
                        {exactMatches.map( (string, index) => 
                                <li key={index}>{string}</li>
                        )}
                    </ul>
                </div>
               
                <div>
                    Fuzzy:
                    <ul>
                        {fuzzyMatches.map( (string, index) => 
                                <li key={index}>{string}</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
        
        
    )
}

export default SearchBar;
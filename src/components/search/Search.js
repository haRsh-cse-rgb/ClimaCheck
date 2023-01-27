import React, { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { GEO_API , API_URL } from '../../api';


const Search = ({onSearchChange}) => {

    const [search , setSearch] =useState(null);

    const loadOptions = async (inputValue) => {
    const response = await fetch(`${API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, GEO_API);
      const response_1 = await response.json();
      return {
        options: response_1.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name} , ${city.countryCode}`,
          };
        }),
      };
    
	// .catch((err) => console.error(err));

    };

const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
}

  return (
    <AsyncPaginate placeholder="Search for city..." 
    debounceTimeout={500} 
    value={search} 
    onChange={handleOnChange} 
    loadOptions={loadOptions}>

    </AsyncPaginate>
  )
}

export default Search
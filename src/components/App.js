import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";
import PlantList from "./PlantList";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch plants on load
    fetch("http://localhost:6001/plants")
      .then(response => response.json())
      .then(data => setPlants(data));
  }, []);

  const handleAddPlant = (newPlant) => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlant),
    })
      .then(response => response.json())
      .then(addedPlant => setPlants([...plants, addedPlant]));
  };

  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());

  const filteredPlants = plants.filter(plant => 
    plant.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="app">
      <Header />
      <PlantPage 
          plants={filteredPlants} 
        onAddPlant={handleAddPlant} 
        onSearch={handleSearch}
      />
     
    </div>
  );
}

export default App;

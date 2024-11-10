import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";



function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to fetch plants from backend
  const fetchPlants = () => {
    fetch("http://localhost:6001/plants")
      .then(response => response.json())
      .then(data => setPlants(data));
  };

  useEffect(() => {
    // Fetch plants on load
    fetchPlants();
  }, []);

  const handleAddPlant = (newPlant) => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlant),
    })
    .then(response => response.json())
    .then(() => {
      // Refetch plants to update the list with the new plant from the backend
      fetchPlants();
    });
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

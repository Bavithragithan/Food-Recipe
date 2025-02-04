import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from './Component/Card';
import { Route, Routes } from 'react-router-dom';
import Recipe from './Component/Recipe';
import Footer from './Component/Footer';

function App() {
  const [data, setData] = useState(null);
  const [item, setItem] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // New state to handle error message

  const handleItem = (e) => {
    setItem(e.target.value);
  };

  const fetchRecipe = async (item) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.meals) {
        setData(result);
        setErrorMessage(""); // Reset error message if recipes are found
      } else {
        setData(null); // Clear previous data if no recipes found
        setErrorMessage("Recipe not available"); // Set error message if no recipe is found
      }
    } catch (error) {
      setData(null);
      setErrorMessage("Error fetching the recipe. Please try again later.");
      console.error("Fetching Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRecipe(item);
  };

  return (
    <>
      <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
          <div className="container">
            <a className="navbar-brand fw-bold fs-4">Fork it Over: Your Ultimate Recipe Adventure! </a>
            <form className="d-flex w-50" role="search" onSubmit={handleSubmit}>
              <input
                className="form-control me-2 rounded-pill"
                type="search"
                placeholder="Search for recipes..."
                aria-label="Search"
                value={item}
                onChange={handleItem}
              />
              <button className="btn btn-warning rounded-pill fw-bold" type="submit">
                🔍 Search
              </button>
            </form>
          </div>
        </nav>

        <div className="container my-5 flex-grow-1">
          <Routes>
            <Route
              path="/"
              element={
                data ? (
                  <Card Data={data} />
                ) : (
                  <p className="text-center fs-5 text-muted">{errorMessage || "Search for a Recipe by Name"}</p>
                )
              }
            />
            <Route path="/:idMeal" element={<Recipe />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;

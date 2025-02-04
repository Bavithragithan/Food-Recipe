import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "./Component/Card";
import { Route, Routes } from "react-router-dom";
import Recipe from "./Component/Recipe";
import Footer from "./Component/Footer";
import './App.css'

function App() {
  const [data, setData] = useState(null);
  const [item, setItem] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleItem = (e) => {
    setItem(e.target.value);
  };

  const fetchRecipe = async (item) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.meals) {
        setData(result);
        setErrorMessage("");
      } else {
        setData(null);
        setErrorMessage("Recipe not available");
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
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <nav className="navbar navbar-dark bg-dark py-3">
          <div className="container text-center">
            <a className="navbar-brand fw-bold w-100 recipe-title">
              Recipe Adventure
            </a>



            <form className="row w-100 g-2 mt-2 justify-content-center" onSubmit={handleSubmit}>
              <div className="col-12 col-md-6">
                <input
                  className="form-control rounded-pill"
                  type="search"
                  placeholder="Search for recipes..."
                  aria-label="Search"
                  value={item}
                  onChange={handleItem}
                />
              </div>
              <div className="col-12 col-md-auto text-center">
                <button className="btn btn-warning rounded-pill fw-bold w-100" type="submit">
                  🔍 Search
                </button>
              </div>
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
                  <p className="text-center fs-5 text-muted">
                    {errorMessage || "Search for a Recipe by Name"}
                  </p>
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

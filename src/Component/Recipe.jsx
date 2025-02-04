import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Recipe = () => {
    const { idMeal } = useParams();
    const [recipe, setRecipe] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const FetchId = async () => {
            const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
            const resp = await fetch(url);
            const result = await resp.json();

            if (result.meals) {
                setRecipe(result.meals[0]);
            }
        };

        if (idMeal) {
            FetchId();
        }
    }, [idMeal]);

    return (
        <div className="container py-5">
            {recipe ? (
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                            <img
                                src={recipe.strMealThumb}
                                alt={recipe.strMeal}
                                className="card-img-top"
                                style={{ height: "350px", objectFit: "cover" }}
                            />
                            <div className="card-body text-center">
                                <h2 className="fw-bold text-primary">{recipe.strMeal}</h2>
                                <p className="text-muted">
                                    <strong>Category:</strong> {recipe.strCategory} | <strong>Area:</strong> {recipe.strArea}
                                </p>

                                {recipe.strYoutube && (
                                    <div className="mt-3">
                                        <p className="text-muted"><strong>Watch the Recipe Video:</strong></p>
                                        <a
                                            href={recipe.strYoutube}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-danger btn-lg"
                                        >
                                            Watch on YouTube
                                        </a>
                                    </div>
                                )}

                                <h5 className="mt-4 text-secondary">🥕 Ingredients & Measurements:</h5>
                                <ul className="list-group list-group-flush text-start">
                                    {Array.from({ length: 20 }, (_, i) => i + 1)
                                        .map((num) => {
                                            const ingredient = recipe[`strIngredient${num}`];
                                            const measure = recipe[`strMeasure${num}`];

                                            return ingredient && ingredient.trim() !== "" ? (
                                                <li key={num} className="list-group-item">
                                                    <strong>{measure}</strong> {ingredient}
                                                </li>
                                            ) : null;
                                        })}
                                </ul>

                                <h5 className="mt-4 text-secondary">📜 Instructions:</h5>
                                <ol className="text-start">
                                    {recipe.strInstructions
                                        .split('.')
                                        .map((step, index) => (
                                            step.trim() && (
                                                <li key={index} className="mb-2">{step.trim()}.</li>
                                            )
                                        ))}
                                </ol>

                                <button className="btn btn-lg btn-outline-primary mt-3" onClick={() => navigate("/")}>
                                    🔙 Back to Home
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="fs-4 text-muted text-center">Loading...</p>
            )}
        </div>
    );
};

export default Recipe;

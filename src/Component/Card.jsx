import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ Data }) => {
    const navigate = useNavigate();

    return (
        <div className="container py-4">
            <div className="row g-4 justify-content-center">
                {
                    !Data ? (
                        <h4 className="text-center text-muted">🍽️ Search for a Recipe by Name</h4>
                    ) : (
                        Data.meals.map((meal, index) => (
                            <div className="col-md-6 col-lg-4 col-xl-3" key={index}>
                                <div className="card shadow-lg border-0 rounded-3 overflow-hidden h-100">
                                    <img
                                        src={meal.strMealThumb}
                                        className="card-img-top"
                                        alt={meal.strMeal}
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                    <div className="card-body text-center">
                                        <h5 className="card-title fw-bold text-primary">{meal.strMeal}</h5>
                                        <p className="card-text text-muted">
                                            {meal.strInstructions.slice(0, 80)}...
                                        </p>
                                        <button
                                            className="btn btn-outline-success w-100 fw-bold"
                                            onClick={() => navigate(`/${meal.idMeal}`)}
                                        >
                                            View Recipe 🍲
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    );
}

export default Card;

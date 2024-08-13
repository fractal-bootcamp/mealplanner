import React, { useState } from "react";

interface Ingredient {
  name: string;
  quantity: string;
}

interface Recipe {
  name: string;
  ingredients: Ingredient[];
}

interface Meal {
  recipes: Recipe[];
}

interface Day {
  meals: Meal[];
}

interface Week {
  days: Day[];
}

export const Calendar = ({ week }: { week: Week }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
      {week.days.map((day) => (
        <div
          key={day.meals.length}
          style={{
            backgroundColor: "lightblue",
          }}
        >
          {day.meals.map((meal) => (
            <div key={meal.recipes.length}>
              <div>
                {meal.recipes.map((recipe) => (
                  <div key={recipe.name}>
                    {recipe.name}
                    <div
                      style={{
                        backgroundColor: "lightgreen",
                      }}
                    >
                      {meal.recipes.map((recipe) =>
                        recipe.ingredients.map((ingredient) => [
                          ingredient.name,
                          ingredient.quantity,
                          <br />,
                        ])
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const DayComponent = ({ day }: { day: Day }) => {
  return (
    <div>
      <div
        key={day.meals.length}
        style={{
          backgroundColor: "lightblue",
        }}
      >
        {day.meals.map((meal) => (
          <div key={meal.recipes.length}>
            <div>
              {meal.recipes.map((recipe) => (
                <div key={recipe.name}>
                  {recipe.name}
                  <div
                    style={{
                      backgroundColor: "lightgreen",
                    }}
                  >
                    {meal.recipes.map((recipe) =>
                      recipe.ingredients.map((ingredient) => [
                        ingredient.name,
                        ingredient.quantity,
                        <br />,
                      ])
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

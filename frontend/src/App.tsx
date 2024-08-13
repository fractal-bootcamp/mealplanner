import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Calendar, DayComponent } from "./components/calendar";

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

const newWeek: Week = {
  days: [
    {
      meals: [
        {
          recipes: [
            {
              name: "Cheeseburger",
              ingredients: [{ name: "Cheese", quantity: "100g" }],
            },
            {
              name: "Fries",
              ingredients: [{ name: "Potatoes", quantity: "100g" }],
            },
            {
              name: "Salad",
              ingredients: [{ name: "Lettuce", quantity: "100g" }],
            },
          ],
        },
      ],
    },
    {
      meals: [
        {
          recipes: [
            {
              name: "Cheeseburger",
              ingredients: [{ name: "Cheese", quantity: "100g" }],
            },
            {
              name: "Fries",
              ingredients: [{ name: "Potatoes", quantity: "100g" }],
            },
            {
              name: "Salad",
              ingredients: [{ name: "Lettuce", quantity: "100g" }],
            },
          ],
        },
      ],
    },
  ],
};

const newDay: Day = {
  meals: [
    {
      recipes: [
        {
          name: "Pizza",
          ingredients: [{ name: "Cheese", quantity: "100g" }],
        },
        {
          name: "Sushi",
          ingredients: [{ name: "Rice", quantity: "100g" }],
        },
        {
          name: "Pie",
          ingredients: [{ name: "Butter", quantity: "100g" }],
        },
      ],
    },
  ],
};

export default function App() {
  return (
    <>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <div>
        <h1>Home</h1>
        <Calendar week={newWeek} />
        <DayComponent day={newDay} />
      </div>
    </>
  );
}

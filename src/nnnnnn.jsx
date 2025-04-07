export function Card({ meal }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-1/2 mx-auto">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-24 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{meal.strMeal}</h2>
        <p className="text-gray-600 text-sm">{meal.strInstructions}</p>
      </div>
    </div>
  )
}
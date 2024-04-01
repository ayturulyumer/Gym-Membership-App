export default function convertCardTypeToBulgarian(value) {
  switch (value) {
    case "monthly":
      return "Месечна";
    case "18workouts":
      return "18 тренировки";
    case "25workouts":
      return "25 тренировки";
    case "personalized":
      return "Персонализиранa";
    default:
      return value;
  }
}

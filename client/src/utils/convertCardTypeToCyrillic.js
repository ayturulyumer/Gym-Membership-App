export default function convertCardTypeToBulgarian(value) {
  switch (value) {
    case "monthly":
      return "Месечна";
    case "20workouts":
      return "20 тренировки";
    case "25workouts":
      return "25 тренировки";
    case "personalized":
      return "Персонализиранa";
    default:
      return value;
  }
}

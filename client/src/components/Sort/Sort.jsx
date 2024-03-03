export default function Sort() {
  return (
    <select
      className="select select-primary w-full max-w-xs select-sm tablet:select-md"
      defaultValue="default"
    >
      <option value="default">Сортиране по подразбиране</option>
      <option value="name">Име</option>
      <option value="status">Статус</option>
      <option value="remainingWorkouts">Oставащи тренировки</option>
    </select>
  );
}

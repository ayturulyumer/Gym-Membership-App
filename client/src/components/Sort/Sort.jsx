import { useState } from "react";
export default function Sort({ onSortChange }) {
  const [selectedOption, setSelectedOption] = useState("default");

  const handleSortChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSortChange(selectedValue); // Pass the selected sorting option to the parent component
  };
  return (
    <select
      className="select select-primary w-full max-w-xs select-sm tablet:select-md"
      value={selectedOption}
      onChange={handleSortChange}
    >
      <option value="default">Сортиране по подразбиране</option>
      <option value="expiringMemberships">Изтичащи членства</option>
      <option value="expiredMemberships">Изтекли членства</option>
      <option value="remainingWorkouts">Oставащи тренировки</option>
    </select>
  );
}

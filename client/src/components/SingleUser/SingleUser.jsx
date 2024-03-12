import { useState } from "react";
import NoteIcon from "@mui/icons-material/Note";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from "@mui/icons-material/Delete";
import convertDateToBulgarian from "../../utils/convertDateToBulgarian.js";

export default function SingleUser({
  member,
  onRenewModalClick,
  onDeleteModalClick,
}) {
  // Get the current date & current member membership end date
  const currentDate = new Date();
  const userMembershipEndDate = member.endDate;

  // Convert the current date to ISO , so we can compare them , because they are not the same format
  const currentDateISO = currentDate.toISOString();

  // Calculate the remaining days until card expires
  const calculateRemainingDays = () => {
    // setUTCHours is to remove the time and only compare dates
    const diffTime =
      new Date(userMembershipEndDate).setUTCHours(0, 0, 0, 0) -
      new Date(currentDateISO).setUTCHours(0, 0, 0, 0);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <>
      <tr className="text-secondary text-lg font-bold th-center">
        <td className="badge text-secondary">{member.name}</td>
        <td>{member.cardType}</td>
        <td>
          <div
            className={
              currentDateISO > userMembershipEndDate
                ? "badge badge-error text-secondary font-bold"
                : "badge badge-success text-secondary font-bold"
            }
          >
            {currentDateISO > userMembershipEndDate ? "Изтекъл" : "Активен"}
          </div>
        </td>
        <td>
          <span className="badge ">
            {convertDateToBulgarian(member.startDate)}
          </span>
        </td>
        <td>
          <span className="badge ">
            {convertDateToBulgarian(member.endDate)}
          </span>
        </td>
        <td>
          <div className="badge badge-default text-secondary">
            {(() => {
              const remainingDays = calculateRemainingDays();
              if (remainingDays === 1) {
                return (
                  <>
                    {remainingDays} ден
                    {member.cardType.includes("тренировки") &&
                      ` / ${member.workouts} тренировки`}
                  </>
                );
              } else if (remainingDays > 1) {
                return (
                  <>
                    {remainingDays} дни
                    {member.cardType.includes("тренировки") &&
                      ` / ${member.workouts} тренировки`}
                  </>
                );
              } else {
                return ""; // Return empty string if remainingDays is less than 1
              }
            })()}
          </div>
        </td>
        <td className="flex gap-2 justify-center">
          <button className="tooltip" data-tip="Редактиране">
            <RemoveIcon htmlColor="yellow" />
          </button>{" "}
          <button
            className="tooltip"
            data-tip="Подновяване"
            onClick={onRenewModalClick}
          >
            <AutorenewIcon htmlColor="green" />
          </button>{" "}
          <button
            className="tooltip"
            data-tip="Изтриване"
            onClick={onDeleteModalClick}
          >
            <DeleteIcon htmlColor="red" />
          </button>{" "}
        </td>
      </tr>
    </>
  );
}

import NoteIcon from "@mui/icons-material/Note";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import convertDateToBulgarian from "../../utils/convertDateToBulgarian.js";

export default function SingleUser({ member }) {
  // Get the current date & current member membership end date
  const currentDate = new Date();
  const userMembershipEndDate = member.endDate;

  // Convert the current date to ISO , so we can compare them , because they are not the same format
  const currentDateISO = currentDate.toISOString();

  return (
    <tr className="text-secondary text-lg font-bold th-center">
      <td>{member.name}</td>
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
      <td>{convertDateToBulgarian(member.startDate)}</td>
      <td>{convertDateToBulgarian(member.endDate)}</td>
      <td>
        <div className="badge  badge-outline badge-success">30</div>
      </td>
      <td className="flex gap-2 justify-center">
        <button className="tooltip" data-tip="Подновяване">
          <AutorenewIcon htmlColor="green" />
        </button>{" "}
        <button className="tooltip" data-tip="Редактиране">
          <EditIcon htmlColor="yellow" />
        </button>{" "}
        <button className="tooltip" data-tip="Изтриване">
          <DeleteIcon htmlColor="red" />
        </button>{" "}
      </td>
    </tr>
  );
}

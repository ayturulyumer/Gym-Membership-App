import NoteIcon from "@mui/icons-material/Note";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function SingleUser() {
  return (
    <tr className="text-secondary text-lg font-bold th-center">
    <td>Hart Hagerty</td>
    <td>Месечна</td>
    <td>
    <div className="badge badge-success text-secondary font-bold">Активен</div>
    </td>
    <td>3/2/2024</td>
    <td>3/3/2024</td>
    <td><div className="badge  badge-outline badge-success">30</div></td>
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

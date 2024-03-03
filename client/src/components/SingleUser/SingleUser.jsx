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
      <button className="btn btn-success text-secondary font-bold btn-align-middle">
        Активен
      </button>
    </td>
    <td>3/2/2024</td>
    <td>3/3/2024</td>
    <td>30</td>
    <td className="flex gap-2 justify-center">
      <button>
        <NoteIcon />
      </button>{" "}
      <button>
        <AutorenewIcon htmlColor="green" />
      </button>{" "}
      <button>
        <EditIcon htmlColor="yellow" />
      </button>{" "}
      <button>
        <DeleteIcon htmlColor="red" />
      </button>{" "}
    </td>
  </tr>
  
  );
}

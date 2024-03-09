import GroupsIcon from "@mui/icons-material/Groups";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOffIcon from "@mui/icons-material/PersonOff";

export default function Stats({ members }) {
  return (
    <div className="stats shadow bg-primary text-secondary font-bold">
      <div className="stat">
        <div className="stat-figure text-primary">
          <GroupsIcon htmlColor="white" />
        </div>
        <div className="stat-title text-success ">Общо членове</div>
        <div className="stat-value text-secondary">{members.length}</div>
      </div>

      <div className="stat">
        <div className="stat-figure">
          <AccessTimeIcon />
        </div>
        <div className="stat-title text-warning ">Изтичащи членства</div>
        <div className="stat-value">2</div>
      </div>
      <div className="stat">
        <div className="stat-figure">
          <PersonOffIcon />
        </div>
        <div className="stat-title text-error ">Изтекли членства</div>
        <div className="stat-value">1</div>
      </div>
    </div>
  );
}

import GroupsIcon from "@mui/icons-material/Groups";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { useEffect, useState } from "react";
import * as membersApi from "../../api/membersApi.js";

export default function Stats() {
  const [membersCount, setMembersCount] = useState(null);
  const [expiringMembersCount, setExpiringMembersCount] = useState(null);
  const [expiredMembersCount, setExpiredMembersCount] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const allMembers = await membersApi.getAllMembers();
        const expiringMembers = await membersApi.getExpiringMembers();
        const expiredMembers = await membersApi.getExpiredMembers();

        setMembersCount(allMembers);
        setExpiringMembersCount(expiringMembers);
        setExpiredMembersCount(expiredMembers);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  }, [membersCount,expiringMembersCount,expiredMembersCount]);

  return (
    <div className="stats shadow bg-primary text-secondary font-bold stats-vertical laptop:stats-horizontal">
      <div className="stat">
        <div className="stat-figure text-primary">
          <GroupsIcon htmlColor="white" />
        </div>
        <div className="stat-title text-success ">Общо членове</div>
        <div className="stat-value text-secondary">{membersCount?.length}</div>
      </div>

      <div className="stat">
        <div className="stat-figure">
          <AccessTimeIcon />
        </div>
        <div className="stat-title text-warning ">Изтичащи членства</div>
        <div className="stat-value">{expiringMembersCount?.length}</div>
      </div>
      <div className="stat">
        <div className="stat-figure">
          <PersonOffIcon />
        </div>
        <div className="stat-title text-error ">Изтекли членства</div>
        <div className="stat-value">{expiredMembersCount?.length}</div>
      </div>
    </div>
  );
}

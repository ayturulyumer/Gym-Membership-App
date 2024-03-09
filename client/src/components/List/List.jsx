import SingleUser from "../SingleUser/SingleUser.jsx";
import Search from "../Search/Search.jsx";
import Sort from "../Sort/Sort.jsx";
import AddMemberButton from "../AddMemberButton/AddMemberButton.jsx";
import CreateMemberModal from "../CreateMemberModal/CreateMemberModal.jsx";
import BadgeIcon from "@mui/icons-material/Badge";
import StyleIcon from "@mui/icons-material/Style";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import { useState } from "react";

export default function List({ members, addMemberToState }) {
  const [showAddMember, setShowAddMember] = useState(false);

  const toggleAddMemberButtonHandler = () => {
    setShowAddMember((prevState) => !prevState);
  };

  // Define array of objects for table header columns
  const tableHeaderColumns = [
    { icon: <BadgeIcon />, text: "Име" },
    { icon: <StyleIcon htmlColor="gray" />, text: "Вид карта" },
    { icon: <CardMembershipIcon htmlColor="lightblue" />, text: "Статус" },
    {
      icon: <CalendarMonthIcon htmlColor="lightgreen" />,
      text: "Начална дата",
    },
    { icon: <CalendarMonthIcon htmlColor="red" />, text: "Крайна дата" },
    { icon: <AccessTimeIcon htmlColor="yellow" />, text: "До изтичане" },
    { icon: <AdsClickIcon />, text: "Действия" },
  ];

  return (
    <div className="overflow-x-auto h-max ">
      <h1 className="text-center text-md mb-5 font-bold text-secondary">
        Списък с членове
      </h1>
      <div className="flex  justify-between align-baseline mb-2 gap-5 ">
        <Search />
        <AddMemberButton showAddMemberHandler={toggleAddMemberButtonHandler} />
        <Sort />
      </div>
      <table className="table table-zebra  border-black table-xs phone:table-sm  tablet:table-md laptop:tablet-lg ">
        {/* head */}
        <thead>
          <tr className="text-base th-center bg-primary text-secondary  ">
            {tableHeaderColumns.map((column, index) => (
              <th key={index}>
                <div className="flex flex-col items-center gap-1">
                  {column.icon}
                  <span>{column.text}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <SingleUser member={member} />
          ))}
        </tbody>
      </table>

      <div className="join grid grid-cols-2">
        <button className="join-item btn btn-outline text-secondary">
          Предишна страница
        </button>
        <button className="join-item btn btn-outline text-secondary">
          Следваща страница
        </button>
      </div>

      {showAddMember && (
        <CreateMemberModal onShowToggle={toggleAddMemberButtonHandler} addMemberToState={addMemberToState} />
      )}
    </div>
  );
}

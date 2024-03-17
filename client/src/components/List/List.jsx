import SingleUser from "../SingleUser/SingleUser.jsx";
import Search from "../Search/Search.jsx";
import Sort from "../Sort/Sort.jsx";
import AddMemberButton from "../AddMemberButton/AddMemberButton.jsx";
import CreateMemberModal from "../CreateMemberModal/CreateMemberModal.jsx";
import RenewMemberModal from "../RenewMemberModal/RenewMemberModal.jsx";
import DeleteMemberModal from "../DeleteMemberModal/DeleteMemberModal.jsx";
import DecreaseWorkoutConfirmationModal from "../DecreaseWorkoutConfirmationModal/DecreaseWorkoutConfirmationModal.jsx";
import Spinner from "../Spinner/Spinner.jsx";
import BadgeIcon from "@mui/icons-material/Badge";
import StyleIcon from "@mui/icons-material/Style";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import { useState } from "react";
import { addMember } from "../../api/membersApi.js";

export default function List({
  members,
  addMemberToState,
  updateMemberInState,
  deleteMemberFromState,
  loading,
  handleSearchChange,
  searchValue,
  onSortChange,
}) {
  const [showAddMember, setShowAddMember] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDecreaseWorkoutModal, setShowDecreaseWorkoutModal] =
    useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // When the modal opens also pass the member to selectedMember so it can be passed to the modal in this component
  const onRenewModalClick = (member) => {
    setSelectedMember(member);
    setShowRenewModal(!showRenewModal);
  };

  const toggleAddMemberButtonHandler = () => {
    setShowAddMember(!showAddMember);
  };

  const onDeleteModalClick = (member) => {
    setSelectedMember(member);
    setShowDeleteModal(!showDeleteModal);
  };

  const onDecreaseModalClick = (member) => {
    setSelectedMember(member);
    setShowDecreaseWorkoutModal(!showDecreaseWorkoutModal);
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
    <div className="overflow-x-auto h-max  ">
      <h1 className="text-center text-md mb-5 font-bold text-secondary">
        Списък с членове
      </h1>
      <div className="flex  justify-between align-baseline mb-2 gap-5 ">
        <Search
          searchValue={searchValue}
          handleSearchChange={handleSearchChange}
        />
        <AddMemberButton showAddMemberHandler={toggleAddMemberButtonHandler} />
        <Sort onSortChange={onSortChange} />
      </div>
      <table className="table table-zebra border-black table-xs   tablet:table-md laptop:table-lg">
        {/* head */}
        <thead>
          <tr className="text-xs  bg-primary text-secondary  laptop:text-lg ">
            {tableHeaderColumns.map((column, index) => (
              <th key={index}>
                <div className="flex flex-col items-center gap-2">
                  {column.icon}
                  <span>{column.text}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <SingleUser
              key={member._id}
              member={member}
              onRenewModalClick={() => onRenewModalClick(member)}
              onDeleteModalClick={() => onDeleteModalClick(member)}
              onDecreaseModalClick={() => onDecreaseModalClick(member)}
            />
          ))}
        </tbody>
      </table>

      {loading && <Spinner />}

      {showAddMember && (
        <CreateMemberModal
          onShowToggle={toggleAddMemberButtonHandler}
          addMemberToState={addMemberToState}
        />
      )}

      {showRenewModal && (
        <RenewMemberModal
          onClose={onRenewModalClick}
          member={selectedMember}
          renewMemberInState={updateMemberInState}
        />
      )}

      {showDeleteModal && (
        <DeleteMemberModal
          onClose={onDeleteModalClick}
          member={selectedMember}
          deleteMemberFromState={deleteMemberFromState}
        />
      )}

      {showDecreaseWorkoutModal && (
        <DecreaseWorkoutConfirmationModal
          onClose={onDecreaseModalClick}
          member={selectedMember}
          updateMemberInState={updateMemberInState}
        />
      )}
    </div>
  );
}

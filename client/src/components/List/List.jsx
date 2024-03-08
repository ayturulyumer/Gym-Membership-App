import SingleUser from "../SingleUser/SingleUser.jsx";
import Search from "../Search/Search.jsx";
import Sort from "../Sort/Sort.jsx";
import AddMemberButton from "../AddMemberButton/AddMemberButton.jsx";
import CreateMemberModal from "../CreateMemberModal/CreateMemberModal.jsx";
import { useEffect, useState } from "react";
import * as membersApi from "../../api/membersApi.js";

export default function List() {
  const [showAddMember, setShowAddMember] = useState(false);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    membersApi
      .getAllMembers()
      .then((data) => setMembers(data))
      .catch((err) => console.log(err));
  }, []);


  const toggleAddMemberButtonHandler = () => {
    setShowAddMember((prevState) => !prevState);
  };

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
            <th>Име</th>
            <th>Вид карта</th>
            <th>Статус</th>
            <th>Начална дата</th>
            <th>Крайна дата</th>
            <th>До изтичане</th>
            <th>Действия</th>
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
        <CreateMemberModal onShowToggle={toggleAddMemberButtonHandler} />
      )}
    </div>
  );
}

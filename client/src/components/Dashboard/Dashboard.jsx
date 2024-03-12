import List from "../List/List.jsx";
import Stats from "../Stats/Stats.jsx";
import Nav from "../Nav/Nav.jsx";
import { useState, useEffect } from "react";
import * as membersApi from "../../api/membersApi.js";
export default function Dashboard() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    membersApi
      .getAllMembers()
      .then((data) => setMembers(data))
      .catch((err) => console.log(err));
  }, []);

  //add member to state
  const addMember = (newMember) => {
    setMembers((prevMembers) => [newMember, ...prevMembers]);
  };

  // update renewed member in state
  const updateMember = (memberId, updatedData) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member._id === memberId ? (member = updatedData) : member
      )
    );
  };

  const deleteMember = (memberId) => {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member._id !== memberId)
    );
  };
  return (
    <>
      <Nav />
      <main className="mx-auto my-12 w-11/12 min-h-[calc(100vh - 13rem)] flex flex-col gap-10">
        <Stats members={members} />
        <List
          members={members}
          addMemberToState={addMember}
          updateMemberInState={updateMember}
          deleteMemberFromState={deleteMember}
        />
      </main>
    </>
  );
}

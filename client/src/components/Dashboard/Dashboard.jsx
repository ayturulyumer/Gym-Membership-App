import List from "../List/List.jsx";
import Stats from "../Stats/Stats.jsx";
import Nav from "../Nav/Nav.jsx";
import { useState, useEffect } from "react";
import * as membersApi from "../../api/membersApi.js";
import InfoMessage from "../InfoMessage/InfoMessage.jsx";
export default function Dashboard() {
  const [members, setMembers] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowLoading(true);
      if (searchValue === "") {
        // Fetch all members if search query is empty
        membersApi
          .getAllMembers()
          .then((data) => setMembers(data))
          .catch((err) => {
            setMessage("error");
            setErrorMessage(err.message);
            setTimeout(() => {
              setMessage("");
            }, 1000);
          })
          .finally(() => setShowLoading(false));
      } else {
        // Fetch members based on search query
        membersApi
          .searchMembers(searchValue)
          .then((data) => setMembers(data))
          .catch((err) => {
            setMessage("error");
            setErrorMessage(err.message);
            setTimeout(() => {
              setMessage("");
            }, 1000);
          })
          .finally(() => setShowLoading(false));
      }
    }, 500); // Delay of 500ms

    // Cleanup function to clear the timeout
    return () => clearTimeout(timerId);
  }, [searchValue]);

  console.log(members);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

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
        {message === "error" ? (
          <InfoMessage statusMessage={message} textMessage={errorMessage} />
        ) : (
          ""
        )}
        <List
          members={members}
          addMemberToState={addMember}
          updateMemberInState={updateMember}
          deleteMemberFromState={deleteMember}
          loading={showLoading}
          searchValue={searchValue}
          handleSearchChange={handleSearchChange}
        />
      </main>
    </>
  );
}

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
  const [sortValue, setSortValue] = useState("default");

  useEffect(() => {
    const fetchMembers = async () => {
      setShowLoading(true);
      try {
        let fetchedMembers;
        if (searchValue === "") {
          // Fetch all members if search query is empty
          fetchedMembers = await membersApi.getAllMembers();
        } else {
          // Fetch members based on search query
          fetchedMembers = await membersApi.searchMembers(searchValue);
        }
        setMembers(fetchedMembers);
      } catch (err) {
        setMessage("error");
        setErrorMessage(err.message);
        setTimeout(() => {
          setMessage("");
        }, 1000);
      } finally {
        setShowLoading(false);
      }
    };

    const timerId = setTimeout(fetchMembers, 500); // Set timeout for fetching members

    // Cleanup function to clear the timeout
    return () => clearTimeout(timerId);
  }, [searchValue]); // Only trigger the effect when searchValue changes

  useEffect(() => {
    // Fetch sorted members based on the selected sorting option
    if (sortValue !== "default") {
      setShowLoading(true);
      membersApi
        .getSortedMembers(sortValue)
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
  }, [sortValue]); // Only trigger the effect when sortValue changes

  const onSortChange = (value) => {
    setSortValue(value);
  };

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
          onSortChange={onSortChange}
        />
      </main>
    </>
  );
}

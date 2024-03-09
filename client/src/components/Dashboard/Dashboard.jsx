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

  return (
    <>
      <Nav />
      <main className="mx-auto my-12 w-11/12 min-h-[calc(100vh - 13rem)] flex flex-col gap-10">
        <Stats members={members} />
        <List members={members} />
      </main>
    </>
  );
}

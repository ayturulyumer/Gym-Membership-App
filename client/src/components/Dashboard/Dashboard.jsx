import List from "../List/List.jsx";
import Stats from "../Stats/Stats.jsx";
import Nav from "../Nav/Nav.jsx";
export default function Dashboard() {
  return (
    <>
      <Nav />
      <main className="mx-auto my-12 w-11/12 min-h-[calc(100vh - 13rem)] flex flex-col gap-10">
        <Stats />
        <List />
      </main>
    </>
  );
}

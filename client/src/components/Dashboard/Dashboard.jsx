import List from "../List/List.jsx";
import Stats from "../Stats/Stats.jsx";
export default function Dashboard() {
  return (
    <main className="mx-auto my-12 w-11/12 min-h-[calc(100vh - 13rem)] flex flex-col gap-10">
      <Stats/>
      <List />
    </main> 
  );
}

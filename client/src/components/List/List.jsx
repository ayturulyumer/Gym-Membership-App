import SingleUser from "../SingleUser/SingleUser.jsx";

export default function List() {
  return (
    <div className="overflow-x-auto mt-60" >
      <table className="table table-zebra sm:table-xs ">
        {/* head */}
        <thead className="mb-10">
          <tr className="text-base th-center bg-secondary text-primary">
            <th>Име</th>
            <th>Вид карта</th>
            <th>Статус</th>
            <th>Начална дата</th>
            <th>Крайна дата</th>
            <th>Оставащи тренировки</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
         <SingleUser/>
        </tbody>
      </table>
    </div>
  );
}


export default function convertDateToBulgarian(dateString) {
  const monthsInBulgarian = [
    "Януари",
    "Февруари",
    "Март",
    "Април",
    "Май",
    "Юни",
    "Юли",
    "Август",
    "Септември",
    "Октомври",
    "Ноември",
    "Декември",
  ];

  const date = new Date(dateString);
  const month = monthsInBulgarian[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

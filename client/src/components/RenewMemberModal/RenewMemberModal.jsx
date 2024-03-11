import { useState } from "react";
import { useForm } from "../../hooks/useForm.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import convertCardTypeToBulgarian from "../../utils/convertCardTypeToCyrillic.js";
import * as membersApi from "../../api/membersApi.js";
import InfoMessage from "../InfoMessage/InfoMessage.jsx";

export default function RenewMemberModal({
  onClose,
  member,
  renewMemberInState,
}) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [cardType, setCardType] = useState("default");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

  const onRenewMemberHandler = async (data) => {
    data.cardType = convertCardTypeToBulgarian(cardType);
    data.startDate = startDate;
    data.endDate = endDate;

    // Check if cardType is default
    if (data.cardType === "default") {
      setMessage("warning");
      setWarningMessage("Моля изберете  вид карта");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }

    // Check if Dates are empty
    if (
      (data.cardType == !"default" && data.startDate === null) ||
      data.endDate === null
    ) {
      setMessage("warning");
      setWarningMessage("Моля изберете начална и крайна дата");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }

    // change the workouts

    if (data.cardType === "20 тренировки") {
      data.workouts = 20;
    } else if (data.cardType === "25 тренировки") {
      data.workouts = 25;
    } else {
      data.workouts = "";
    }

    // if form values are valid
    let memberId = member._id;
    try {
      const renewedMemberInfo = await membersApi.renewMembership(
        memberId,
        data
      );
      renewMemberInState(memberId, renewedMemberInfo);
      setMessage("success");
      setTimeout(() => {
        onClose();
        setMessage("");
      }, 2000);
    } catch (error) {
      setMessage("error");
      setErrorMessage(error.message);
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  const { values, changeHandler, onSubmit } = useForm(
    {
      cardType: cardType,
      startDate: startDate,
      endDate: endDate,
      workouts: "",
    },
    onRenewMemberHandler
  );

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // Date can be choosen only if card type is Personalized otherwise it's autopicked 1 month for monthly / 3 months for other  card types
  const handleCardTypeChange = (event) => {
    setCardType(event.target.value);
    if (event.target.value === "monthly") {
      // Set start date to current date and end date to 1 month ahead
      const currentDate = new Date();
      const nextMonth = new Date(currentDate);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      setStartDate(currentDate);
      setEndDate(nextMonth);
    } else if (
      event.target.value === "20workouts" ||
      event.target.value === "25workouts"
    ) {
      const currentDate = new Date();
      const nextMonth = new Date(currentDate);
      nextMonth.setMonth(nextMonth.getMonth() + 3);
      setStartDate(currentDate);
      setEndDate(nextMonth);
    } else {
      // Reset date
      setStartDate(null);
      setEndDate(null);
    }
  };
  return (
    <>
      <dialog id="my_modal_2" className="modal" open>
        <div className="modal-box modal-top">
          {message === "warning" ? (
            <InfoMessage statusMessage={message} textMessage={warningMessage} />
          ) : message === "error" ? (
            <InfoMessage statusMessage={message} textMessage={errorMessage} />
          ) : message !== "success" && (
            <>
              <h1 className="text-center text-success font-extrabold mb-4">
                Подновяване на членство
              </h1>
              <h3 className="text-center text-secondary font-bold mb-4">
                Моля , изберете вид карта
              </h3>
              <p className="text-center  mb-4">
                Полетата с * са задължителни !
              </p>
            </>
          )}
          {message === "success" ? (
            <InfoMessage
              statusMessage={message}
              textMessage="Членството е успешно подновено"
            />
          ) : (
            <form
              className="flex flex-col gap-10 mt-4"
              method="POST"
              onSubmit={onSubmit}
            >
              <label className="input input-bordered flex items-center gap-2 text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                Име:
                <input
                  type="text"
                  className="grow"
                  name="name"
                  value={member.name}
                  disabled
                />
              </label>
              <label className="input input-bordered flex items-center gap-2 text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                  />
                </svg>
                Вид карта:
                <select
                  className="select select-ghost w-full max-w-xs"
                  value={cardType}
                  onChange={handleCardTypeChange}
                  name="cardType"
                >
                  <option value="default">Избери вид карта...</option>
                  <option value="monthly">Месечна</option>
                  <option value="20workouts">20 тренировки</option>
                  <option value="25workouts">25 тренировки</option>
                  <option value="personalized">Персонализиранa</option>
                </select>
                <span className="badge badge-warning text-primary">*</span>
              </label>
              <label className="input input-bordered flex items-center gap-2 text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="green"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>
                Начална дата:
                <DatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Изберете начална дата..."
                  disabled={cardType !== "personalized"}
                  name="startDate"
                />
                {cardType === "personalized" && (
                  <span className="badge badge-warning text-primary">*</span>
                )}
              </label>
              <label className="input input-bordered flex items-center gap-2 text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="red"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>
                Крайна дата:
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="Изберете крайна дата..."
                  disabled={cardType !== "personalized"}
                  name="endDate"
                />
                {cardType === "personalized" && (
                  <span className="badge badge-warning text-primary">*</span>
                )}
              </label>

              {cardType === "20workouts" && (
                <label className="input input-bordered flex items-center gap-2 text-secondary">
                  <FitnessCenterIcon />
                  Общо тренировки:
                  <input
                    type="text"
                    className="grow"
                    name="workouts"
                    value="20"
                    disabled
                  />
                </label>
              )}
              {cardType === "25workouts" && (
                <label className="input input-bordered flex items-center gap-2 text-secondary">
                  <FitnessCenterIcon />
                  Общо тренировки:
                  <input
                    type="text"
                    className="grow"
                    name="workouts"
                    value="25"
                    disabled
                  />
                </label>
              )}
              <div className="flex justify-around mt-2">
                <button className="btn btn-error" onClick={onClose}>
                  Откажи
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
                <button className="btn btn-success" type="submit">
                  Поднови
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}

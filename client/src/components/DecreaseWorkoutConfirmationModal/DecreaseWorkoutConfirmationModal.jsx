import InfoMessage from "../InfoMessage/InfoMessage.jsx";
import * as memberApi from "../../api/membersApi.js";
import { useState } from "react";

export default function DecreaseWorkoutConfirmationModal({
  onClose,
  member,
  updateMemberInState,
}) {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const decreaseWorkoutHandler = async () => {
    try {
      const updatedUser = await memberApi.decreaseMemberWorkout(member._id);
      updateMemberInState(member._id, updatedUser);
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

  return (
    <>
      <dialog id="my_modal_2" className="modal" open>
        <div className="modal-box modal-top">
          {message === "success" ? (
            <InfoMessage
              statusMessage={message}
              textMessage={`Тренировките на ${
                member.name
              } са успешно намалени от ${member.workouts} на ${
                member.workouts - 1
              }`}
            />
          ) : message === "error" ? (
            <InfoMessage statusMessage={message} textMessage={errorMessage} />
          ) : (
            <>
              <h1 className="text-center text-secondary  mb-10">
                Сигурни ли сте ,че искате да намалите оставащите тренировки на{" "}
                <span className="text-warning font-bold"> {member.name} </span>?
              </h1>
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
                <button
                  className="btn btn-success"
                  onClick={decreaseWorkoutHandler}
                >
                  Потвърди
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
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}

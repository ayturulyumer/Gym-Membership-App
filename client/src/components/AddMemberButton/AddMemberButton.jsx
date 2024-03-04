import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";

export default function AddMemberButton() {
  return (
    <button className="btn btn-active btn-primary text-secondary btn-sm tablet:btn-md">
      Добави член<PersonAddAltRoundedIcon />
    </button>
  );
}

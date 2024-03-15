import TextBox from "./TextBox";
import { forwardRef } from "react";
import { createPortal } from "react-dom";
import "../css/eventModal.css";
const EventModal = forwardRef(function EventModal({ event, onClick }, ref) {
  return createPortal(
    <dialog ref={ref} className="modal-dialog">
      <h2> {event.tag}</h2>
      <form method="dialog" onSubmit={onClick}>
        <TextBox label={"Title"} value={event.title} />
        <TextBox label={"Tag"} value={event.tag} />
        <button>Close</button>
        <button type="submit" className="SaveButton">
          Save
        </button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});
export default EventModal;

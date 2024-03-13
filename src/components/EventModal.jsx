import TextBox from "./TextBox";
import { forwardRef } from "react";
import { createPortal } from "react-dom";
import "../css/eventModal.css";
const EventModal = forwardRef(function EventModal({ event }, ref) {
  return createPortal(
    <dialog ref={ref} className="modal-dialog">
      <TextBox label={"Title"} value={event.title} />
      <TextBox label={"Tag"} value={event.tag} />
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});
export default EventModal;

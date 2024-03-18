import "../css/leftPanel.css";
import TextEditor from "./TextEditor.jsx";
import EventInput from "./EventInput.jsx";
export default function LeftPanel() {
  return (
    <>
      <div className="LeftPanel">
        <EventInput></EventInput>
        <TextEditor></TextEditor>
      </div>
    </>
  );
}

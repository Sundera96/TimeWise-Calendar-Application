import "../css/eventPill.css";

export default function EventPill({ title, link, type, onClick }) {
  return (
    <div
      className="EventPill"
      onClick={() => {
        onClick(type, link);
      }}
    >
      <p>{title}</p>
    </div>
  );
}

import "../css/eventPill.css";

export default function EventPill({ title, link, onClick, type }) {
  return (
    <div
      className={`EventPill ${type}`}
      onClick={() => {
        onClick(link);
      }}
    >
      <p>{title}</p>
    </div>
  );
}

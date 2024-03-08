import EventPill from "./EventPill.jsx";
export default function Day({ cellValue, ...props }) {
  let listOfObjects = ["Hello can this title fit in", "Hello", "Hola"];
  return (
    <div {...props}>
      <div>{cellValue}</div>
      <EventPill title={listOfObjects[0]} />
      <EventPill title={listOfObjects[1]} />
      <EventPill title={listOfObjects[2]} />
    </div>
  );
}

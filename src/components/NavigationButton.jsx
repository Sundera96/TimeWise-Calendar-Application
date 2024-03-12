import "../css/navigationButton.css";
export default function NavigationButton({ onClick, name }) {
  return <button onClick={onClick}>{name}</button>;
}

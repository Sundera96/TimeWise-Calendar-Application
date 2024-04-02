import '../css/tabButton.css';
export default function TabButton({onClick,...props}){

    return <button onClick={()=>{onClick(props.children)}} {...props}>{props.children}</button>
}
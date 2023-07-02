import ".././ComponentCss/MainButton.css";


function MainButton(props) {
  return (
    <button className="button-85" role="button" onClick={props.onClick}><span class="text" >{props.children}</span></button>
  );
}

export default MainButton;

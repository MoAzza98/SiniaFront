import ".././ComponentCss/MainButton.css";


function MainButton(props) {
  return (
    <button className="button-85" role="button"><span class="text" onClick={props.onClick}>{props.children}</span></button>
  );
}

export default MainButton;

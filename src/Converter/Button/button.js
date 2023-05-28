//reuseable button component.
import styles from "./button.module.css"; //my custom styles

//building className with a string literal using bootstrap styles
const Button = ({ type, children, color = "primary", onClick }) => {
  //color='primary' specifies default color if no color prop is passed in
  let classes = `btn btn-${color} mt-3 me-1 mb-3`;
  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

//building the classname with a string using styles from bootstrap module
const Button2 = ({ type, children, color = "primary", onClick }) => {
  // you can also pass in a function as a prop for the onClick on the button
  return (
    <button type={type} className={"btn btn-" + color} onClick={onClick}>
      {children}
    </button>
  );
};

//building className using styles from my custom module.css
const Button3 = ({ type, children, color = "primary", onClick }) => {
  return (
    <button
      type={type}
      className={[styles.btn, styles["btn-outline-" + color]].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

//LONG FORM CALCULATING CLASSES no toString necessary???
const Button4 = ({ type, children, color, onClick }) => {
  let classes = "btn btn-";
  classes += color !== "" ? color : "primary";

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export { Button };

//need to find out why it is that when calculating the classes this way you need to convert to string but
//in the above you don't need to
//also when passing the color prop to be used in this component it had to be converted to a string otherwise
//the component saw it as [object Object]
//   let stringcolor = {color} just did not work. Threw a React error something like Object can't be a React component or something like that

//////////////////////////////////////////////////////////////////////////////////////////////////
//A note on destructuring
//props can be passed in many ways;

//LONG FORM - ie not destructured...
// function Button (props){
//  let stringcolor = props.color.toString()
//  let classes = "btn btn-"
//  classes += props.color !== '' ? stringcolor : "primary";
//  return <button type={props.type} className={classes} >{props.children}</button>
// }

//LONG FORM destructuring - specify each prop and its new name...
// function Button (props){
//     let color = props.color
//     let type = props.type
//     let children = props.children
//  let stringcolor = color.toString()
//  let classes = "btn btn-"
//  classes += color !== '' ? stringcolor : "primary";
//  return <button type={type} className={classes} >{children}</button>
// }

// //SHORTER FORM  destructuring...using the braces is the equivalent of the longer form
// function Button (props){
//  let  {color, type, children } = props
//  let stringcolor = color.toString()
//  let classes = "btn btn-"
//  classes += color !== '' ? stringcolor : "primary";
//  return <button type={type} className={classes} >{children}</button>
// }

//SHORTEST FORM
// const Button1  = ({type, children, color='primary', onClick}) => {//color='primary' specifies default color if no color prop is passed in

//seeing the longer forms helps to concrete the idea in
//////////////////////////////////////////////////////////////////////////////////////////////////////

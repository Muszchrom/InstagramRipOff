export default function NextButton(props) {
  const execFunc = () => {
    props.step && props.setNextStep(props.step);
    props.optFunc && props.optFunc();
  }

  return (
    <div style={{display: "flex", flexDirection: "column", width: "fit-content", margin: "0 auto"}}>
      <button onClick={() => execFunc()} className="NextButton" htmlFor="inputFileInput">
        {props.text}
      </button>
    </div>
  );
}

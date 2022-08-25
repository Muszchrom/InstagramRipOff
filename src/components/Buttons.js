// majority of buttons need props { changeState() and toState }

// absolute white X
function CloseButton(props) {
  return (
    <button className="btnClear CloseButton" onClick={() => props.changeState(props.toState)}></button>
  )
}

//
function CloseButtonStatic(props) {
  //
  return (
    <div className="CloseButtonStaticWrapper">
      <button className="btnClear CloseButtonStatic" onClick={() => props.changeState(props.toState)}></button>
    </div>
  )
}

// absolute white arrow pointing left at the top of a view
function BackButton(props) {
  return (
    <button className="btnClear GoBackButton" onClick={() => props.changeState(props.toState)}>
      <span className="GoBackButtonInner"></span>
    </button>
  )
}

// absolute white arrow pointing left at the middle of a view
function BackButtonCenter(props) {
  return (
    <button className="btnClear GoBackButtonCenter" onClick={() => props.changeState(props.toState)}>
      <span className="GoBackButtonInner"></span>
    </button>
  )
}

// absolute white arrow pointing right at the middle of a view
function ForwardButtonCenter(props) {
  return (
    <button className="btnClear GoForwardButtonCenter" onClick={() => props.changeState(props.toState)}>
      <span className="GoBackButtonInner"></span>
    </button>
  )
}

// 3 white stripes for opening navigation
function Hamburger(props) {
  return (
    <button onClick={() => props.changeState(!props.currentState)} className="btnClear hamburgerContainer">
      <div className="hamburgerInner"></div>
      <div className="hamburgerInner"></div>
      <div className="hamburgerInner"></div>
    </button>
  )
}

function InputFilesButton(props) {
  return (
    <label htmlFor="InputFilesButton" className="InputFilesButton">
      {props.children}
      <input onChange={props.changeState} id="InputFilesButton" type="file" accept="image/*," multiple></input>
    </label>
  )
}

function NormalButton(props) {
  return (
    <button type={props.type} className="btnClear NormalButton" onClick={props.execFunc}>
      {props.children}
    </button>
  )
}
function NormalButtonDark(props) {
  return (
    <button type={props.type} className="btnClear NormalButton NormalButtonDark" onClick={props.execFunc}>
      {props.children}
    </button>
  )
}

export {
  CloseButton,
  CloseButtonStatic,
  BackButton,
  Hamburger,
  BackButtonCenter,
  ForwardButtonCenter,
  InputFilesButton,
  NormalButton,
  NormalButtonDark
}

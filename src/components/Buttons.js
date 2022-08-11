function CloseButton(props) {
  return (
    <button className="btnClear CloseButton" onClick={() => props.changeState(props.toState)}></button>
  )
}

function BackButton(props) {
  return (
    <button className="btnClear GoBackButton" onClick={() => props.changeState(props.toState)}>
      <span className="GoBackButtonInner"></span>
    </button>
  )
}

function BackButtonCenter(props) {
  return (
    <button className="btnClear GoBackButtonCenter" onClick={() => props.changeState(props.toState)}>
      <span className="GoBackButtonInner"></span>
    </button>
  )
}

function ForwardButtonCenter(props) {
  return (
    <button className="btnClear GoForwardButtonCenter" onClick={() => props.changeState(props.toState)}>
      <span className="GoBackButtonInner"></span>
    </button>
  )
}

function Hamburger(props) {
  return (
    <button onClick={() => props.changeState(!props.currentState)} className="btnClear hamburgerContainer">
      <div className="hamburgerInner"></div>
      <div className="hamburgerInner"></div>
      <div className="hamburgerInner"></div>
    </button>
  )
}

export { CloseButton, BackButton, Hamburger, BackButtonCenter, ForwardButtonCenter }

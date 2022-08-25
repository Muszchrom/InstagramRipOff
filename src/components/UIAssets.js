function LoadingAnimation(props) {
  return <><div style={{display: props.display}} className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></>
}

function APIerror() {
  return <span>Błąd z serwerem danych :/</span>
}

function Select(props) {
  return (
    <label className="SelectMenuLabel">
      {props.headingText}
      <select value={props.state} onChange={(e) => props.changeState(e.target.value)} className="SelectMenu">
        <option value="" disabled style={{display: "none"}}>Opcje:</option>
        <optgroup label="Dostępne grupy">
        {props.data.map((obj, index) => {
          return <option key={index} value={obj[props.value]}>{obj[props.label]}</option>
        })}
        </optgroup>
        <optgroup label="Opcje dodatkowe">
          <option value="new">+ Dodaj kategorię</option>
        </optgroup>
      </select>
    </label>
  )
}

export { LoadingAnimation, APIerror, Select }

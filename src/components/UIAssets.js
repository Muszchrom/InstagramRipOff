import { CloseButtonStatic } from './Buttons'

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

function Popup(props) {
  return (
    <div className="ModalWindowTransparent">
      <div className="popupContainer">
        <span className="popupText">
          {props.children}
        </span>
        <div className="duration"></div>
      </div>
    </div>
  )
}

//takes array of objects [{blob, fileName}, ...] and remove Image function
function ImagesToUploadPreview(props) {
  return (
    <div className="UploadImagesPreviewContainer">
      {props.imagesToUpload.map((file, index) => {
        return (
          <div className="UploadImagePreviewContainer" key={index}>
            <div className="UploadTextAndImageContainer">
              <div className="UploadImageContainer">
                <img className="ImageContain" src={file.blob} alt="I DONT EVEN KNOW MAN"/>
              </div>
              <span className="TextWrap">{file.fileName}</span>
            </div>
            <CloseButtonStatic changeState={props.removeImage} toState={index}/>
          </div>
        );
      })}
    </div>
  )
}

export { LoadingAnimation, APIerror, Select, Popup, ImagesToUploadPreview }

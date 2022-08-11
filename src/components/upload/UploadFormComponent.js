import {useEffect} from 'react';
export default function UploadFormComponent(props) {

  useEffect(() => {
    props.type === 'select' && (document.getElementById("category").selectedIndex = -1);
  }, [props.type]);

  return (
    <>
      <label htmlFor={props.hFor}>{props.labelText}</label>
      {props.type === 'text' ? (
        <input
          onChange={(e) => props.setValue(e.target.value)}
          id={props.hFor}
          type={props.type}
          placeholder={props.placeholder}
          className="UploadInput"/>
      ) : (props.type === 'textarea' ? (
        <textarea
          onChange={(e) => props.setValue(e.target.value)}
          id={props.hFor}
          placeholder={props.placeholder}
          className="UploadInput"
          style={{resize: "none"}}/>
      ) : (props.type === 'select' ? (
        <select
          required
          id="category"
          onChange={(e) => props.setValue(e.target.value)}
          type={props.type}
          className="UploadInput">
          {props.options.map((item, index) => {
            return <option key={index} value={item.normal}>{item.polish}</option>
          })}
        </select>
      ) : (
        <input
          onChange={(e) => {props.setValue(new Date(e.target.value).getTime())}}
          id={props.hFor}
          type={props.type}
          className="UploadInput"/>
      )
      ))}
    </>
  );
}

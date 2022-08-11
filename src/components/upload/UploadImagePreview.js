export default function UploadImagePreview(props) {
  return (
    <div className="UploadImagePreviewContainer">
      <div className="UploadTextAndImageContainer">
        <div className="UploadImageContainer">
          <img className="ImageContain" src={props.file} alt="I DONT EVEN KNOW MAN"/>
        </div>
        <span className="TextWrap">{props.fileName}</span>
      </div>
      <button className="TransparentButton" onClick={() => props.removeImage(props.index)}>
        <svg className="svgHover ReactiveSvg" version="1.1" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(128 128) scale(.72)">
            <g transform="translate(-175.05 -175.05) scale(3.89)" strokeLinecap="round">
              <path d="m8 90c-2.047 0-4.095-0.781-5.657-2.343-3.125-3.125-3.125-8.189 0-11.314l74-74c3.125-3.124 8.189-3.124 11.314 0 3.124 3.124 3.124 8.189 0 11.313l-74 74c-1.562 1.563-3.61 2.344-5.657 2.344z"/>
              <path d="m82 90c-2.048 0-4.095-0.781-5.657-2.343l-74-74c-3.125-3.124-3.125-8.189 0-11.313 3.124-3.124 8.189-3.124 11.313 0l74 74c3.124 3.125 3.124 8.189 0 11.314-1.561 1.561-3.608 2.342-5.656 2.342z"/>
            </g>
          </g>
        </svg>
      </button>
    </div>
  );
}

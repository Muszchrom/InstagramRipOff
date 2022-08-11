// import UploadIcon from '../../graphics/upload.svg';
// <img src={UploadIcon} alt="Upload icon, does nothing" style={{width: "24px", marginRight: "1em"}} />

export default function InputFilesButton(props) {
  return (
    <label className="inputFile" htmlFor="inputFileInput">
      Dodaj zdjęcia
      <input
        type="file"
        id="inputFileInput"
        accept="image/*,"
        multiple onChange={(e) => props.createImageNameArray(e.target.files)} />
    </label>
  );
}

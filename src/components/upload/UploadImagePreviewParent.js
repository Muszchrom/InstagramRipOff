import UploadImagePreview from './UploadImagePreview';

export default function UploadImagePreviewParent(props) {
  return (
    <div className="UploadImagesPreviewContainer">
      {props.uploadedImages.map((file, index) => {
        return (<UploadImagePreview file={file[0]} removeImage={props.removeImage} fileName={file[1]} index={index} key={index} alt="Preview..." />);
      })}
    </div>
  );
}

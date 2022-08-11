import { useState, useEffect } from 'react';

import InputTypeFileButton from './InputTypeFileButton';
import UploadImagePreviewParent from './UploadImagePreviewParent';
import NextButton from './NextButton';
import UploadForm from './UploadForm';

export default function Upload() {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [nextStep, setNextStep] = useState(0);
  const [rawUploadedImages, setRawUploadedImages] = useState();

  useEffect(() => {
    nextStep === 0 && (
      uploadedImages.length
        ? document.querySelector('.inputFile').style.display = "none"
        : document.querySelector('.inputFile').style.display = "flex"
    );
  });

  const createImageNameArray = (e) => {
    // e == e.target.files
    const files = Array.from(e).map((file, index) => {
      const x = URL.createObjectURL(file);
      return [x, file.name];
    });
    setUploadedImages(files);
  }

  const removeImage = (index) => {
    const data = new DataTransfer();
    const input = document.getElementById('inputFileInput');
    const { files } = input;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (index !== i) {
        data.items.add(file)
      }
    }
    input.files = data.files
    createImageNameArray(input.files);
  }

  const storeImages = () => {
    const a = document.getElementById('inputFileInput').files;
    setRawUploadedImages(a);
  }

  const postData = (data) => {
    const url = 'http://localhost:5000/images';
    const newData = new FormData();

    for (let file of rawUploadedImages) {
      newData.append('files', file, file.name);
    }

    newData.append('title', data.title);
    newData.append('description', data.description);
    newData.append('country', data.country);
    newData.append('city', data.city);
    newData.append('place', data.place);
    newData.append('timestamp', data.date);
    newData.append('category', data.category);

    fetch(url, {
      method: 'POST',
      body: newData,
      files: rawUploadedImages
    })
      .then((response) => {
        response.status === 500 && setNextStep(-1);
        response.status === 201 && setNextStep(2);
        console.log(response);
      })
      .catch((err) => {
        setNextStep(-1);
        console.log(err);
      });
  }

  return (
    <div style={{padding: "0 1em"}}>
      {nextStep === 0 ? (
        <>
          <InputTypeFileButton createImageNameArray={createImageNameArray} />
          <UploadImagePreviewParent uploadedImages={uploadedImages} removeImage={removeImage} />
          { uploadedImages.length ? (
            <div>
              <NextButton optFunc={storeImages} setNextStep={setNextStep} step={1} text="Wyślij zdjęcia"/>
              <NextButton optFunc={storeImages} setNextStep={setNextStep} step={1} text="Utwórz post"/>
            </div>
          ) : <></> }
        </>
      ) : (nextStep === 1 ? (
          <UploadForm postData={postData} setNextStep={setNextStep}/>
      ) : (nextStep === -1 ? (
        <h1 style={{textAlign: "center"}}>Błąd w formularzu</h1>
      ) : <h1 style={{textAlign: "center"}}>Wysłano!</h1>))}
    </div>
  );
}

import { InputFilesButton, NormalButton } from './Buttons'
import { ImagesToUploadPreview, Popup } from './UIAssets'
import { useState, useEffect, useRef} from 'react'

import vars from '../data/vars'

export default function UploadPosts () {
  const bottomText = useRef()
  const [imagesToUpload, setImagesToUpload] = useState([])
  const [popupMessage, setPopupMessage] = useState('')
  const [step, setStep] = useState(0)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [place, setPlace] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setPopupMessage('')
    }, vars.delay)
  }, [popupMessage])

  useEffect(() => {
    if (imagesToUpload.length) {
      document.querySelector('.InputFilesButton').style.display = "none"
      bottomText.current.style.display = "none"
    } else {
      document.querySelector('.InputFilesButton').style.display = "block"
      bottomText.current.style.display = "block"
    }
  }, [imagesToUpload])

  const handleSubmit = () => {
    const timestamp = new Date().getTime()
    const images = []
    return {
      title: title,
      images: images,
      description: description,
      timestamp: timestamp,
      location: {
        country: country,
        city: city,
        place: place,
      }
    }
  }

  const handleImagesToUpload = (e) => {
    let files = e.target?.files
    if (e instanceof FileList) {
      files = e
    }
    if (files.length > 4) {
      setPopupMessage('Wybrano zbyt wiele plików')
      return
    }
    const images = Array.from(files).map((file, index) => {
      const blob = URL.createObjectURL(file)
      return {
        blob: blob,
        fileName: file.name
      }
    })
    setImagesToUpload(images)
  }
  const removeImage = (index) => {
    const data = new DataTransfer()
    const input = document.getElementById('InputFilesButton')
    const { files } = input
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (index !== i) {
        data.items.add(file)
      }
    }
    input.files = data.files
    handleImagesToUpload(input.files)
  }
  const handleSecondStep = (e) => {
    setStep(2)
  }

  return (
    <div style={{padding: "0 1em"}}>
      <InputFilesButton changeState={handleImagesToUpload}>Wybierz zdjęcia</InputFilesButton>
      <p ref={bottomText} className="comment">Maksymalna ilość zdjęć: 4</p>
      {!!popupMessage && <Popup>{popupMessage}</Popup>}
      {!!imagesToUpload.length && (
        !step
        ? <FirstStep imagesToUpload={imagesToUpload} removeImage={removeImage} execFunc={() => setStep(1)}/>
        : (step === 1
          ? <SecondStep setTitle={setTitle} title={title} setDescription={setDescription} description={description} execFunc={handleSecondStep}/>
          : (step === 2
          ? <ThirdStep setCountry={setCountry} setCity={setCity} setPlace={setPlace}/> : <></>
          )
        )
      )}
    </div>
  )
}

function FirstStep(props) {
  return (
    <>
      <ImagesToUploadPreview imagesToUpload={props.imagesToUpload} removeImage={props.removeImage} />
      <div className="eightyPercent">
        <NormalButton execFunc={props.execFunc}>Dalej</NormalButton>
      </div>
    </>
  )
}

function SecondStep(props) {
  const titleErr = useRef()
  const descriptionErr = useRef()

  const handleTitleChange = (e) => {
    if (e.target.value.length < 4) {
      titleErr.current.style.display = "block"
      titleErr.current.innerText = "Tytuł jest zbyt krótki"
    } else if (e.target.value.length > 24) {
      titleErr.current.style.display = "block"
      titleErr.current.innerText = "Tytuł jest zbyt długi"
    } else {
      titleErr.current.style.display = "none"
    }
    props.setTitle(e.target.value)
  }
  const handleDescriptionChange = (e) => {
    if (e.target.value.length < 4) {
      descriptionErr.current.style.display = "block"
      descriptionErr.current.innerText = "Opis jest zbyt krótki"
    } else if (e.target.value.length > 1000) {
      descriptionErr.current.style.display = "block"
      descriptionErr.current.innerText = "Opis jest zbyt długi"
    } else {
      descriptionErr.current.style.display = "none"
    }
    props.setDescription(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (titleErr.current.style.display === "none" && descriptionErr.current.style.display === "none") {
      props.execFunc()
    }
  }

  return (
    <form className="UploadForm" onSubmit={handleSubmit}>
      <label htmlFor="title" required>Tytuł</label>
      <input onChange={handleTitleChange} value={props.title} id="title" type="text" className="UploadInput" placeholder="Krótki tytuł"></input>
      <label htmlFor="description">Opis</label>
      <textarea required onChange={handleDescriptionChange} value={props.description} rows="4" id="description" className="UploadInput" placeholder="Opisz post"></textarea>
      <p className="error" ref={titleErr}></p>
      <p className="error" ref={descriptionErr}></p>
      <NormalButton type="submit">Dalej</NormalButton>
    </form>
  )
}

function ThirdStep(props) {
  const temp = (e) => {
    e.preventDefault()
  }
  return (
    <form className="UploadForm" onSubmit={temp}>
      <label htmlFor="country">Kraj</label>
      <input onChange={e => props.setCountry(e.target.value)} id="country" type="text" className="UploadInput" placeholder="Grecja"></input>
      <label htmlFor="city">Miasto</label>
      <input onChange={e => props.setCity(e.target.value)} id="city" type="text" className="UploadInput" placeholder="Ateny"></input>
      <label htmlFor="place">Miejsce</label>
      <input onChange={e => props.setPlace(e.target.value)} id="place" type="text" className="UploadInput" placeholder="Akropol"></input>
      <NormalButton type="submit" execFunc={props.execFunc}>Wyślij</NormalButton>
    </form>
  )
}

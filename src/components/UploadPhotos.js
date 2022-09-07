import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { InputFilesButton, NormalButton, NormalButtonDark } from './Buttons'
import { Select, LoadingAnimation, Popup, ImagesToUploadPreview } from './UIAssets'
import { fetchClusters, sendCluster, sendImages } from './fetchMethods'

export default function Upload() {
  const [imagesToUploadRawState, setImagesToUploadRawState] = useState()
  const [imagesToUpload, setImagesToUpload] = useState([])
  const [status, setStatus] = useState()
  const [clusters, setClusters] = useState([])
  const [choosenClusterId, setChoosenClusterId] = useState('')
  const [wantToCreateNewCluster, setWantToCreateNewCluster] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false)
  const [newlyCreatedClusterId, setNewlyCreatedClusterId] = useState('')
  const [popupMessage, setPopupMessage] = useState('Wysłano pomyślnie')

  const navigate = useNavigate()
  const delay = 2500

  // hide Popup
  useEffect(() => {
    setTimeout(() => {
      setShowPopup(false)
    }, delay)
  }, [showPopup])

  // hide or show FILE INPUT
  useEffect(() => {
    let inputFilesButtonStyle = document.querySelector('.InputFilesButton')
    inputFilesButtonStyle.style && (
      imagesToUpload.length
        ? inputFilesButtonStyle.style.display = 'none'
        : inputFilesButtonStyle.style.display = 'block'
    )
  }, [imagesToUpload])

  // fetch clusterNames
  useEffect(() => {
    fetchClusters()
      .then(response => {
        if (response.data) {
          setStatus(response.status)
          setClusters(response.data)
        } else {
          setStatus(response.status)
        }
        setNewlyCreatedClusterId('')
      })
  }, [newlyCreatedClusterId])

  const handleImagesToUpload = (e) => {
    let files = e.target?.files
    if (e instanceof FileList) {
      files = e
    }
    const images = Array.from(files).map((file, index) => {
      const blob = URL.createObjectURL(file)
      return {
        blob: blob,
        fileName: file.name
      }
    })
    setImagesToUploadRawState(files)
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

  const handleSubmit = () => {
    if (!choosenClusterId) {
      return
    }
    if (choosenClusterId === 'new') {
      setWantToCreateNewCluster(true)
    } else {
      setShowLoadingAnimation(true)
      setPopupMessage('Rozpoczęto wysyłanie')
      setShowPopup(true)
      sendImages(choosenClusterId, imagesToUploadRawState)
        .then(result => {
          setShowLoadingAnimation(false)
          setPopupMessage('Wysyłanie zakończone')
          setShowPopup(true)
          setTimeout(() => {
            navigate('/', { replace: true })
            console.log(result);
          }, delay)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  return (
    <div style={{padding: "0 1em"}}>
      {!!imagesToUpload.length && (
          wantToCreateNewCluster ? (
            <CreateNewCluster
              wantToCreateNewCluster={wantToCreateNewCluster}
              setWantToCreateNewCluster={setWantToCreateNewCluster}
              clusters={clusters}
              setNewlyCreatedClusterId={setNewlyCreatedClusterId}
              setShowPopup={setShowPopup}/>
          ) : (
            <>
              {!!showPopup && <Popup>{popupMessage}</Popup>}
              <UploadPhotosMainPage
                handleSubmit={handleSubmit}
                choosenClusterId={choosenClusterId}
                setChoosenClusterId={setChoosenClusterId}
                clusters={clusters}
                imagesToUpload={imagesToUpload}
                removeImage={removeImage}
                showLoadingAnimation={showLoadingAnimation}/>
            </>
          )
      )}
      {status >= 500 && <Popup>Wystąpił problem z serwerem</Popup>}
      <InputFilesButton changeState={handleImagesToUpload}>Dodaj zdjęcia</InputFilesButton>
    </div>
  )
}

function UploadPhotosMainPage(props) {
  return (
    <>
      <ImagesToUploadPreview imagesToUpload={props.imagesToUpload} removeImage={props.removeImage}/>
      <div className="eightyPercent">
        {props.clusters.length
          ? (<Select
              headingText="Wybierz kategorię"
              state={props.choosenClusterId}
              changeState={props.setChoosenClusterId}
              data={props.clusters}
              value="_id"
              label="clusterName"/>)
          : <></>}
        {!!props.showLoadingAnimation && <LoadingAnimation display="block"/>}
        <NormalButton execFunc={props.handleSubmit}>{props.choosenClusterId === 'new' ? 'Dalej' : 'Wyślij'}</NormalButton>
        <p className="comment">Przesyłanie może potrwać kilka minut, w zależności od prędkości internetu jak i ilości zdjęć.</p>
        <p className="comment">Po zakończeniu przesyłania nastąpi przeniesienie na stronę główną.</p>
      </div>
    </>
  )
}


function CreateNewCluster(props) {
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false)
  const errorText = useRef()
  const [clusterName, setClusterName] = useState('')
  const [clusterURI, setClusterURI] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (clusterURI.length < 5) {
      setErrorMessage('Przyjazny link jest zbyt krótki (min. 5 znaków)')
      return
    }
    if (clusterURI.length > 40) {
      setErrorMessage('Przyjazny link jest zbyt długi (max. 40 znaków)')
      return
    }
    if (clusterName.length < 5) {
      setErrorMessage('Nazwa jest zbyt krótka (min. 5 znaków)')
      return
    }
    if (clusterName.length > 40) {
      setErrorMessage('Nazwa jest zbyt długa (max. 40 znaków)')
      return
    }
    if (props.clusters.some((cluster) => cluster.clusterURI === clusterURI)) {
      setErrorMessage('Podany link już istnieje')
      return
    }
    if (props.clusters.some((cluster) => cluster.clusterName === clusterName)) {
      setErrorMessage('Podana nazwa już istnieje')
      return
    }

    if (clusterURI.match(/^[a-z0-9-]{5,40}$/)) {
      setErrorMessage('')
    } else {
      setErrorMessage('Przyjazny link zawiera niedozolone znaki (a-z, 0-9, -)')
      return
    }

    setShowLoadingAnimation(true)

    sendCluster(clusterName, clusterURI)
      .then(response => {
        if (response.status === 201) {
          props.setNewlyCreatedClusterId(response.data.cluster._id)
          props.setWantToCreateNewCluster(false)
          props.setShowPopup(true)
        } else {
          setShowLoadingAnimation(false)
          setErrorMessage('Wystąpił błąd z serwerem')
        }
      })
      .catch(err => {
        setShowLoadingAnimation(false)
        setErrorMessage('Wystąpił błąd z serwerem i/lub aplikacją')
        console.log(err);
      })
  }

  useEffect(() => {
    if (errorMessage.length) {
      errorText.current.style.display = 'block'
    } else {
      errorText.current.style.display = 'none'
    }
  }, [errorMessage])

  return (
      <>
        <form onSubmit={handleSubmit} className="UploadForm">
          <label htmlFor="clusterName">Nazwa grupy</label>
          <input
            autoComplete="off"
            id="clusterName"
            className="UploadInput"
            type="text"
            value={clusterName}
            onChange={e => setClusterName(e.target.value)}
            placeholder="Grecja 2021"/>

          <label htmlFor="clusterURI">Przyjazny link</label>
          <input
            autoComplete="off"
            id="clusterURI"
            className="UploadInput"
            type="text"
            value={clusterURI}
            onChange={e => setClusterURI(e.target.value)}
            placeholder="grecja-2021"
            pattern="^[a-z0-9-]{5,40}$"/>
          {!!showLoadingAnimation && <LoadingAnimation display="block"/>}
          <p ref={errorText} className="error">{errorMessage}</p>
          <NormalButton type="submit" execFunc={handleSubmit}>Dodaj kategorię</NormalButton>
          <NormalButtonDark type="button" execFunc={() => props.setWantToCreateNewCluster(!props.wantToCreateNewCluster)}>Wstecz</NormalButtonDark>
        </form>
      </>
  )
}

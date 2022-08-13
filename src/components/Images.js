import {useState, useEffect} from 'react'
import { CloseButton, BackButtonCenter, ForwardButtonCenter } from './Buttons'
import { Navigate } from 'react-router-dom'
import LoadingAnimation from './UIAssets'
import { validateToken } from './Auth'

import sources from '../data/sources'

export default function ImageGrid(props) {
  const [fetchStatusCode, setFetchStatusCode] = useState(200)
  const [images, setImages] = useState([])
  const [imageCount, setImageCount] = useState(18);

  const [currentImageSource, setCurrentImageSource] = useState('')
  const [currentImageKey, setCurrentImageKey] = useState(0)

  const handleModal = (e) => {
    const arr = e.target.src.split('/')
    const name = arr[arr.length - 1]
    setCurrentImageSource(name)
    setCurrentImageKey(e.target.getAttribute('imagekey'))
  }

  const getSibling = (next) => {
    let key
    if (next === "previous") {
      key = parseInt(currentImageKey) - 1
    } else {
      key = parseInt(currentImageKey) + 1
    }
    const elementName = `img[imagekey='${key}']`
    if (document.querySelector(elementName).src) {
      setCurrentImageSource(document.querySelector(elementName).src)
    }
    if (key >= 0) {
      setCurrentImageKey(key)
    }
  }

  useEffect(() => {
    let ignore = false
    const startFetching = async () => {
      const fetchedImages = await fetch(sources.imageNames, {
        method: 'GET',
        credentials: 'include'
      })
      const jsonedImages = await fetchedImages.json()
      if (!ignore) {
        setFetchStatusCode(fetchedImages.status)
        setImages(jsonedImages)
      }
    }
    startFetching()
    return () => {ignore = true}
  }, [])


  return (
    <div className="ImageGrid">
    {fetchStatusCode !== 200 && <Navigate to="/login" replace />}
    {images.length > 0
      ? (<>
          {images.slice(0, imageCount).map((image, index) => {
              return (
                <div className="ImageImageGridContainer" key={index}>
                  <img
                    className="ImageImageGrid"
                    src={sources.imageFile + '360/' + image}
                    imagekey={index}
                    onClick={handleModal}
                    onError={() => validateToken(setFetchStatusCode)}
                    alt="One of many photos i took in greece"/>
                </div>
              )
            })
          }
          {currentImageSource.length > 0 && (
            <div className="ModalWindow">
              <CloseButton changeState={setCurrentImageSource} toState={''} />
              <BackButtonCenter changeState={getSibling} toState={'previous'} />
              <ForwardButtonCenter changeState={getSibling} toState={'next'} />
              <img
                className="ImageFullScale"
                src={sources.imageFile + '1080/' + currentImageSource}
                onError={() => validateToken(setFetchStatusCode)}
                alt="One of many photos i took in greece"/>
            </div>
          )}
      <button style={{margin: "1em auto"}} className="NextButton" onClick={() => setImageCount(imageCount + 18)}>Załaduj więcej zdjęć</button>
      </>
    ) : <LoadingAnimation display='block' />}
    </div>
  )
}

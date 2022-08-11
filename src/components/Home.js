import {useState} from 'react'
import sources from '../data/sources'

export default function Home(props) {
  const [toggleFullSizeImage, setToggleFullSizeImage] = useState('')
  const data = [
    {
      _id: '62dc2243b2da14eabfa1029c',
      title: 'Santorini',
      images: [
        '20210922_183809.jpg',
        '20210922_183557.jpg',
        '20210922_184138.jpg'
      ],
      category: {type: String, required: true },
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      timestamp: 1659368827605,
      location: {
        country: 'Grecja',
        city: 'Santorini',
        place: ''
      }
    },
    {
      _id: '62dc2243b2da14eabfa1029c',
      title: 'Santorini',
      images: [
        '20210922_183557.jpg',
        '20210922_183809.jpg',
        '20210922_184138.jpg'
      ],
      category: {type: String, required: true },
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      timestamp: 1659368827605,
      location: {
        country: 'Grecja',
        city: 'Santorini',
        place: ''
      }
    },
    {
      _id: '62dc2243b2da14eabfa1029c',
      title: 'Santorini',
      images: [
        '20210922_184138.jpg',
        '20210922_183809.jpg',
        '20210922_183557.jpg',
      ],
      category: {type: String, required: true },
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      timestamp: 1659368827605,
      location: {
        country: 'Grecja',
        city: 'Santorini',
        place: ''
      }
    }
  ]

  const imagesHost = sources.staticImages
  return (
    <div className="ImageColumn">
    {data.map((obj, index) => {
      const timestamp = new Date(obj.timestamp)
      const day = '0' + timestamp.getDate()
      const month = '0' + timestamp.getMonth()
      const year = timestamp.getFullYear()
      const date = `${day.substr(-2)}.${month.substr(-2)}.${year}`
      return (
        <div className="Image" key={index}>
          <div className="ImageHeader">
            <h3 className="ImageHeaderTitle">{obj.title}</h3>
            <span className="ImgeHeaderXY">{obj.location.country}, {obj.location.city}</span>
          </div>
          <img className="ImageImageColumn" src={imagesHost + obj.images[0]} onClick={(e) => setToggleFullSizeImage(e.target.src)} alt="One of many photos i took in greece"/>
          {toggleFullSizeImage && <ImageFullScale src={toggleFullSizeImage} setToggleFullSizeImage={setToggleFullSizeImage}/>}
          <div className="ImageFooter">
            <p className="ImageFooterDescription">{obj.description}</p>
            <span className="ImageFooterDate">{date}</span>
          </div>
        </div>
      )
    })}
    </div>
  )
}

function ImageFullScale(props) {
  return (
    <div className="ModalWindow">
      <img className="ImageFullScale" src={props.src} onClick={() => props.setToggleFullSizeImage('')} alt="One of many photos i took in greece"/>
    </div>
  )
}

import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { CloseButton, BackButton } from './Buttons'
import { LoadingAnimation, APIerror } from './UIAssets'
import { fetchClusters } from './fetchMethods'

import sources from '../data/sources'

export default function Nav(props) {
  const [toggleInnerNav, setToggleInnerNav] = useState(false)

  useEffect(() => {
    const path = window.location.pathname.split('/')
    let el = document.querySelectorAll("a[href='/" + path[1] + "']")[0] || document.getElementById('fakeAnchor')
    if (el) {
      el.classList += " NavListItemCurrent"
    }
  }, [toggleInnerNav])

  return (
    <div className="ModalWindow">
      <nav className="Nav">
        <ul className="NavList">
          <CloseButton changeState={props.setShowMenu} toState={!props.showMenu}/>
          {toggleInnerNav ? (
            <SecondaryMenu toggleInnerNav={toggleInnerNav} setToggleInnerNav={setToggleInnerNav}/>
          ) : (
            <MainMenu toggleInnerNav={toggleInnerNav} setToggleInnerNav={setToggleInnerNav}/>
          )}
        </ul>
      </nav>
    </div>
  )
}

function MainMenu(props) {
  return (
    <>
      <Link to="/" className="NavListItem">Home</Link>
      <span id="fakeAnchor" className="NavListItem" onClick={() => props.setToggleInnerNav(!props.toggleInnerNav)}>Zdjęcia</span>
      <Link to="utworz-post" className="NavListItem">Utwórz post</Link>
      <Link to="dodaj-zdjecia" className="NavListItem">Dodaj zdjęcia</Link>
      <Link to="logout" className="NavListItem NavListItemRed">Wyloguj się</Link>
    </>
  )
}

function SecondaryMenu(props) {
  const [clusters, setClusters] = useState([]);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    fetchClusters()
      .then(response => {
        if (response.data) {
          setStatus(response.status)
          setClusters(response.data)
        } else {
          setStatus(response.status)
        }
      })
  }, [])
  return (
    <>
      <BackButton changeState={props.setToggleInnerNav} toState={!props.toggleInnerNav}/>
      <span className="NavListItem NavListItemCurrent">Zdjęcia</span>
      {status === 0 ? (
        <LoadingAnimation display="block"/>
      ) : (status === 200 ? (
        clusters.map((obj, index) => {
          return <Link to={'zdjecia/' + obj.clusterURI} key={index} className="NavListItem">{obj.clusterName}</Link>
        })
      ) : (
        <APIerror />
      ))}
    </>
  )
}

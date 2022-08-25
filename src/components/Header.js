import { useState, useEffect } from 'react'

import { Outlet, useLocation } from 'react-router-dom'

import { Hamburger } from './Buttons'

import Nav from './Nav'

export default function Header(props) {
  const [showMenu, setShowMenu] = useState(false)
  const [title, setTitle] = useState('Home')

  const location = useLocation()

  useEffect(() => {
    setShowMenu(false)

    const loc = location.pathname.split('/')[1]
    if (loc === '') {
      setTitle('Home')
    } else if (loc === 'zdjecia') {
      setTitle('Zdjęcia')
    } else if (loc === 'upload') {
      setTitle('Upload')
    } else if (loc === 'dodaj-zdjecia') {
      setTitle('Upload')
    } else {
      setTitle('Nie znaleziono strony')
    }
  }, [location])

  return (
    <div>
      <header className='AppHeader'>
        {showMenu && (
          <Nav setShowMenu={setShowMenu} showMenu={showMenu}/>
        )}
        <h1 className='PageTitle'>{title}</h1>
        <Hamburger changeState={setShowMenu} currentState={showMenu}/>
      </header>

      <Outlet />
    </div>
  )
}

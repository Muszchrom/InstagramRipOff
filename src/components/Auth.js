import { Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LoadingAnimation } from './UIAssets'

import sources from '../data/sources'

const logIn = async (username, password) => {
  try {
    const response = await fetch(sources.login, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    if (response.status === 200) {
      const token = await response.json()
      return token.jwt
    }
  } catch(err) {
    console.log(err)
  }
}
// PietruszkaOgonCzerwony
// Karol

const validateToken = async (setState) => {
  try {
    const response = await fetch(sources.verifyToken, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET',
      credentials: 'include',
    })
    setState(response.status)
  } catch(err) {
    console.log(err)
  }
}

function RequireAuth(props) {
  let location = useLocation()
  if (location === '/logout') {
    location = '/'
  }
  const [status, setStatus] = useState(0)

  useEffect(() => {
    validateToken(setStatus)
  }, [location])

  if (status === 200) {
    return props.children
  } else if (status === 403) {
    return <Navigate to="/login" state={{ from: location }} replace />
  } else if (status === 500){
    return <InternalServerError />
  }
  return <LoadingAnimation display='block'/>
}

function InternalServerError() {
  return <h1>Problem z serwerem 🥶</h1>
}

function LogOut() {
  const [status, setStatus] = useState(0)

  const logOut = async () => {
    try {
      const response = await fetch(sources.logout, {credentials: 'include'})
      setStatus(response.status)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    logOut()
  }, [status])

  if (status === 0) {
    return <LoadingAnimation display='block' />
  } else if (status === 200) {
    return <Navigate to="/login" state={{ from: '/' }} replace />
  }
}

export { RequireAuth, LogOut, logIn, validateToken }

import { useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { logIn } from './Auth'

export default function InputFilesButton(props) {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const errorText = useRef(null)
  const loadingAnimation = useRef(null)

  const navigate = useNavigate()
  const location = useLocation()

  let from = location.state?.from?.pathname || '/'
  if (from === '/logout') {
    from = '/'
  }

  const showErrorMessage = (choice) => {
    choice
    ? errorText.current.style.display = "block"
    : errorText.current.style.display = "none"
  }
  const showLoadingAnimation = (choice) => {
    choice
    ? loadingAnimation.current.style.display = "inline-block"
    : loadingAnimation.current.style.display = "none"
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    showLoadingAnimation(true)
    showErrorMessage(false)

    const returnedValue = await logIn(login, password)
    showLoadingAnimation(false)

    if (!returnedValue) {
      showErrorMessage(true)
      setLogin('')
      setPassword('')
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <div className="ModalWindow">
      <div style={{marginTop: "-5em"}}>
        <h1 className="heading">Logowanie</h1>
        <form onSubmit={handleSubmit} className="UploadForm">
          <label htmlFor="login">Login</label>
          <input
            autoComplete="nickname"
            id="login"
            className="UploadInput"
            type="text"
            value={login}
            onChange={e => setLogin(e.target.value)}/>

          <label htmlFor="password">Hasło</label>
          <input
            autoComplete="new-password"
            id="password"
            className="UploadInput"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}/>

          <div ref={loadingAnimation} className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          <p ref={errorText} className="error">Login i/lub hasło jest niepoprawne</p>
          <button type="submit" className="NextButton submitButton">Zaloguj się</button>
        </form>
        <p className="comment">Nie pamiętasz loginu i/lub hasła? Skontaktuj się z administratorem</p>
      </div>
    </div>
  );
}

import './App.css'

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import { RequireAuth, LogOut } from './components/Auth'
import Header from './components/Header'
import Home from './components/Home'
import UploadPhotos from './components/UploadPhotos'
import UploadPosts from './components/UploadPosts'
import LogIn from './components/LogIn'
import Images from './components/Images'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LogIn/>} />

          <Route
            element={
              <RequireAuth>
                <Header/>
              </RequireAuth>
            }
          >
            <Route path="/logout" element={<LogOut/>} />
            <Route path="/" element={<Home/>} />
            <Route path="zdjecia/:cluster" element={<Images/>} />
            <Route path="dodaj-zdjecia" element={<UploadPhotos />} />
            <Route path="utworz-post" element={<UploadPosts />} />
            <Route path="*" element={<NotFound/>} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

function NotFound() {
  return (
    <h1 style={{textAlign: "center"}}>404</h1>
  )
}

export default App

import './App.css'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Outlet } from 'react-router-dom'
import Banner from './components/Banner'

function App() {

  return (
    <div className='font-primary'>
      {/* <Navbar></Navbar> */}

      <Banner></Banner>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default App

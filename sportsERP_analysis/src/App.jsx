import './App.css'
import NavBar from './components/NavBar'
import StateHolder from './components/StateHolder'
function App() {

  return (
    <>
     <NavBar></NavBar>
     <div className='container-fluid p-3 '>
       <StateHolder></StateHolder>
     </div>
    </>
  )
}

export default App

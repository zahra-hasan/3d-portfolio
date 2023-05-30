//import router not sure what it does just yet
import { BrowserRouter } from 'react-router-dom';
//import the sections.jsx to the main app.jsx from the components folder
import { About, Contact, Experience, Feedbacks, 
  Hero, Navbar, Tech, Works, StarsCanvas } from './components';

//the main function that builds the page
const App = () => {
  return (
    //wrap everything inside a BrowserRouter component to allow "routing"?
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat
        bg-center'>
          <Navbar/>
          <Hero/>
        </div>
        <About/>
        <Experience/>
        <Tech/>
        <Works/>
        <Feedbacks/>
        <div className='relative z-0'>
          <Contact/>
          <StarsCanvas/>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App

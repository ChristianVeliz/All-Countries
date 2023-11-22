import {Route, Routes} from 'react-router-dom';
import Landing from './view/Landing/Landing';
import Home from './view/Home/Home';
import Detail from './view/Detail/Detail';
import Activities from './view/Activities/Activities';
import Form from './view/Form/Form';
function App() {
  return (
   <div >
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/form' element={<Form/>}/>
        <Route path='/activities' element={<Activities/>}/>
      </Routes>
   </div>
  )
}

export default App;

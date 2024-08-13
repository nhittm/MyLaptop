import { Outlet } from 'react-router-dom';
import './App.css';
import Menu from './Menu';


function App() {
  return (
    <div id='userlayout' className="container-fluid"> 
      <nav ><Menu/></nav>
      <main >
          <Outlet/>
      </main>
      <footer><p className='text-center p-4 fw-bolder text-uppercase fs-4 text-white'> Trần Thị Mỹ Nhi </p></footer>
    </div>
  );
}

export default App;
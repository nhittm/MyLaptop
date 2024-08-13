import './Admin.css';
import { Outlet } from 'react-router-dom';
import Menu from './Menu';
import { useSelector } from 'react-redux';
function Admin() {
  return (
      <div id='admin' className="container-fluid">
        <nav ><Menu/></nav>
        <main>
        <Outlet/>
        </main>
        <footer><p className='text-center p-4 fw-bolder text-uppercase'>TranThiMyNhi-ps30880</p> </footer>
      </div>
  );
}
export default Admin;
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { Provider } from 'react-redux';
import Home from './Home';
import { BrowserRouter,Routes, Route, } from "react-router-dom";
import GioiThieu from './GioiThieu';
import NotFound from './NotFound';
import ChiTiet from './ChiTiet';
import SPTrongLoai from './SPTrongLoai';
import ShowCart from './ShowCart';
import TimKiem from './TimKiem';
import ThanhToan from './ThanhToan';
import Admin from './QuanTri/Admin';
import SanPhamList from './QuanTri/SanPhamList';
import SanPhamSua from './QuanTri/SanPhamSua';
import SanPhamThem from './QuanTri/SanPhamThem';
import DangNhap from './DangNhap';
import UserInfo from './UserInfo';
import ProtectedRoute from './ProtectedRoute';
import Thoat from './Thoat';
import Themloai from './QuanTri/ThemLoai';
import ListLoai from './QuanTri/ListLoai';
import DangKy from './DangKy';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element= {  <><UserInfo/><App /></>  }>
          <Route path="/" element={<Home/>} />
          <Route path="/gioithieu" element={<GioiThieu/>} />
          <Route path="/sp/:id/:id_loai" element={<ChiTiet/>} />
          <Route path="/loai/:id_loai" element={<SPTrongLoai/>} />
          <Route path="/dangnhap" element={<DangNhap/>} />
          <Route path="/dangky" element={<DangKy/>} />        
          <Route path="/thoat" element={<Thoat/>} />
          <Route path="/timkiem" element={<TimKiem/>} />
          <Route path="/showcart" element={<ShowCart/>} />
          <Route path="/thanhtoan/" element={<ThanhToan/>} />
          <Route element={<NotFound/>} />
        </Route>
        <Route path="/admin" element={<><UserInfo/><ProtectedRoute/><Admin /></> }>
          <Route path="/admin/sp" element={<SanPhamList/>} />
          <Route path="/admin/sp/:id" element={<SanPhamSua/>} />
          <Route path="/admin/spthem" element={<SanPhamThem/>} />
          <Route path="/admin/loaithem" element={<Themloai/>} />
          <Route path="/admin/loai" element={<ListLoai/>} />
        </Route>
      </Routes>           
   </BrowserRouter>
  </Provider>
  
);

reportWebVitals();

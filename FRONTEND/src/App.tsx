import './global.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import NavBar from './components/Nav-bar/nav-bar';

import Login from './pages/Login';
import PageCart from './pages/PageCart';
import FinalizarCompra from './pages/FinalizarCompra';

import HomePage from './pages/HomePage';
import WheyProtein from './pages/WheyProtein';
import Creatina from './pages/Creatina';
import PreTreino from './pages/PreTreino';
import Glutamina from './pages/Glutamina';
import Hipercalorico from './pages/Hipercalorico';


import Provider from './context/Provider';
import AuthProvider from './context/AuthProvider';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Provider>
          <Header />
          <NavBar />
          <Content>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/WheyProtein" element={<WheyProtein />} />
              <Route path="/Creatina" element={<Creatina />} />
              <Route path="/preTreino" element={<PreTreino />} />
              <Route path="/Glutamina" element={<Glutamina />} />
              <Route path="/Hipercalorico" element={<Hipercalorico />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Carrinho" element={<PageCart />} />
              <Route path="/FinalizarCompra" element={<FinalizarCompra />} />
            </Routes>
          </Content>
          <Footer />
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
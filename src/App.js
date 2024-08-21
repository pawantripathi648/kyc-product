import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CompareProductsPage from './pages/CompareProductsPage';
import { CompareProvider } from './context/CompareContext';
import './App.css';

const { Content } = Layout;

const App = () => (
  <CompareProvider>
    <Router>
      <Layout>
        <Navbar />
        <Layout>
          <Sidebar />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content>
              <Routes>
                <Route path="/" element={<ProductDetailsPage />} />
                <Route path="/compare" element={<CompareProductsPage />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  </CompareProvider>
);

export default App;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductTable from '../components/ProductTable';

const ProductDetailsPage = () => {
  const [compareList, setCompareList] = useState([]);
  const navigate = useNavigate();

  const handleCompare = (product) => {
    if (!compareList.some(p => p.id === product.id)) {
      const updatedCompareList = [...compareList, product];
      setCompareList(updatedCompareList);

      if (updatedCompareList.length >= 2) {
        navigate('/compare', { state: { products: updatedCompareList } });
      }
    }
  };

  return <ProductTable onCompare={handleCompare} compareList={compareList} />;
};

export default ProductDetailsPage;

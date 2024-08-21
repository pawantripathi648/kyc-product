import React, { useContext, useEffect, useState } from 'react';
import { CompareContext } from '../context/CompareContext';
import CompareProducts from '../components/CompareProducts';
import { Modal, Table, Button } from 'antd';

const CompareProductsPage = () => {
  const { compareList, removeFromCompare, addToCompare } = useContext(CompareContext);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {
        setAvailableProducts(data.products);
      });
  }, []);

  const handleRemoveProduct = (productId) => {
    removeFromCompare(productId);
  };

  const handleAddMoreProducts = () => {
    selectedProducts.forEach((product) => {
      addToCompare(product);
    });
    setIsModalVisible(false);
    setSelectedProducts([]);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedProducts([]);
  };

  const handleSelectProduct = (product) => {
    if (
      !selectedProducts.some((p) => p.id === product.id) && 
      selectedProducts.length + compareList.length < 4
    ) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleDeselectProduct = (product) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
  };

  const modalColumns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        const isAlreadySelected = compareList.some(p => p.id === record.id) || selectedProducts.some(p => p.id === record.id);
        return (
          <Button 
            onClick={() => isAlreadySelected ? handleDeselectProduct(record) : handleSelectProduct(record)} 
            disabled={compareList.some(p => p.id === record.id) || (selectedProducts.length + compareList.length) >= 4}
          >
            {isAlreadySelected ? 'Selected' : 'Select'}
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <h2>Compare Products</h2>
      <CompareProducts
        products={compareList}
        onRemove={handleRemoveProduct}
        onAddMore={showModal}
      />

      <Modal
        title="Add More Products to Compare"
        visible={isModalVisible}
        onOk={handleAddMoreProducts}
        onCancel={handleCancel}
        okButtonProps={{ disabled: selectedProducts.length === 0 }}
      >
        <Table
          columns={modalColumns}
          dataSource={availableProducts}
          pagination={false}
          rowKey="id"
        />
      </Modal>
    </div>
  );
};

export default CompareProductsPage;

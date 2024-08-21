import React, { useContext, useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { CompareContext } from '../context/CompareContext';
import { useNavigate } from 'react-router-dom';

const ProductTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortedInfo, setSortedInfo] = useState({});
  const { compareList, addToCompare } = useContext(CompareContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {
        setData(data.products);
        setLoading(false);
      });
  }, []);

  const handleCompare = (product) => {
    addToCompare(product);

    if (compareList.length >= 1) {
      navigate('/compare');
    }
  };

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
    },
    {
      title: 'Discount',
      dataIndex: 'discountPercentage',
      key: 'discountPercentage',
      sorter: (a, b) => a.discountPercentage - b.discountPercentage,
      sortOrder: sortedInfo.columnKey === 'discountPercentage' && sortedInfo.order,
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      sorter: (a, b) => a.category.localeCompare(b.category),
      sortOrder: sortedInfo.columnKey === 'category' && sortedInfo.order,
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (url) => <img src={url} alt="product" style={{ width: 50 }} />
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          onClick={() => handleCompare(record)}
          disabled={compareList.some((p) => p.id === record.id)}
        >
          {compareList.some((p) => p.id === record.id) ? 'Added' : 'Compare'}
        </Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      onChange={handleChange}
      pagination
      rowKey="id"
      rowClassName={(record) =>
        compareList.some((p) => p.id === record.id) ? 'highlight-row' : ''
      }
    />
  );
};

export default ProductTable;

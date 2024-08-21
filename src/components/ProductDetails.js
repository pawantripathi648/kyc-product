import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';

const ProductTable = ({ onCompare }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {
        setData(data.products);
        setLoading(false);
      });
  }, []);

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Price', dataIndex: 'price', key: 'price', sorter: true },
    { title: 'Discount', dataIndex: 'discountPercentage', key: 'discountPercentage', sorter: true },
    { title: 'Brand', dataIndex: 'brand', key: 'brand' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
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
        <Button onClick={() => onCompare(record)} disabled={record.compared}>
          Compare
        </Button>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} loading={loading} pagination />;
};

export default ProductTable;

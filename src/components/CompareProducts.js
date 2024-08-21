import React from 'react';
import { Table, Button } from 'antd';

const CompareProducts = ({ products, onRemove, onAddMore }) => {
  const columns = products.map((product) => ({
    title: (
      <div>
        {product.title}
        <Button
          onClick={() => onRemove(product.id)}
          style={{ marginLeft: 8, marginTop: 8 }}
          type="danger"
        >
          Remove
        </Button>
      </div>
    ),
    dataIndex: product.id,
    key: product.id,
    render: (value) => <span>{value}</span>,
  }));

  const dataSource = [
    { key: 'price', attribute: 'Price', ...getProductAttributes('price') },
    { key: 'brand', attribute: 'Brand', ...getProductAttributes('brand') },
    { key: 'category', attribute: 'Category', ...getProductAttributes('category') },
    { key: 'discountPercentage', attribute: 'Discount', ...getProductAttributes('discountPercentage') },
    { key: 'description', attribute: 'Description', ...getProductAttributes('description') },
  ];

  function getProductAttributes(attribute) {
    const data = {};
    products.forEach((product) => {
      data[product.id] = product[attribute];
    });
    return data;
  }

  return (
    <div>
      {products.length > 0 ? (
        <>
          <Table
            columns={[
              {
                title: 'Attribute',
                dataIndex: 'attribute',
                key: 'attribute',
              },
              ...columns,
            ]}
            dataSource={dataSource}
            pagination={false}
            rowKey="key"
          />
          {products.length < 4 && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button onClick={onAddMore}>Add More</Button>
            </div>
          )}
        </>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>No products selected for comparison.</p>
          <Button onClick={onAddMore}>Add Products</Button>
        </div>
      )}
    </div>
  );
};

export default CompareProducts;

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductManagement() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99 },
    { id: 2, name: 'Backpack', category: 'Fashion', price: 39.99 },
    { id: 3, name: 'Coffee Maker', category: 'Appliances', price: 129.99 },
  ]);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [productId, setProductId] = useState(0);

  function resetForm() {
    setName('');
    setPrice(0);
    setCategory('');
  }

  function deleteProduct(product) {
    const updatedProducts = products.filter((prod) => prod.id !== product.id);
    setProducts(updatedProducts);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (productId === 0) {
      // Adding a new product
      const id = new Date().getTime();
      const newProduct = { id: id, name: name, category: category, price: parseFloat(price) };
      setProducts([...products, newProduct]);
    } else {
      // Updating the product
      const updatedProducts = products.map((prod) =>
        prod.id === productId ? { ...prod, name, category, price: parseFloat(price) } : prod
      );

      setProducts(updatedProducts);
    }

    setShowForm(false);
    resetForm();
  }

  function editProduct(prod) {
    setName(prod.name);
    setPrice(prod.price);
    setCategory(prod.category);
    setProductId(prod.id);
    setShowForm(true);
  }

  return (
    <div className='container'>
      <div className='card'>
        <div className='card-header'>
          <h2>List of Products</h2>
        </div>
        <div className='m-2 auto'>
          <button
            className='btn btn-outline-info'
            onClick={() => {
              setShowForm(true);
              setProductId(0); // Reset productId for adding a new product
            }}
          >
            Add New Product
          </button>
        </div>
        <div className='card-body'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.name}</td>
                  <td>{prod.price}</td>
                  <td>{prod.category}</td>
                  <td>
                    <button
                      className='btn btn-outline-danger'
                      onClick={() => deleteProduct(prod)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className='btn btn-outline-success'
                      onClick={() => editProduct(prod)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className='card mt-2'>
          <div className='card-body'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='name' className='form-label'>
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  className='form-control'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='category' className='form-label'>
                  Category
                </label>
                <input
                  type='text'
                  id='category'
                  className='form-control'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='price' className='form-label'>
                  Price
                </label>
                <input
                  type='text'
                  id='price'
                  className='form-control'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <br />
              <button className='btn btn-outline-primary' type='submit'>
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductManagement;

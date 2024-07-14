import React, { useState } from 'react'
import Header from './components/Header/Header'
import RegForm from './components/RegForm/RegForm'


const App = () => {
  const [products, setProducts] = useState([]);
  const [showBtnTxt, setShowBtntxt] = useState("Show All Products");

  const host = "http://localhost:5000";
  // const host = "https://assignment-backend-rouge.vercel.app";
  

  const handleShowDataClick = async () => {
    try {
      const res = await fetch(`${host}/api/products/details`);

      if (!res.ok) {
        throw new Error(`Error fetching data: ${res.status}`);
      }

      const data = await res.json();
      setProducts(data)
      setShowBtntxt('Refresh products')
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className='main-content'>
      <Header />
      <RegForm />
      <div className="display-data">
        <span className="show-data-btn" onClick={handleShowDataClick}>
          {showBtnTxt}
        </span>
        <div className="data-container">
          {products?.slice().reverse().map((product, i) => {
            return (
              <div className='product-list' key={i}>
                <h3>{product.model}</h3>
                <p>Category: {product.category}</p>
                <p>Serial Number: {product.serialNum}</p>
                <p>Date of Invoice: {product.dateOfInvoice.slice(0, 10)}</p>
                <p>Image path: {product.imagePath}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App
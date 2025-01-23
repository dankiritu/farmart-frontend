import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

// Components
import Product from '../../components/Product/Product'
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel'
import products from '../../products'  // Import the local products array

const HomeScreen = () => {
  const location = useLocation()
  const keyword = location && location.search

  console.log(keyword);

  return (
    <div>
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      <Row>
        {products.map((prod) => (
          <Col key={prod._id} sm={12} md={6} lg={4} xl={3}>
            <Product prod={prod} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default HomeScreen

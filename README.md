# Farmart E-commerce Application 


## Features
    - Full feature product shopping cart
    - Product reviews and ratings
    - Products Carousel
    - Product Pagination
    - Product Search
    - User authentication
    - User profile and orders
    - Admin console
    - Order management
    - Checkout Process (shipping and payment)
    - Paypal/Credit Card processing.

## Technologies incorporated:
    - React
    - React Router
    - JWT Authentication
    - Redux
    - Flask
    - Postgres
    - SQL
    - Paypal API
    - Bootstrap
    - Heroku and AWS deployment

## Plan Summary

Step 1: Plan and Design

The first step is to plan and design the e-commerce website. This involves defining the scope of the project, determining the features and functionality of the site, creating wireframes and mockups, and deciding on a color scheme and layout. This can be done using tools such as Figma, Sketch, or Adobe XD.

Step 2: Set Up the Backend

The backend of the e-commerce site will be built using Flask, a Python-based web framework. Flask provides a wide range of tools and libraries to create a robust and scalable backend. It includes features such as ORM, URL routing, authentication, and security.

To get started, you will need to install Django and create a new Flask project. You will also need to create a new Flask app for the e-commerce functionality. This app will contain the models, views, and templates required for the farmart site.

Step 3: Implement User Authentication

The farmart site will require user authentication to allow users to create an account, log in, and manage their profile. Django includes built-in authentication functionality that can be used to handle user registration, login, and logout.

Step 4: Set Up the Frontend

The frontend of the farmart site will be built using React, a popular JavaScript library for building user interfaces. React provides a flexible and scalable way to create dynamic and interactive web applications.

To get started, you will need to set up a React app and install the necessary dependencies. You will also need to create the required components and routes for the e-commerce functionality.

Step 5: Create the Product Catalog

The product catalog will contain all the products that are available for purchase on the farmart site. This will require creating a product model in Flask and setting up views and templates to display the products on the frontend.

Step 6: Implement Cart Functionality

The cart functionality allows users to add products to their cart and checkout when they are ready to purchase. This will require creating a cart model in Flask and implementing views and templates to manage the cart on the frontend.

Step 7: Implement Payment Gateway

To process payments, the farmart site will need to integrate with a payment gateway such as Stripe or PayPal. This will require setting up a payment gateway account and implementing the necessary API calls in Django and React.

Step 8: Manage Inventory and Orders

To keep track of inventory and orders, the farmart site will need to implement functionality to manage product stock levels and order status. This can be done using Django models and views.

Step 9: Test and Launch

Automated testing will be implented and frontend/backend applications will be deployed.

## How to run the frontend
Clone the repository
Go to the folder
```bash
cd farmart-frontend
```
install the dependencies
```bash
npm install
```
Start the development server
```bash
npm run dev
```

### NB: MAKE SURE TO CHANGE THE BELOW CODE SNIPPETS AND INTERGRATE THE BACKEND AND IMPLEMENT USER AUTHENTICATION FIRST BEFORE YOU RUN THE FRONTEND

### Backend reference
(https://github.com/nprasad2077/ecommerce-backend)


## Important Code snippets that have minor changes

### HomeScreen.jsx (original)

```js
import React from 'react'
import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch , useSelector} from 'react-redux'
import {listProducts} from '../../actions/productActions'
import { useLocation } from 'react-router-dom'


// Component
import Product from '../../components/Product/Product'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'
import Paginate from '../../components/Paginate/Paginate'
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel'

const HomeScreen = () => {
  const location = useLocation()
  let keyword = location && location.search
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products, page, pages} = productList

  console.log(keyword);


  useEffect(() => {
    dispatch(listProducts(keyword))

  }, [dispatch, keyword])



  return (
    <div>
        {!keyword && <ProductCarousel />}
        <h1>Latest Products</h1>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
            
            <div>
              <Row>
                  {products.map((prod) => (
                      <Col key={prod._id} sm={12} md={6} lg={4} xl={3}>
                          <Product prod={prod}/>
                      </Col>
                  ))}
              </Row>
              <Paginate pages={pages} page={page} keyword={keyword} />
            </div> 
        
        }
                  


    </div>
  )
}

export default HomeScreen
```

### productActions.jsx

```js
import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,

    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,

} from '../constants/productConstants'


export const listProducts = (keyword = '') => async (dispatch) => {

    try {
        dispatch({type: PRODUCT_LIST_REQUEST})

        const { data } = await axios.get(http://127.0.0.1:8000/api/products${keyword})

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })

    }

}

export const listTopProducts = () => async (dispatch) => {

    try {
        dispatch({type: PRODUCT_TOP_REQUEST})

        const { data } = await axios.get(http://127.0.0.1:8000/api/products/top/)

        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })

    }

}

export const listProductDetails = (id) => async (dispatch) => {

    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(http://127.0.0.1:8000/api/products/${id})

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })

    }

}

export const deleteProduct = (id) => async (dispatch, getState) => {

    try { 
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: Bearer ${userInfo.token}
            }
        }

        const {data} = await axios.delete(http://127.0.0.1:8000/api/products/delete/${id},config)

        dispatch({
            type:  PRODUCT_DELETE_SUCCESS,
        })

    } catch(error) {
        dispatch({
            type:  PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })

    }

}

export const createProduct = () => async (dispatch, getState) => {

    try { 
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: Bearer ${userInfo.token}
            }
        }

        const {data} = await axios.post(http://127.0.0.1:8000/api/products/create/,{}, config)

        dispatch({
            type:  PRODUCT_CREATE_SUCCESS,
            payload: data,
        })

    } catch(error) {
        dispatch({
            type:  PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })

    }

}

export const updateProduct = (product) => async (dispatch, getState) => {

    try { 
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: Bearer ${userInfo.token}
            }
        }

        const {data} = await axios.put(
            http://127.0.0.1:8000/api/products/update/${product._id}/,
            product, 
            config
        )

        dispatch({
            type:  PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS, 
            payload: data,
        })

    } catch(error) {
        dispatch({
            type:  PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })

    }

}

export const createProductReview = (productId, review) => async (dispatch, getState) => {

    try { 
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })

        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: Bearer ${userInfo.token}
            }
        }

        const {data} = await axios.post(
            http://127.0.0.1:8000/api/products/${productId}/reviews/,
            review, 
            config
        )

        dispatch({
            type:  PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data,
        })

    } catch(error) {
        dispatch({
            type:  PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })

    }

}
```

### ProductScreen.jsx

```js
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem, Form, FormFloating, FormLabel, FormControl, FormGroup } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {listProductDetails, createProductReview} from '../../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants'
import { useNavigate } from 'react-router-dom'

// Components 
import Rating from '../../components/Rating/Rating'
import products from '../../products'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'

const ProductScreen = () => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const {id} = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const {loading, error, product} = productDetails

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const {loading: loadingProductReview, error: errorProductReview, success: successProductReview} = productReviewCreate

  useEffect(() => {
    if(successProductReview){
      setRating(0)
      setComment('')
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
    }

    dispatch(listProductDetails(id))
  }, [dispatch, id, successProductReview])

  const addToCartHandler = () => {
    navigate(/cart/${id}?qty=${qty})

  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(
      id, {
        rating, 
        comment
      }
    ))
  }



  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Go Back</Link>
      {loading ?
        <Loader />
        : error
          ? <Message variant='danger'>{error}</Message>
        : (     
        <div> 
          
              <Row>
              <Col md={6}>
                <Image src={'http://127.0.0.1:8000'+ product.image} alt={product.name} fluid/>
              </Col>
      
              <Col md={3}>
                <ListGroup variant='flush'>
      
                  <ListGroupItem>
                    <h3>{product.name}</h3>
                  </ListGroupItem>
      
                  <ListGroupItem>
                    <Rating value={product.rating} text={${product.numReviews} reviews} color={'#f8e825'} />
                  </ListGroupItem>
      
                  <ListGroupItem>
                    Price: {product.price}
                  </ListGroupItem>
      
                  <ListGroupItem>
                    Description: {product.description}
                  </ListGroupItem>
      
                </ListGroup>
              </Col>
      
              <Col md={3}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroupItem>
                      <Row>
                        <Col>
                          Price: 
                        </Col>
                        <Col>
                          <strong>{product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroupItem>
      
                    <ListGroupItem>
                      <Row>
                        <Col>
                          Status: 
                        </Col>
                        <Col>
                          {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                        </Col>
                      </Row>
                    </ListGroupItem>

                    {product.countInStock > 0 && (
                      <ListGroupItem>
                        <Row>
                          <Col>Qty</Col>
                          <Col xs='auto' className='my-1'>
                            <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                              {
                                [...Array(product.countInStock).keys()].map((x) => (
                                  <option value={x + 1} key={x+1}>
                                    {x + 1}
                                  </option>
                                ))
                              }

                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    )}
      
                    <ListGroupItem>
                      <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock == 0}>Add to Cart</Button>
                    </ListGroupItem>
                  </ListGroup>
                </Card>
      
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                  <h4>Reviews</h4>
                  {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

                  <ListGroup variant='flush'>
                    {product.reviews.map((review) => (
                      <ListGroupItem key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} color='#f8e825'/>
                        <p>{review.createdAt.substring(0,10)}</p>
                        <p>{review.comment}</p>
                      </ListGroupItem>
                    ))}

                    <ListGroupItem>
                      <h4>Write a review</h4>

                      {loadingProductReview && <Loader />}
                      {successProductReview && <Message variant='success'>Review Submitted</Message>}
                      {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                      {userInfo ? (
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId='rating'>
                            <FormLabel>
                              Rating
                            </FormLabel>
                            <FormControl as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                              <option value=''>Select...</option>
                              <option value='1'>1 - Poor</option>
                              <option value='2'>2 - Fair</option>
                              <option value='3'>3 - Good</option>
                              <option value='4'>4 - Very Good</option>
                              <option value='5'>5 - Excellent</option>
                            </FormControl>
                          </Form.Group>

                          <FormGroup controlId='comment'>
                          <FormLabel>
                              Review
                            </FormLabel>
                            <FormControl as='textarea' rows={5} value={comment} onChange={(e) => setComment(e.target.value)}>
                            </FormControl>

                            <Button disabled={loadingProductReview} type='submit' variant='primary'>
                              Submit
                            </Button>

                          </FormGroup>

                        </Form>
                      ): (
                        <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                      )}
                    </ListGroupItem>
                      
                  </ListGroup>
              </Col>
            </Row>
        </div>
        
      )

      }

    </div>
  )
}

export default ProductScreen
```

### Product.jsx
```js
import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Components 
import Rating from '../Rating/Rating'

const Product = ({prod}) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={/product/${prod._id}}>
        <Card.Img src={'http://127.0.0.1:8000'+prod.image} />
      </Link>
      <Card.Body>
        <Link to={/product/${prod._id}}>
          <Card.Title as='div'>
            <strong>{prod.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <div className='my-3'>
            {prod.rating} from {prod.numReviews} reviews
            <Rating value={prod.rating} text={${prod.numReviews} reviews} color={'#f8e825'}/>
          </div>
        </Card.Text>
        <Card.Text as='h3'>${prod.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product

```# farmart-frontend
# farmart-frontend

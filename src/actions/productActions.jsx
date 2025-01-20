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

import { products } from '../products'  // Import the static data from products.js

export const listProducts = (keyword = '') => async (dispatch) => {

    try {
        dispatch({type: PRODUCT_LIST_REQUEST})

        // Simulate fetching products from static data
        let filteredProducts = products

        if (keyword) {
            filteredProducts = products.filter((prod) =>
                prod.name.toLowerCase().includes(keyword.toLowerCase())
            )
        }

        // Simulate a delay (like an API request)
        setTimeout(() => {
            dispatch({
                type: PRODUCT_LIST_SUCCESS,
                payload: filteredProducts
            })
        }, 1000)

    } catch (error) {
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

        // Simulate fetching top products (use static data or filter top-rated)
        const topProducts = products.filter((prod) => prod.rating >= 4)  // Example filter for top-rated products

        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: topProducts
        })

    } catch (error) {
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

        // Simulate fetching product details from static data
        const product = products.find((prod) => prod._id === id)

        if (!product) {
            throw new Error("Product not found")
        }

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: product
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.message
        })
    }
}

// The rest of the actions (delete, create, update, reviews) would typically be API-based. Since we're using static data,
// these will either require you to simulate actions or avoid them if not needed for the static scenario.

export const deleteProduct = (id) => async (dispatch, getState) => {
    // Since you're working with static data, delete functionality might be omitted.
    console.log("Delete product simulation - Product ID:", id)
}

export const createProduct = () => async (dispatch, getState) => {
    // Simulate product creation if needed
    console.log("Product creation simulation")
}

export const updateProduct = (product) => async (dispatch, getState) => {
    // Simulate updating product if needed
    console.log("Product update simulation - Product:", product)
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    // Simulate review creation
    console.log("Product review simulation - Product ID:", productId, "Review:", review)
}

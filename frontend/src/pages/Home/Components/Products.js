import React, { useState, useEffect, useContext } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';
import styles from "../Style/products.module.css"
import AuthContext from '../../../store/auth-context';

import { api_url } from '../../../config';
const url = api_url + "product/all/"

function Products() {
  const authCtx = useContext(AuthContext)
  
  const [products, setProducts] = useState();
  

  useEffect(() => {

    
    const fetchData = async () => {
      // const res = await axios.get(url)
      let res;
      const token = localStorage.getItem("token")
      if(token) {
        // const token = localStorage.getItem("token")

        const config = {
          headers: {
            "Authorization": `Token ${token}`
          }
        }

        res = await axios.get(url, config)
      } else {
        res = await axios.get(url)
      }
      
      const data = res.data
      // console.log(data)
      setProducts(data.map(product => {

        return (
          <div className={styles.product}>
            <Link to={`/product/${product.id}`}>
                <div><img src={product.image1} alt={product.name} className={styles.carouselImage} /></div>
            </Link>
            <div className={styles.productName}>
            <div ><b>{product.name}</b></div>
            <div >₹{product.price}</div>
            </div>
          </div>
        )

      }))
    }

    fetchData()

  }, [])

  return (
    <div class={styles.products}>
      {products}
    </div>
  )
}

export default Products
import "./Header.css";
import { Heart, Search as SearchIco, ShoppingCart } from "lucide-react";
import React from 'react'
import useFetch from "../../utils/useFetch";



const Header = () => {
  return ( 
    <>
      <header className="header-container">
        <div className="header-content">
          <ul className="left">
            <li>Home</li>
            <li>About</li>
            <li>Categories</li>
          </ul>

          <div className="center">electroDEV.</div>
          <div className="right">
            <SearchIco/>
            <Heart />
            <span className="shopping-cart">
              <ShoppingCart />
            </span>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header

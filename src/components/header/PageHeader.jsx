import React, {useEffect, useState} from "react";
import {Button} from "react-daisyui";
import {NavLink} from "react-router-dom";
import WalletSelectButton from "@/components/wallet/WalletSelectButton.jsx";
import DeroIslandsLogo3 from '@/assets/images/DeroIslandsLogo3.jpg';
import {ThemeToggle} from "@/components/common/ThemeToggle.jsx";

export const PageHeader = () => {


  return (
    <div className="navbar bg-primary h-32">
      <div className="navbar-start prose">
        <img className="mask mask-decagon h-20 mt-7" src={DeroIslandsLogo3} />
      <div className="mt-7 hidden sm:block">
        <NavLink to="/" className='no-underline bg-gray-50'><h1 className="">Dero Private Islands</h1></NavLink>
      </div>
      </div>
      <div className="navbar-center lg:flex sm:flex">
        <ul className="menu menu-horizontal px-1">
          {/*<li><a>Item 1</a></li>*/}
          <li tabIndex={0}>
            <a>
              <div className="prose-xl prose-strong">
                Activities
              </div>
              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
            </a>
            <ul className="p-2 divide-y">
              <li className='z-50 bg-primary-focus'>
                <NavLink className="navlink" to="archipelago">
                  <div className="navlink-text">Explore Archipelago</div>
                </NavLink>
              </li>
              <li className='z-50 bg-primary-focus'>
                  <NavLink className="navlink" to="claimisland">
                    <div className="navlink-text">Claim Your Private Island</div>
                  </NavLink>
              </li>
              <li className='z-50 bg-primary-focus'>
                <NavLink className="navlink" to="myisland">
                  <div className="navlink-text">My Island</div>
                </NavLink>
              </li>
              <li className='z-50 bg-primary-focus'>
                <NavLink className="navlink" to="about?view=features">
                  <div className="navlink-text">About</div>
                </NavLink>
              </li>
              <li className='z-50 bg-primary-focus'>
                <NavLink className="navlink" to="oao">
                  <div className="navlink-text">OAO</div>
                </NavLink>
              </li>
            </ul>
          </li>
          {/*<li><a>Item 3</a></li>*/}
        </ul>
      </div>
      <div className="navbar-end">
        <WalletSelectButton />
        <ThemeToggle />
      </div>
    </div>
  );
}

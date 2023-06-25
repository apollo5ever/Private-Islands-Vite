import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import WalletSelectButton from '@/components/wallet/WalletSelectButton.jsx';
import DeroIslandsLogo3 from '@/assets/images/DeroIslandsLogo3.jpg';
import { ThemeToggle } from '@/components/common/ThemeToggle.jsx';

export const PageHeader = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleMenuItemClick = () => {
    setIsDropDownOpen(false);
  };

  return (
    <div className="navbar h-32 bg-primary">
      <div className="navbar-start">
        <img className="mask mask-decagon mt-7 h-20" src={DeroIslandsLogo3} />
        <div className="mt-7 hidden sm:block">
          <NavLink to="/" className="bg-gray-50 no-underline">
            <h1 className="">Dero Private Islands</h1>
          </NavLink>
        </div>
      </div>
      <div className="navbar-center sm:flex lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li
            className={`dropdown ${isDropDownOpen ? 'open' : ''}`}
            tabIndex={0}
            onClick={() => setIsDropDownOpen(!isDropDownOpen)}
          >
            <a>
              <div className="">Activities</div>
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="dropdown-content z-50">
              <li className="z-50 bg-primary-focus">
                <NavLink className="navlink" to="archipelago">
                  <div className="navlink-text">Explore Archipelago</div>
                </NavLink>
              </li>
              <li className="z-50 bg-primary-focus">
                <NavLink className="navlink" to="claimisland">
                  <div className="navlink-text">Claim Your Private Island</div>
                </NavLink>
              </li>
              <li className="z-50 bg-primary-focus">
                <NavLink className="navlink" to="myisland">
                  <div className="navlink-text">My Island</div>
                </NavLink>
              </li>
              <li className="z-50 bg-primary-focus">
                <NavLink className="navlink" to="revenueshare">
                  <div className="navlink-text">COCO Revenue Share</div>
                </NavLink>
              </li>
              <li className="z-50 bg-primary-focus">
                <NavLink className="navlink" to="about?view=features">
                  <div className="navlink-text">About</div>
                </NavLink>
              </li>
              <li className="z-50 bg-primary-focus">
                <NavLink className="navlink" to="oao">
                  <div className="navlink-text">OAO</div>
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <WalletSelectButton />
        <ThemeToggle />
      </div>
    </div>
  );
};

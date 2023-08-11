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
        <img className="mask mask-decagon h-28" src={DeroIslandsLogo3} />
        <div className="mt-1 hidden md:block">
          <NavLink to="/" className="bg-gray-50 no-underline">
            <h1 className="text-default md:text-3xl">Dero Private Islands</h1>
          </NavLink>
        </div>
      </div>
      <div className="navbar-center sm:flex lg:flex">
        <WalletSelectButton />
        <ul className="menu menu-horizontal px-1">
          <li
            className={`dropdown ${isDropDownOpen ? 'open' : ''}`}
            tabIndex={0}
            onClick={() => setIsDropDownOpen(!isDropDownOpen)}
          >
            <a>
              <div className="text-default text-2xl">Explore the Islands</div>
              <svg
                className="fill-[#3B2FDF]"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="text-default dropdown-content z-50">
              <li className="z-50 bg-secondary-focus">
                <NavLink className="" to="archipelago">
                  <div className="text-xl">Explore Archipelago</div>
                </NavLink>
              </li>
              <li className="z-50 bg-secondary-focus">
                <NavLink className="" to="claimisland">
                  <div className="text-xl">Claim Your Private Island</div>
                </NavLink>
              </li>
              <li className="z-50 bg-secondary-focus">
                <NavLink className="" to="myisland">
                  <div className="text-xl">My Island</div>
                </NavLink>
              </li>
              <li className="z-50 bg-secondary-focus">
                <NavLink className="" to="revenueshare">
                  <div className="text-xl">COCO Revenue Share</div>
                </NavLink>
              </li>
              <li className="z-50 bg-secondary-focus">
                <NavLink className="" to="about?view=features">
                  <div className="text-xl">About</div>
                </NavLink>
              </li>
              <li className="z-50 bg-secondary-focus">
                <NavLink className="" to="oao">
                  <div className="text-xl">OAO</div>
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <ThemeToggle />
      </div>
    </div>
  );
};

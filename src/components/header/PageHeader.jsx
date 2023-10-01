import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import WalletSelectButton from '@/components/wallet/WalletSelectButton.jsx';
import { ThemeToggle } from '@/components/common/ThemeToggle.jsx';
import WalletToggle from '../tileView/header/walletToggle.jsx';
import DaemonToggle from '../tileView/header/daemonToggle.jsx';

export const PageHeader = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleMenuItemClick = () => {
    setIsDropDownOpen(false);
  };

  return (
    <div className="navbar h-24 bg-primary">
      <div className="navbar-start">
        <img
          className="mx-4 w-24"
          src="https://privateislands.fund/static/media/logotransparent.ee389a36cdf74af7b010.png"
        />
        <div className="mt-1 hidden md:block">
          <NavLink to="/" className="bg-gray-50 no-underline">
            <h1 className="md:text-3xl">Dero Private Islands</h1>
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
                <NavLink className="" to="lotto">
                  <div className="text-xl">COCO Lotto</div>
                </NavLink>
              </li>
              <li className="z-50 bg-secondary-focus">
                <NavLink className="" to="migration">
                  <div className="text-xl">Migration</div>
                </NavLink>
              </li>
              <li className="z-50 bg-secondary-focus">
                <NavLink className="" to="about?view=features">
                  <div className="text-xl">About</div>
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <WalletToggle />
        <DaemonToggle />
        <ThemeToggle />
      </div>
    </div>
  );
};

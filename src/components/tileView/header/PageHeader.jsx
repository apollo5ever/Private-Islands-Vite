import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import hamburger from '/src/assets/images/hamburger.png';
import { ThemeToggle } from '@/components/common/ThemeToggle.jsx';
import { useTheme } from '@/components/hooks/useTheme.js';

export const PageHeader = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <div
      style={{
        position: 'relative',
        height: '160px',
        backgroundImage:
          theme === 'dark'
            ? `url('/src/assets/parallax/HeaderBackgroundNight.png')`
            : `url('/src/assets/parallax/HeaderBackground.png')`,
        backgroundSize: 'cover',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '140px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
        }}
      >
        <div
          className="cursor-pointer font-fell text-accent"
          onClick={() => setIsDropDownOpen(!isDropDownOpen)}
        >
          <img
            src={hamburger}
            className="h-12 w-12"
            alt="Dero Private Islands"
          />
          {isDropDownOpen && (
            <div className="absolute left-12 top-10 z-50 rounded border bg-info text-xl shadow-lg">
              <NavLink to="archipelago" className="block border-b px-1">
                Explore Archipelago
              </NavLink>
              <NavLink to="claimisland" className="block border-b px-1">
                Claim Your Private Island
              </NavLink>
              <NavLink to="myisland" className="block border-b px-1">
                My Island
              </NavLink>
              <NavLink to="lotto" className="block border-b px-1">
                CoCo Lotto
              </NavLink>
              <NavLink to="migration" className="block border-b px-1">
                Migration
              </NavLink>
              <NavLink to="/about" className="block border-b px-1">
                About
              </NavLink>
            </div>
          )}
        </div>

        <NavLink to="/tiles" className="mx-auto">
          <h1 className="text-center font-fell text-7xl text-black">
            Dero Private Islands
          </h1>
        </NavLink>

        <ThemeToggle />
      </div>
    </div>
  );
};

{
  /* Adjusting the Mantle image */
}
{
  /*<img*/
}
{
  /*  src={mantle}*/
}
{
  /*  alt="Mantle"*/
}
{
  /*  style={{*/
}
{
  /*    position: 'absolute',*/
}
{
  /*    bottom: 0,*/
}
{
  /*    left: '50%',*/
}
{
  /*    transform: 'translateX(-50%)',*/
}
{
  /*    width: '80%',*/
}
{
  /*    height: 'auto',*/
}
{
  /*    objectFit: 'cover',*/
}
{
  /*  }}*/
}
{
  /*/>*/
}

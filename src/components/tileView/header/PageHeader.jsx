import { useContext, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import hamburger from '/src/assets/images/hamburger.png';
import { ThemeToggle } from '@/components/common/ThemeToggle.jsx';
import { useTheme } from '@/components/hooks/useTheme.js';
import WalletToggle from '@/components/tileView/header/walletToggle.jsx';
import { TileContext } from '@/components/providers/TileContext.jsx';

export const PageHeader = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useRef();
  const { theme } = useTheme();
  const { setSelectedTile } = useContext(TileContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (!event.target.closest('.menu-item')) {
          setIsDropDownOpen(false);
        }
      }
    };

    if (isDropDownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener on component unmount or when dropdown closes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropDownOpen]);

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
            ref={dropdownRef}
            src={hamburger}
            className="h-12 w-12"
            alt="Dero Private Islands"
          />
          {isDropDownOpen && (
            <div className="absolute left-12 top-10 z-50 rounded border bg-info text-xl shadow-lg">
              <NavLink
                to="archipelago"
                className="menu-item block border-b px-1"
                onClick={() => setSelectedTile(null)}
              >
                Explore Archipelago
              </NavLink>
              <NavLink
                to="claimisland"
                className="menu-item block border-b px-1"
              >
                Claim Your Private Island
              </NavLink>
              <NavLink to="lotto" className="menu-item block border-b px-1">
                CoCo Lotto
              </NavLink>
              <NavLink to="migration" className="menu-item block border-b px-1">
                Migration
              </NavLink>
              <NavLink to="/about" className="menu-item block border-b px-1">
                About
              </NavLink>
            </div>
          )}
        </div>

        <NavLink
          to="/tiles"
          className="mx-auto"
          onClick={() => setSelectedTile(null)}
        >
          <div className="text-center font-fell text-3xl text-black md:text-7xl">
            Dero Private Islands
          </div>
        </NavLink>

        <div className="flex items-center space-x-4">
          <WalletToggle />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

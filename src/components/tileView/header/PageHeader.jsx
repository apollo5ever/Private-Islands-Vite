import { useContext, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeToggle } from '@/components/common/ThemeToggle.jsx';
import { useTheme } from '@/components/hooks/useTheme.js';
import { TileContext } from '@/components/providers/TileContext.jsx';
import XSWDConnect from '../../xswdConnect';
import icon_island from '/src/assets/icons/icon_island.png';
import treasureChest from '/src/assets/icons/icon_locked-chest_tan.svg';
import navCompass from '/src/assets/icons/icon_nav_compass.png';
import litFlame from '/src/assets/icons/icon_fire_orange.svg';
import bottle from '/src/assets/icons/icon_bottle_blue.svg';

// TODO MTS - make nav_icon links - move typeFilterBar state to TileContext so I can use it in pageheader
export const PageHeader = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useRef();
  const { theme } = useTheme();
  const { setSelectedTile, isMobile } = useContext(TileContext);

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
    <header className="navigation_container sticky top-0 z-30 mb-6 grid h-[80px] w-full bg-gradient-to-b from-[#FDFBEA] via-[#F0EBDD] to-[#E5D7B9] px-4 shadow-md">
      <div className="main_navigation grid w-full grid-cols-4 items-center gap-y-6 lg:grid-cols-5">
        <div className="navbar col-span-2 grid">
          <div className="flex items-center justify-start gap-2">
            <div
              className="cursor-pointer"
              onClick={() => setIsDropDownOpen(!isDropDownOpen)}
            >
              <img
                src={icon_island}
                className="max-h-[50px] min-h-[40px] w-auto max-w-fit"
              />
              {isDropDownOpen && (
                <div className="absolute top-[80px] z-30 inline-block w-full rounded-b-lg bg-[#E5D7B9] shadow-lg md:w-1/2 lg:w-1/3">
                  <div className="space-y-1 px-2 pb-3 pt-2">
                    <NavLink to="/" className="menu-item block px-1 text-black">
                      Home
                    </NavLink>
                    <NavLink
                      to="/pi/archipelago"
                      className="menu-item block px-1 text-black"
                      onClick={() => setSelectedTile(null)}
                    >
                      Explore Archipelago
                    </NavLink>
                    <NavLink
                      to="/pi/claimisland"
                      className="menu-item block px-1 text-black"
                    >
                      Claim Your Private Island
                    </NavLink>
                    <NavLink
                      to="/pi/lotto"
                      className="menu-item block px-1 text-black"
                    >
                      CoCo Lotto
                    </NavLink>
                    <NavLink
                      to="/pi/migration"
                      className="menu-item block px-1 text-black"
                    >
                      Migration
                    </NavLink>
                    <NavLink
                      to="/pi/about"
                      className="menu-item block px-1 text-black"
                    >
                      About
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
            <div
              className="font-pica-fell relative cursor-pointer justify-start justify-items-start justify-self-start pr-3 text-2xl sm:text-3xl"
              onClick={() => setIsDropDownOpen(!isDropDownOpen)}
            >
              Private Islands&nbsp;
              <span className="text-accent sm:absolute sm:-bottom-2 sm:right-0 sm:inline-block">
                &#10552;
              </span>
            </div>
          </div>
        </div>

        <div className="nav_icons hidden gap-y-6 lg:grid lg:grid-cols-4">
          <div className="island_icon cursor-pointer">
            <img
              src={navCompass}
              className="mx-auto max-h-[40px] w-full max-w-fit"
            />
          </div>
          <div className="island_icon cursor-pointer">
            <img
              src={litFlame}
              className="mx-auto max-h-[40px] w-full max-w-fit"
            />
          </div>
          <div className="island_icon cursor-pointer">
            <img
              src={bottle}
              className="mx-auto max-h-[40px] w-full max-w-fit"
            />
          </div>
          <div className="island_icon cursor-pointer">
            <img
              src={treasureChest}
              className="mx-auto max-h-[40px] w-full max-w-fit"
            />
          </div>
        </div>

        <div className="wallet_connect col-span-2 grid items-center justify-end text-center">
          <XSWDConnect />
        </div>
        <div className="hidden">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

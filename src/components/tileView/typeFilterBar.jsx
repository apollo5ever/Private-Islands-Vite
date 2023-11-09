import { useState, useContext, useEffect } from 'react';
import { piAssetType, statusFilter } from '@/utils/helpers.js';
import { LoginContext } from '../../LoginContext';
import { TileContext } from '@/components/providers/TileContext.jsx';

export const TypeFilterBar = ({
  selectedFilter,
  setSelectedFilter,
  selectedStatus,
  setSelectedStatus,
}) => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [state, setState] = useContext(LoginContext);
  const [scidArray, setSCIDArray] = useState('');
  const { myIslands } = useContext(TileContext);

  useEffect(() => {
    if (!myIslands || myIslands.length === 0) {
      return;
    }
    setSCIDArray(myIslands.map((x) => x.SCID));
  }, [myIslands]);

  // Primary filter based on type
  const typeFilterButtons = [
    { label: 'All', value: piAssetType.ALL },
    { label: 'Islands', value: piAssetType.ISLAND },
    { label: 'Subscriptions', value: piAssetType.SUBSCRIPTION },
    { label: 'Fundraisers', value: piAssetType.FUNDRAISER },
    { label: 'Bounties', value: piAssetType.BOUNTY },
    { label: 'My Island', value: scidArray },
  ];

  // Secondary hover filters for bounty & fundraiser
  const statusFilters = [
    { label: 'All', value: statusFilter.ALL },
    { label: 'Active', value: statusFilter.ACTIVE },
    { label: 'Success', value: statusFilter.SUCCESS },
    { label: 'Failure', value: statusFilter.FAILURE },
  ];

  // Reset status as well whenever a new type button is clicked on
  const handleFilterChange = (filterValue) => {
    setSelectedFilter(filterValue);
    setSelectedStatus(statusFilters.ALL);
  };

  return (
    <div className="fixed bottom-16 left-1/2 z-10 flex w-full max-w-3xl -translate-x-1/2 transform justify-between rounded-2xl bg-black shadow-md sm:w-2/3">
      {typeFilterButtons.map((filter, index) => (
        <div
          className="group relative flex-1"
          onMouseEnter={() => {
            if (
              selectedFilter === piAssetType.FUNDRAISER ||
              selectedFilter === piAssetType.BOUNTY
            ) {
              setHoveredButton(filter.value);
            }
          }}
          onMouseLeave={() => setHoveredButton(null)}
          key={filter.value}
        >
          <button
            className={`w-full px-2 py-2 text-center text-base sm:text-xs md:text-sm
            ${
              selectedFilter === filter.value
                ? 'bg-white text-black'
                : 'bg-black text-white hover:rounded-2xl sm:bg-transparent sm:hover:bg-black sm:hover:text-white'
            }
            ${
              index === 0 && selectedFilter === filter.value
                ? 'rounded-l-2xl'
                : ''
            }
            ${
              index === typeFilterButtons.length - 1 &&
              selectedFilter === filter.value
                ? 'rounded-r-2xl'
                : ''
            }
          `}
            onClick={() => handleFilterChange(filter.value)}
          >
            {filter.label}
            {(filter.value === piAssetType.FUNDRAISER ||
              filter.value === piAssetType.BOUNTY) &&
              selectedFilter === filter.value && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-up ml-2 inline-block"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 11.854a.5.5 0 0 0 .708 0L8 6.207l5.646 5.647a.5.5 0 0 0 .708-.708l-6-6a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 0 .708z"
                  />
                </svg>
              )}
          </button>

          {hoveredButton === filter.value &&
            selectedFilter === filter.value &&
            (filter.value === piAssetType.FUNDRAISER ||
              filter.value === piAssetType.BOUNTY) && (
              <div className="absolute bottom-full left-1/2 z-20 w-3/4 -translate-x-1/2  transform">
                <div className="mx-auto w-full bg-white text-black">
                  {' '}
                  {statusFilters.map((status) => {
                    const isActive =
                      selectedStatus === status.value ||
                      (status.value === statusFilter.ALL &&
                        (selectedStatus === null ||
                          selectedStatus === undefined));

                    return (
                      <button
                        key={status.value}
                        className={`w-full py-1 text-center ${
                          isActive
                            ? 'bg-white text-black'
                            : 'bg-black text-white'
                        }`}
                        onClick={() => {
                          setSelectedStatus(status.value);
                        }}
                      >
                        {status.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

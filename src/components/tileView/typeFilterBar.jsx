import { useState, useContext, useEffect } from 'react';
import { piAssetType, statusFilter } from '@/utils/helpers.js';
import { LoginContext } from '../../LoginContext';

export const TypeFilterBar = ({
  selectedFilter,
  setSelectedFilter,
  selectedStatus,
  setSelectedStatus,
}) => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [state, setState] = useContext(LoginContext);
  const [scid, setSCID] = useState('');

  useEffect(() => {
    if (!state.myIslands || state.myIslands.length == 0) {
      return;
    }
    setSCID(state.myIslands[0].SCID);
  }, [state.myIslands]);

  // Primary filter based on type
  const typeFilterButtons = [
    { label: 'All', value: piAssetType.ALL },
    { label: 'Islands', value: piAssetType.ISLAND },
    { label: 'Subscriptions', value: piAssetType.SUBSCRIPTION },
    { label: 'Fundraisers', value: piAssetType.FUNDRAISER },
    { label: 'Bounties', value: piAssetType.BOUNTY },
    { label: 'My Island', value: scid },
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
    <div className="fixed bottom-16 left-1/2 z-10 flex w-full max-w-lg -translate-x-1/2 transform justify-between rounded-2xl bg-black shadow-md sm:w-2/3">
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
            className={`w-full py-2 text-center text-base sm:text-xs md:text-sm
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

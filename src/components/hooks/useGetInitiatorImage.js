import { useState, useEffect, useContext } from 'react';
import { Helpers } from '@/utils/helpers.js';
import DEFAULT_IMAGE from '/src/assets/images/islandPlaceholder_1.png';
import LoggerContext, { LOG } from '@/components/providers/LoggerContext.jsx';
import { LoginContext } from '@/LoginContext.jsx';

export const useInitiatorImage = (tile) => {
  const [initiatorImage, setInitiatorImage] = useState(DEFAULT_IMAGE);
  // TODO - possibly move this to TileContext or get rid of need for 'state' for GI (getIslands.js) as I don't think its neede
  const [state, setState] = useContext(LoginContext);
  const logger = useContext(LoggerContext);

  useEffect(() => {
    const fetchInitiatorImage = async () => {
      try {
        const image = await Helpers.getInitiatorImage( tile);
        if (image) {
          setInitiatorImage(image);
        } else {
          setInitiatorImage(DEFAULT_IMAGE);
        }
      } catch (error) {
        logger(LOG.DEBUG, 'useInitiatorImage', 'Get Initiator Image', error);
        setInitiatorImage(DEFAULT_IMAGE);
      }
    };

    if (tile) {
      fetchInitiatorImage();
    }
  }, [tile, state]);

  return initiatorImage;
};

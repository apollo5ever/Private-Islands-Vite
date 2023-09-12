import { useEffect, useState } from 'react';

export const Tile = (props) => {
  const [src, setSrc] = useState(props.image);

  useEffect(() => {
    setSrc(props.image);
  }, [props.image]);

  return (
    <div className="relative m-0 overflow-hidden rounded-md p-1">
      <img
        className="h-full w-full rounded-xl object-cover object-center"
        src={src}
        onError={() =>
          setSrc(
            'https://privateislands.fund/static/media/logotransparent.ee389a36cdf74af7b010.png'
          )
        }
      />
    </div>
  );
};

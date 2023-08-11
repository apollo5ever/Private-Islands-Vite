import { useEffect } from 'react';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';
import { useSearchParams } from 'react-router-dom';

export const HeroCard = ({
  title,
  image,
  children,
  searchParam = { filter: 'main' },
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams(searchParam);
  }, []);

  const handleImageClick = () => {
    setSearchParams(searchParam);
  };

  return (
    <div className="hero mt-3 min-h-screen bg-secondary px-20">
      <div className="hero-content">
        <div className="max-w-md">
          <FlexBoxColumn>
            {image ? (
              <figure className="max-w-[500px] cursor-pointer pb-4">
                <img src={image} alt="title" onClick={handleImageClick} />
              </figure>
            ) : (
              ''
            )}
            <h1 className="pb-4 text-5xl font-bold">{title}</h1>
          </FlexBoxColumn>
          {children}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useTheme } from '@/components/hooks/useTheme.js';
import { FlexBoxColumn } from '@/components/common/FlexBoxColumn.jsx';
import { Button } from '@/components/common/Button.jsx';
import { FlexBoxRow } from '@/components/common/FlexBoxRow.jsx';

export const Island = (data) => {
  const { proseClass } = useTheme();
  console.log('ISLAND DATA', data);

  return (
    <div className="hero relative mt-3 min-h-screen items-start rounded-lg bg-secondary px-2 font-fell">
      <div className="hero-content">
        <FlexBoxRow justify="between" align="start" className="w-full">
          <FlexBoxColumn className="mr-3">
            {data.island.Image ? (
              <figure className="max-w-[350px] cursor-pointer pb-4">
                <img
                  src={data.island.Image}
                  alt="title"
                  className="rounded-lg"
                />
              </figure>
            ) : (
              ''
            )}
            <h1 className="pb-4 text-5xl font-bold">{data.island.title}</h1>
          </FlexBoxColumn>
          <div className={proseClass}>
            <h2>{data.island.Tagline}</h2>
            <h3>Social Coconut Score: {data.island.score}</h3>
            <p dangerouslySetInnerHTML={{ __html: data.island.Description }} />
          </div>
        </FlexBoxRow>
      </div>
    </div>
  );
};

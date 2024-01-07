import React, { useContext } from 'react';
import { TileContext } from '@/components/providers/TileContext.jsx';
import { Helpers, piAssetType } from '@/utils/helpers.js';

export const BountyRoles = ({ tile, treasure, recipients }) => {
  const { setSelectedTile, setSelectedIndex } = useContext(TileContext);

  console.log('BOUNTY ROLES - Treasure', treasure);

  return (
    <>
      <div className="bounty_roles mb-2 rounded-lg bg-zinc-100 px-4 py-4 leading-9 shadow-lg ring-1 ring-[#61C0A8]">
        <h3 className="text-xl font-[800] text-[#61C0A8] sm:text-2xl">
          Roles:
        </h3>
        <div className="clear-both h-3 w-full"></div>

        {treasure.Judge && (
          <div className="role_container w-full">
            <div className="grid items-center text-start sm:grid-flow-col sm:justify-start sm:gap-3">
              <h4 className="font-semibold">Active Judge(s):</h4>
              <p
                className="cursor-pointer font-semibold text-accent"
                onClick={() =>
                  setSelectedTile(
                    Helpers.getTileFromIsland(
                      treasure.Judge.SCID,
                      piAssetType.ISLAND
                    )
                  )
                }
              >
                {treasure.Judge.Name}
              </p>
            </div>
          </div>
        )}

        <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-[#E5D7B9] to-transparent opacity-25 dark:opacity-100" />

        {treasure.Executer && (
          <div className="role_container w-full">
            <div className="grid items-center text-start sm:grid-flow-col sm:justify-start sm:gap-3">
              <h4 className="font-semibold">Active Executor(s):</h4>
              <p
                className="cursor-pointer font-semibold text-accent"
                onClick={() =>
                  setSelectedTile(
                    Helpers.getTileFromIsland(
                      treasure.Executer.SCID,
                      piAssetType.ISLAND
                    )
                  )
                }
              >
                {treasure.Executer.Name}
              </p>
            </div>
          </div>
        )}

        <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-[#E5D7B9] to-transparent opacity-25 dark:opacity-100" />

        <div className="role_container w-full">
          <div className="grid items-center text-start sm:grid-flow-col sm:justify-start sm:gap-3">
            <h4 className="font-semibold">Nominated Judge(s):</h4>
            <ol>
              {treasure.Judges &&
                treasure.Judges.map((j, i) => (
                  <li
                    className="cursor-pointer font-bold"
                    onClick={() =>
                      setSelectedTile(
                        Helpers.getTileFromIsland(j.SCID, piAssetType.ISLAND)
                      )
                    }
                  >
                    <p className="text-accent">{j.Name}</p>
                    {treasure.JNeff &&
                      treasure.JNeff === i &&
                      treasure.Judges.length > 1 && (
                        <>
                          {' '}
                          (expires in{' '}
                          {Math.round(treasure.JEeff / (60 * 60 * 24))} days)
                        </>
                      )}
                  </li>
                ))}
            </ol>
          </div>
        </div>

        <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-[#E5D7B9] to-transparent opacity-25 dark:opacity-100" />

        <div className="role_container w-full">
          <div className="grid items-center text-start sm:grid-flow-col sm:justify-start sm:gap-3">
            <h4 className="font-semibold">Nominated Executor(s):</h4>
            <ol>
              {treasure.Execs &&
                treasure.Execs.map((j, i) => (
                  <li className="font-bold" key={i}>
                    <p
                      className="cursor-pointer text-accent"
                      onClick={() =>
                        setSelectedTile(
                          Helpers.getTileFromIsland(j.SCID, piAssetType.ISLAND)
                        )
                      }
                    >
                      {j.Name}
                    </p>
                    {treasure.XNeff &&
                      treasure.XNeff === i &&
                      treasure.Execs &&
                      treasure.Execs.length > 1 && (
                        <>
                          {' '}
                          (expires in{' '}
                          {Math.round(treasure.XEeff / (60 * 60 * 24))} days)
                        </>
                      )}
                  </li>
                ))}
            </ol>
          </div>
        </div>
        {/*Nominated_Executor*/}
      </div>
    </>
  );
};

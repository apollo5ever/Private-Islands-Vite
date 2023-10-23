import to from 'await-to-js';
import React, { useContext } from 'react';
import hex2a from './hex2a';

export default async function getIslands(i) {
  try {
    console.log('trying localhost');
    if (i) {
      const islanddata = await fetch(`/api/islands/${i}`);
      const island = await islanddata.json();
      if (islanddata.status !== 200) throw Error(island.message);
      console.log('Localhost isalnd found', island);
      return island;
    } else {
      const response = await fetch('/api/islands');
      // console.log(response);
      const islands = await response.json();

      if (response.status !== 200) throw Error(islands.message);
      console.log('local host IslandS found', islands);
      return islands;
    }
  } catch {
    console.log('trying 127');
    if (i) {
      const islanddata = await fetch(`http://127.0.0.1:5000/api/islands/${i}`);
      const island = await islanddata.json();
      if (islanddata.status !== 200) throw Error(island.message);
      console.log('127 island found', island);
      return island;
    } else {
      const response = await fetch('http://127.0.0.1:5000/api/islands');
      const islands = await response.json();

      if (response.status !== 200) throw Error(islands.message);
      console.log('127 IslandS found', islands);
      return islands;
    }
  }
}

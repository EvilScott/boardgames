import hl from 'highland';
// import { COLUMNS } from '~/utils/constants';
import { derived, readable, writable } from 'svelte/store';

export const filters = writable({});

export const gameList = readable([], async (set) => {
  const res = await fetch('/build/boardgames.json');
  set(await res.json());
});

export const filteredList = derived(
  [ filters, gameList ],
  ([ $filters, $gameList ], set) => {
    hl($gameList).take(25).toArray(set);
  }
);

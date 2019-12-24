// import hl from 'highland';
// import { COLUMNS } from '~/constants';
import { derived, readable, writable } from 'svelte/store';

export const filters = writable({});

export const gameList = readable([], async (set) => {
  const res = await fetch('/build/boardgames.json');
  set(await res.json());
});

export const filteredList = derived(
  [ filters, gameList ],
  async ([ $filters, $gameList ], set) => {
    set($gameList.slice(0,10)); //TODO use highland
    // set(await hl($gameList).take(10).toPromise(Promise));
  }
);

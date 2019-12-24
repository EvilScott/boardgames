import hl from 'highland';
import { overlap } from '~/utils/helper';
import { derived, readable, writable } from 'svelte/store';

export const filters = writable({
  designers: [], artists: [], publishers: [], tags: []
});

export const gameList = readable([], async (set) => {
  const res = await fetch('/build/boardgames.json');
  set(await res.json());
});

export const filteredList = derived(
  [ filters, gameList ],
  ([ $filters, $gameList ], set) => {
    const filterField = (field) => (game) =>
      $filters[field].length === 0 || overlap(game[field], $filters[field]);

    hl($gameList)
      .filter(filterField('designers'))
      .filter(filterField('artists'))
      .filter(filterField('publishers'))
      .filter(filterField('tags'))
      .take(25)
      .sortBy((a, b) => b.year - a.year)
      .toArray(set);
  }
);

const hl = require('highland'),
  parse = require('csv-parse'),
  path = require('path'),
  fs = require('fs');

const COLUMNS = [
  'game_id', 'name', 'boardgamedesigner', 'boardgameartist', 'yearpublished',
  'minplayers', 'maxplayers', 'minage', 'playingtime', 'minplaytime',
  'maxplaytime', 'boardgamepublisher', 'boardgamecategory', 'boardgamefamily',
  'boardgamemechanic', 'bgg_url'
];
const ARRAY_COLUMNS = [
  'boardgamedesigner', 'boardgameartist', 'boardgamepublisher',
  'boardgamecategory', 'boardgamefamily', 'boardgamemechanic'
];
const INT_COLUMNS = [
  'game_id', 'yearpublished', 'minplayers', 'maxplayers', 'minage',
  'playingtime', 'minplaytime', 'maxplaytime'
];

const DATA_PATH = path.resolve(__dirname, '../data/2019-12-21_game_reference.csv');
const OUTPUT_PATH = path.resolve(__dirname, '../src/boardgames.json');
const OUTPUT_STREAM = fs.createWriteStream(OUTPUT_PATH);
const CSV_STREAM = fs.createReadStream(DATA_PATH, { encoding: 'utf8' })
  .pipe(parse({ columns: true }));

OUTPUT_STREAM.write('[');

const formatArrayData = row => {
  for (const c of ARRAY_COLUMNS) {
    row[c] = row[c].slice(2, -2).split("', '");
  }
  return row;
};

const formatIntData = row => {
  for (const c of INT_COLUMNS) {
    row[c] = parseInt(row[c]);
  }
  return row;
};

hl(CSV_STREAM)
  .pick(COLUMNS)
  .map(formatArrayData)
  .map(formatIntData)
  .map(JSON.stringify)
  .intersperse(',')
  .append(']')
  .pipe(OUTPUT_STREAM);

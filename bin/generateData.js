const hl = require('highland'),
  parse = require('csv-parse'),
  path = require('path'),
  fs = require('fs');

const COLUMN_MAP = {
  game_id: 'id',
  name: 'name',
  yearpublished: 'year',
  minplayers: 'minPlayers',
  maxplayers: 'maxPlayers',
  minage: 'minAge',
  playingtime: 'playTime',
  minplaytime: 'minPlayTime',
  maxplaytime: 'maxPlayTime',
  boardgamedesigner: 'designers',
  boardgameartist: 'artists',
  boardgamepublisher: 'publishers',
  boardgamecategory: 't1',
  boardgamefamily: 't2',
  boardgamemechanic: 't3',
  bgg_url: 'url',
};
const ARRAY_COLUMNS = [ 'designers', 'artists', 'publishers', 't1', 't2', 't3' ];
const INT_COLUMNS = [
  'id', 'year', 'minPlayers', 'maxPlayers', 'minAge',
  'playTime', 'minPlayTime', 'maxPlayTime'
];

const DATA_PATH = path.resolve(__dirname, '../data/2019-12-21_game_reference.csv');
const OUTPUT_PATH = path.resolve(__dirname, '../public/build/boardgames.json');
const OUTPUT_STREAM = fs.createWriteStream(OUTPUT_PATH);
const CSV_STREAM = fs.createReadStream(DATA_PATH, { encoding: 'utf8' })
  .pipe(parse({ columns: true }));

OUTPUT_STREAM.write('[');

const mapFields = row => {
  let newRow = {};
  for (const [key, val] of Object.entries(COLUMN_MAP)) {
    newRow[val] = row[key];
  }
  return newRow;
};

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

const combineTags = row => {
  row.tags = [ ...row.t1, ...row.t2, ...row.t3 ].filter(t => t.length);
  delete row.t1;
  delete row.t2;
  delete row.t3;
  return row;
};

hl(CSV_STREAM)
  .map(mapFields)
  .map(formatArrayData)
  .map(formatIntData)
  .map(combineTags)
  .map(JSON.stringify)
  .intersperse(',')
  .append(']')
  .pipe(OUTPUT_STREAM);

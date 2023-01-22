const getAllTrackInfo = require('./spotify');

const songs = [
  { title: 'walk it talk it', artist: 'migos' },
  { title: 'omg', artist: 'newjeans' },
  { title: '505', artist: 'arctic monkeys' }
];

getAllTrackInfo(songs).then((x) => console.log(x));

import getAllTrackInfo from './spotify.js';

const songs = [
  { title: 'walk it talk it', artist: 'migos' },
  { title: 'omg', artist: 'newjeans' },
  { title: '505', artist: 'arctic monkeys' }
];

console.log(await getAllTrackInfo(songs));

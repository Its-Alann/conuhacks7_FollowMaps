import './App.css';
import Artists from './components/Artists';
import FileParser from './components/FileParser';
import Treemap from './components/Treemap';
import Genre from './components/Genre';
import Songs from './components/Songs';

function App() {
  return (
    <div>
      {/* <Artists/> */}
      <Genre />
      <Songs />
    </div>
  );
}

export default App;

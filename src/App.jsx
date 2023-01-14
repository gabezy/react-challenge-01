import React from "react";
import "./App.css";

function App() {
  const [listCoord, setListCoor] = React.useState([]);
  const [undid, setUndid] = React.useState([]);

  const handleClick = (event) => {
    if (event.target === event.currentTarget) {
      const { clientX, clientY } = event;
      const newDot = { clientX, clientY };
      setListCoor((prev) => [...prev, newDot]);
      setUndid([]); // To imitate the undo and redo of the windows and mac
    }
  };

  const handleUndo = () => {
    if (listCoord.length) {
      const lastItem = listCoord[listCoord.length - 1];
      setUndid((prev) => [...prev, lastItem]);
      setListCoor((prev) => {
        const newArr = [...prev];
        return newArr.slice(0, -1); // return the Array whit previous values without the last one
      });
    }
  };

  const handleRedo = () => {
    if (undid.length) {
      const lastItem = undid[undid.length - 1];
      setListCoor((prev) => [...prev, lastItem]);
      setUndid((prev) => [...prev].slice(0, -1));
      console.log(lastItem);
    }
  };

  return (
    <div id="canvas" onClick={handleClick}>
      <div id="buttons">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
      </div>
      {listCoord.length > 0 &&
        listCoord.map(({ clientX, clientY }, index) => (
          <span
            key={index}
            className="dot"
            style={{ top: `${clientY}px`, left: `${clientX}px` }}
          ></span>
        ))}
    </div>
  );
}

export default App;

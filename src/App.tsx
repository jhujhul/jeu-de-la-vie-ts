import React, { useState, useReducer } from "react";
import "./App.css";
import { useInterval } from "./hooks";
import { cloneDeep } from "lodash";

interface Action {
  type: string;
}

export function reducer(state: number[][], action: Action): number[][] {
  switch (action.type) {
    case "update":
      const newState = cloneDeep(state);

      state.forEach((line, y) => {
        line.forEach((cell, x) => {
          newState[y][x] = isCellAliveNextTurn(state, x, y) ? 1 : 0;
        });
      });

      return newState;
    default:
      throw new Error();
  }
}

export function isCellAliveNextTurn(
  state: number[][],
  x: number,
  y: number
): boolean {
  const numberOfAjacentCell = getNumberOfLivingAdjacentCell(state, x, y);
  if (numberOfAjacentCell < 2 || numberOfAjacentCell > 3) {
    return false;
  }
  if (numberOfAjacentCell === 2) {
    return state[y][x] === 1;
  }
  return true;
}

export function getNumberOfLivingAdjacentCell(
  state: number[][],
  x: number,
  y: number
): number {
  let aliveCellsCounter = 0;
  for (let i = -1; i <= 1; i++) {
    const cellX = x + i;
    if (cellX < 0 || cellX >= state[y].length) {
      continue;
    }
    for (let j = -1; j <= 1; j++) {
      const cellY = y + j;
      if (cellY < 0 || cellY >= state[x].length || (i === 0 && j === 0)) {
        continue;
      }
      aliveCellsCounter += state[cellY][cellX];
    }
  }
  return aliveCellsCounter;
}

const App: React.FC = () => {
  // prettier-ignore
  const initialState: number[][] = [
    [0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0],
    [1, 0, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 0, 1],
    [0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0],
  ];
  const [state, dispatch] = useReducer(reducer, initialState);
  const [counter, setCounter] = useState(0);

  useInterval(() => {
    dispatch({
      type: "update"
    });
    setCounter(counter + 1);
  }, 1000);

  return (
    <div className="App">
      Nombre de tour: {counter}
      <div className="grid">
        {state.map((line, indexLine) => (
          <div className="line" key={indexLine}>
            {line.map((cell, indexCell) => (
              <div
                className={cell === 1 ? "cell life" : "cell"}
                key={indexCell}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

import React, { useState, useReducer, Reducer } from "react";
import "./App.css";
import { useInterval } from "./hooks";

type Matrix = number[][];

const App: React.FC = () => {
  // prettier-ignore
  const initialState: Matrix = [
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
  const { state, updateGame } = useGameOfLife(initialState);
  const [counter, setCounter] = useState(0);

  useInterval(() => {
    updateGame();
    setCounter(counter + 1);
  }, 1000);

  return (
    <div className="App">
      <div className="container">
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
    </div>
  );
};

export default App;

export const useGameOfLife = (initialState: Matrix) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateGame = () => {
    dispatch({
      type: UPDATE_TYPE,
    });
  };

  return { state, updateGame };
};

const UPDATE_TYPE = "update";
interface Action {
  type: typeof UPDATE_TYPE;
}
export const reducer: Reducer<Matrix, Action> = (state, action) => {
  switch (action.type) {
    case UPDATE_TYPE:
      const newState = getEmptyMatrix(state.length);

      state.forEach((line, y) => {
        line.forEach((cell, x) => {
          newState[y][x] = isCellAliveNextTurn(state, x, y) ? 1 : 0;
        });
      });

      return newState;
  }
};

export function isCellAliveNextTurn(
  state: Matrix,
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
  state: Matrix,
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

function getEmptyMatrix(length: number): Matrix {
  const matrix = [];

  for (let i = 0; i < length; i++) {
    matrix.push([]);
  }

  return matrix;
}

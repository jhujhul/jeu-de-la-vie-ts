import React from "react";
import ReactDOM from "react-dom";
import { renderHook, act } from "@testing-library/react-hooks";
import App, {
  getNumberOfLivingAdjacentCell,
  isCellAliveNextTurn,
  useGameOfLife,
} from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("useGameOfLife", () => {
  it("should return the correct state (simple case)", () => {
    // prettier-ignore
    const state = [
      [1, 0],
      [1, 1]
    ];
    const { result } = renderHook(() => useGameOfLife(state));

    act(() => {
      result.current.updateGame();
    });

    // prettier-ignore
    const expectedState = [
      [1, 1],
      [1, 1]
    ];
    expect(result.current.state).toEqual(expectedState);
  });

  it("should return the correct state (Block case)", () => {
    // prettier-ignore
    const state = [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ];
    const { result } = renderHook(() => useGameOfLife(state));

    act(() => {
      result.current.updateGame();
    });

    // prettier-ignore
    const expectedState = [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ];
    expect(result.current.state).toEqual(expectedState);
  });

  it("should return the correct state (Toad case)", () => {
    // prettier-ignore
    const initialState = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 0],
      [0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];
    const { result } = renderHook(() => useGameOfLife(initialState));

    act(() => {
      result.current.updateGame();
    });

    // prettier-ignore
    const expectedState1 = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0],
      [0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];
    expect(result.current.state).toEqual(expectedState1);

    act(() => {
      result.current.updateGame();
    });

    expect(result.current.state).toEqual(initialState);
  });
});

describe("getNumberOfLivingAdjacentCell", () => {
  let state: number[][];
  let x: number;
  let y: number;
  beforeEach(() => {
    // prettier-ignore
    state = [
      [1, 0, 1],
      [1, 1, 0],
      [1, 1, 0]
    ];
    x = 0;
    y = 0;
  });

  const Act = () => getNumberOfLivingAdjacentCell(state, x, y);

  it.each`
    xToTest | yToTest | expectedCount
    ${0}    | ${0}    | ${2}
    ${1}    | ${0}    | ${4}
    ${2}    | ${0}    | ${1}
    ${0}    | ${1}    | ${4}
    ${1}    | ${1}    | ${5}
    ${1}    | ${2}    | ${3}
    ${0}    | ${2}    | ${3}
    ${1}    | ${2}    | ${3}
    ${2}    | ${2}    | ${2}
  `(
    "should return $expectedCount for x = $xToTest, y = $yToTest",
    ({ xToTest, yToTest, expectedCount }) => {
      x = xToTest;
      y = yToTest;

      const number = Act();

      expect(number).toBe(expectedCount);
    }
  );
});

describe("isCellAliveNextTurn", () => {
  let state: number[][];
  let x: number;
  let y: number;
  beforeEach(() => {
    // prettier-ignore
    state = [
      [1, 0, 1],
      [1, 1, 0],
      [1, 1, 0]
    ];
    x = 0;
    y = 0;
  });

  const Act = () => isCellAliveNextTurn(state, x, y);

  it.each`
    xToTest | yToTest | expectedReturn
    ${0}    | ${0}    | ${true}
    ${1}    | ${0}    | ${false}
    ${2}    | ${0}    | ${false}
    ${0}    | ${1}    | ${false}
    ${1}    | ${1}    | ${false}
    ${1}    | ${2}    | ${true}
    ${0}    | ${2}    | ${true}
    ${1}    | ${2}    | ${true}
    ${2}    | ${2}    | ${false}
  `(
    "should return $expectedReturn for x = $xToTest, y = $yToTest",
    ({ xToTest, yToTest, expectedReturn }) => {
      x = xToTest;
      y = yToTest;

      const result = Act();

      expect(result).toBe(expectedReturn);
    }
  );
});

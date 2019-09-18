import React from "react";
import ReactDOM from "react-dom";
import App, {
  reducer,
  getNumberOfLivingAdjacentCell,
  isCellAliveNextTurn
} from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("reducer", () => {
  it("should ", () => {
    // prettier-ignore
    const state = [
      [1, 0],
      [1, 1]
    ];
    const action = {
      type: "update"
    };

    const newState = reducer(state, action);

    // prettier-ignore
    const expectedState = [
      [1, 1],
      [1, 1]
    ];
    expect(newState).toEqual(expectedState);
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

import { test, expect } from 'vitest'
import { bowlingScore } from './game'

test.only('Score 64 (simple game)', () => {
  //arrage
  const frames = [
    [2, 0],
    [4, 2],
    [6, 0],
    [2, 4],
    [1, 5],
    [7, 0],
    [5, 2],
    [7, 0],
    [2, 6],
    [8, 1],
  ]

  //act
  const actual = bowlingScore(frames)

  //assert

  expect(actual).toBe(64)
})

test.only('Score 71 (with spares)', () => {
  //arrage
  const frames = [
    [6, 1],
    [4, 0],
    [6, 4],
    [2, 7],
    [3, 5],
    [5, 0],
    [5, 5],
    [0, 0],
    [1, 6],
    [7, 2],
  ]

  //act
  const actual = bowlingScore(frames)

  //assert

  expect(actual).toBe(71)
})

test.only('Score 104 (with spares and strikes):', () => {
  //arrage
  const frames = [
    [6, 4],
    [8, 0],
    [10, 0],
    [2, 7],
    [5, 5],
    [4, 0],
    [10, 0],
    [2, 1],
    [2, 6],
    [4, 4],
  ]
  // ]

  //act
  const actual = bowlingScore(frames)

  //assert

  expect(actual).toBe(104)
})

test.only('Score 119 (with spares, strikes and a double strike):', () => {
  //arrage
  const frames = [
    [1, 2],
    [6, 4],
    [5, 4],
    [10, 0],
    [7, 2],
    [10, 0],
    [10, 0],
    [5, 2],
    [7, 0],
    [4, 4],
  ]
  // ]

  //act
  const actual = bowlingScore(frames)

  //assert

  expect(actual).toBe(119)
})

test.only('Score 141 (includes a strike on the last frame):', () => {
  //arrage
  const frames = [
    [1, 2],
    [6, 4],
    [5, 4],
    [10, 0],
    [7, 2],
    [10, 0],
    [10, 0],
    [5, 2],
    [7, 0],
    [10, 10, 10],
  ]

  //act
  const actual = bowlingScore(frames)

  //assert

  expect(actual).toBe(141)
})

test('Score 300 (perfect game)', () => {
  //arrage
  const frames = [
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 10, 10],
  ]

  //act
  const actual = bowlingScore(frames)

  //assert

  expect(actual).toBe(300)
})

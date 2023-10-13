import { test, expect } from 'vitest'
import { bowlingScore, scoreFrame } from './game'

test('ScoreFrame scores a normal frame', () => {
  const frame = [1, 3]

  const actual = scoreFrame(frame)

  expect(actual).toBe(4)
})

test('ScoreFrame scores a spare frame', () => {
  const frame1 = [6, 4]
  const frame2 = [4, 4]

  const actual = scoreFrame(frame1, frame2)

  expect(actual).toBe(14) // 10 + next roll
})

test('Score 64 (simple game)', () => {
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

  const actual = bowlingScore(frames)

  expect(actual).toBe(64)
})

test('Score 71 (with spares)', () => {
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

  const actual = bowlingScore(frames)

  expect(actual).toBe(71)
})

test('Score 104 (with spares and strikes):', () => {
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

  const actual = bowlingScore(frames)

  expect(actual).toBe(104)
})

test('Score 119 (with spares, strikes and a double strike):', () => {
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

  const actual = bowlingScore(frames)

  expect(actual).toBe(119)
})

test('Score 141 (includes a strike on the last frame):', () => {
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

  const actual = bowlingScore(frames)

  expect(actual).toBe(141)
})

test('Score 300 (perfect game)', () => {
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

  const actual = bowlingScore(frames)

  expect(actual).toBe(300)
})

test('A game with bonus but not perfect game (Score 178)', () => {
  const frames = [
    [10, 0], // Strike
    [7, 3], // Spare
    [4, 2],
    [10, 0], // Strike
    [2, 8], // Spare
    [10, 0], // Strike
    [10, 0], // Strike (Double)
    [9, 1], // Spare
    [3, 6],
    [10, 10, 7], // Strike (Double) with bonus roll
  ]

  const actual = bowlingScore(frames)

  expect(actual).toBe(178)
})

test('Score 283', () => {
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
    [10, 3, 7],
  ]

  const actual = bowlingScore(frames)

  expect(actual).toBe(283)
})

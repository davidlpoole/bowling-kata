import { describe, test, expect } from 'vitest'
import {
  bowlingScore,
  scoreFrame,
  sumFrame,
  isSpare,
  isStrike,
  isDoubleStrike,
} from './game'

describe('scoreFrame() correctly calculates', () => {
  test('a normal frame', () => {
    const frame = [1, 3]

    const actual = scoreFrame(frame)

    expect(actual).toBe(4)
  })

  test('a spare frame', () => {
    const frame1 = [6, 4]
    const frame2 = [4, 4]

    const actual = scoreFrame(frame1, frame2)

    expect(actual).toBe(14) // 10 + next roll
  })

  test('a strike frame', () => {
    const frame1 = [10, 0]
    const frame2 = [4, 4]

    const actual = scoreFrame(frame1, frame2)

    expect(actual).toBe(18) // 10 + next 2 rolls
  })

  test('a double strike frame', () => {
    const frame1 = [10, 0]
    const frame2 = [10, 0]
    const frame3 = [5, 4]

    const actual = scoreFrame(frame1, frame2, frame3)

    expect(actual).toBe(25) // 10 + next 2 rolls
  })
})

describe('sumFrame() correctly handles', () => {
  test('a 2 ball frame', () => {
    const frame = [1, 2]

    const actual = sumFrame(frame)

    expect(actual).toBe(3)
  })

  test('a 3 ball frame', () => {
    const frame = [10, 2, 3]

    const actual = sumFrame(frame)

    expect(actual).toBe(15)
  })
})

describe('boolean functions return correct value', () => {
  test.each([
    { frame1: [10, 0], frame2: [10, 0], expected: true },
    { frame1: [10, 0], frame2: [5, 5], expected: false },
  ])(
    'isDoubleStrike($frame1, $frame2) -> $expected',
    ({ frame1, frame2, expected }) => {
      const actual = isDoubleStrike(frame1, frame2)

      expect(actual).toBe(expected)
    }
  )

  test.each([
    { frame1: [10, 0], expected: true },
    { frame1: [5, 5], expected: false },
  ])('isStrike($frame1) -> $expected', ({ frame1, expected }) => {
    const actual = isStrike(frame1)

    expect(actual).toBe(expected)
  })

  test.each([
    { frame1: [5, 5], expected: true },
    { frame1: [5, 3], expected: false },
  ])('isSpare($frame1) -> $expected', ({ frame1, expected }) => {
    const actual = isSpare(frame1)

    expect(actual).toBe(expected)
  })
})

describe('bowlingScore() correctly scores', () => {
  test('a simple game', () => {
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

  test('a game with spares', () => {
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

  test('a game with spares and strikes', () => {
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

  test('a game with spares, strikes and a double strike', () => {
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

  test('a game with a strike on the last frame', () => {
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

  test('a perfect game', () => {
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

  test('a game with bonus roll with double strike', () => {
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

  test('an almost perfect game with only one final strike', () => {
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
})

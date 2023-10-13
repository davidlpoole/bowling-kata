/**
 * Calculates the total bowling score based on the provided frames (a game).
 *
 * @param {number[][]} frames - The frames representing rolls in a bowling game.
 * @returns {number} The total bowling score.
 */
export function bowlingScore(frames) {
  let total = 0

  for (let i = 0; i < frames.length; i++) {
    const currentFrames = frames.slice(i)
    total += scoreFrame(...currentFrames)
  }

  return total
}

/**
 * Calculates the score for a frame based on the given frames.
 *
 * @param {...number[][]} frames - The frames to calculate the score.
 * @returns {number} The calculated score for the frame(s).
 */
export function scoreFrame(...frames) {
  const [frame1, arg2, arg3] = frames

  // prevent index overflow on last rounds
  const defaultValue = [0, 0]
  const frame2 = arg2 !== undefined ? arg2 : defaultValue
  const frame3 = arg3 !== undefined ? arg3 : defaultValue

  if (isDoubleStrike(frame1, frame2)) {
    return sumFrame(frame1) + frame2[0] + frame2[1] + frame3[0]
  }

  if (isStrike(frame1)) {
    return sumFrame(frame1) + sumFrame(frame2)
  }

  if (isSpare(frame1)) {
    return sumFrame(frame1) + frame2[0]
  }

  return sumFrame(frame1)
}

/**
 * Calculates the sum of the rolls in a frame
 *
 * @param {number[]} frame - The frame containing roll scores.
 * @returns {number} The total sum of roll scores in the frame.
 */
export function sumFrame(frame) {
  return frame.reduce((total, roll) => total + parseInt(roll), 0)
}

/**
 * Determines if the given frame was a double strike.
 *
 * @param {number[]} frame1 - The current frame.
 * @param {number[]} frame2 - The next frame.
 * @returns {boolean} True if it's a double strike, otherwise false.
 */
export function isDoubleStrike(frame1, frame2) {
  return frame1[0] === 10 && frame2[0] === 10
}

/**
 * Determines if the given frame was a strike.
 *
 * @param {number[]} frame - The frame to check.
 * @returns {boolean} True if it's a strike, otherwise false.
 */
export function isStrike(frame) {
  return frame[0] === 10
}

/**
 * Determines if the given frame was a spare.
 *
 * @param {number[]} frame - The frame to check.
 * @returns {boolean} True if it's a spare, otherwise false.
 */
export function isSpare(frame) {
  return frame[0] !== 10 && sumFrame(frame) === 10
}

const sampleGame = [
  [2, 4],
  [10, 0],
  [7, 2],
  [3, 6],
  [5, 1],
  [2, 2],
  [6, 3],
  [9, 0],
  [4, 5],
  [10, 6, 4],
]

const totalScore = bowlingScore(sampleGame)
console.log('Sample Bowling Game:', sampleGame)
console.log('Expected Score:', 100)
console.log('Calculated Score:', totalScore)

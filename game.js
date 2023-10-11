// Score 64 (simple game):
// const frames = [
//   [2, 0], [4, 2], [6, 0], [2, 4], [1, 5], [7, 0], [5, 2], [7, 0], [2, 6], [8, 1]
// ]
// Score 71 (with spares):
// const frames = [
//   [6, 1], [4, 0], [6, 4], [2, 7], [3, 5], [5, 0], [5, 5], [0, 0], [1, 6], [7, 2]
// ]
// Score 104 (with spares and strikes):
// const frames = [
//   [6, 4], [8, 0], [10, 0], [2, 7], [5, 5], [4, 0], [10, 0], [2, 1], [2, 6], [4, 4]
// ]
//
// Score 119 (with spares, strikes and a double strike):
// const frames = [
//   [1, 2], [6, 4], [5, 4], [10, 0], [7, 2], [10, 0], [10, 0], [5, 2], [7, 0], [4, 4]
// ]
//
// Score 141 (includes a strike on the last frame):
// const frames = [
//   [1, 2], [6, 4], [5, 4], [10, 0], [7, 2], [10, 0], [10, 0], [5, 2], [7, 0], [10, 10, 10]
// ]
//
// Score 300 (perfect game):
// const frames = [
//   [10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10, 10, 10]
// ]
export function bowlingScore(frames) {
  let totalScore = 0
  let count = 0
  for (let i = 0; i < frames.length; i++) {
    const currentFrame = frames[i]
    const nextFrame = frames[i + 1]

    const frameScore = sumFrame(currentFrame)

    if (isPerfectGame(frames, count)) {
      const lastSum = sumFrame(frames[9]) + frames[9][2]
      return totalScore + 10 + sumFrame(frames[9]) + lastSum
    } else if (isLastStrike(currentFrame)) {
      totalScore += currentFrame[2]
    } else if (isSpare(currentFrame)) {
      totalScore += frames[i + 1][0]
    } else if (isDoubleStrike(currentFrame, nextFrame)) {
      totalScore += 10 + frames[i + 2][0]
      count += 1
    } else if (isStrike(currentFrame)) {
      totalScore += frames[i + 1][0] + frames[i + 1][1]
    }

    totalScore += frameScore
  }
  return totalScore
}

function sumFrame(frame) {
  return frame[0] + frame[1]
}

function isPerfectGame(frames, count) {
  if (count === frames.length - 2 && frames[frames.length - 2][0] === 10)
    return true
}

function isDoubleStrike(frame1, frame2) {
  if (frame1[0] === 10 && frame2[0] === 10) {
    return true
  }
}

function isStrike(frame) {
  if (frame[0] === 10) {
    return true
  }
}

function isSpare(frame) {
  const sumScore = sumFrame(frame)
  if (frame[0] !== 10 && sumScore === 10) {
    return true
  }
}

function isLastStrike(frame) {
  if (frame.length === 3) {
    return true
  }
}

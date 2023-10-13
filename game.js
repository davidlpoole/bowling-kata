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

export function scoreFrame(frame) {
  return frame[0] + frame[1]
}

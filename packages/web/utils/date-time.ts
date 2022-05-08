import { divide, multiply, pipe, __ } from 'ramda';

export const secondsToHours = pipe(divide(__, 3600), Math.round);
export const hoursToSeconds = multiply(3600);
export const hoursToDays = pipe(divide(__, 24), Math.round);

export const secondsToBlocks = (blockTime: number) => {
  return pipe(divide(__, blockTime), Math.ceil);
};

export const hoursToBlocks = (blockTime: number) =>
  pipe(multiply(3600), secondsToBlocks(blockTime));

export const daysToBlocks = (blockTime: number) =>
  pipe(multiply(24 * 60 * 60), divide(__, blockTime), Math.ceil);

export const blocksToSeconds = (blockTime: number) => pipe(multiply(blockTime), Math.floor);

export const blocksToHours = (blockTime: number) =>
  pipe(multiply(blockTime), divide(__, 3600), Math.floor);

export const blocksToDays = (blockTime: number) =>
  pipe(multiply(blockTime), divide(__, 60 * 60 * 24), Math.floor);

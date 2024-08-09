// src/utils/gateLogic.ts

export const calculateAND = (inputs: boolean[]): boolean =>
  inputs.every((input) => input);
export const calculateNAND = (inputs: boolean[]): boolean =>
  !inputs.every((input) => input);
export const calculateOR = (inputs: boolean[]): boolean =>
  inputs.some((input) => input);
export const calculateNOR = (inputs: boolean[]): boolean =>
  !inputs.some((input) => input);
export const calculateXOR = (inputs: boolean[]): boolean =>
  inputs.reduce((acc, input) => acc !== input);
export const calculateXNOR = (inputs: boolean[]): boolean =>
  !inputs.reduce((acc, input) => acc !== input);
export const calculateNOT = (inputs: boolean[]): boolean => !inputs[0];

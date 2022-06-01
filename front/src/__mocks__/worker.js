import { setupWorker } from 'msw';
import { Letter } from './Letter';

export const worker = setupWorker(...Letter);

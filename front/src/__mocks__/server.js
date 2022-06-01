import { setupServer } from 'msw/node';
import { Letter } from './Letter';

export const server = setupServer(...Letter);

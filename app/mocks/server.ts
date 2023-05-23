import { setupServer } from 'msw/node'
import { handler } from './api/handler'

export const worker = setupServer(...handler)

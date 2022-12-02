import { afterAll, afterEach, beforeAll } from 'vitest'
import { fetch } from 'cross-fetch'

import { server } from './mock-server'

global.fetch = fetch;

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

import { cleanup, configure, fireEvent, render } from '@testing-library/vue'
import { rest } from 'msw'
import { afterEach, beforeEach, expect, it } from 'vitest'

import { server } from '../test/mock-server'
import App from './App.vue'

configure({ testIdAttribute: 'data-qa' })

beforeEach(() => {
  server.use(
    rest.get('https://v2.jokeapi.dev/joke/christmas', (req, res, ctx) =>
      res.once(ctx.json({ setup: 'Foo setup', delivery: 'Foo delivery' }))
    ),
    rest.get('https://v2.jokeapi.dev/joke/christmas', (req, res, ctx) =>
      res.once(ctx.json({ setup: 'Foo setup 2', delivery: 'Foo delivery 2' }))
    )
  )
})
afterEach(cleanup)

it('should show a joke setup', async () => {
  const { findByText } = render(App)

  expect(await findByText('Foo setup')).toBeTruthy()
})

it('should show the delivery when clicking `Tell Me!`', async () => {
  const { findByRole, findByText } = render(App)

  await fireEvent.click(await findByRole('button', { name: 'Tell Me!' }))

  expect(await findByText('Foo delivery')).toBeTruthy()
})

it('should show a new joke setup when clicking `Another` after seeing the delivery', async () => {
  const { findByRole, findByText } = render(App)

  await fireEvent.click(await findByRole('button', { name: 'Tell Me!' }))
  await fireEvent.click(await findByRole('button', { name: 'Another' }))

  expect(await findByText('Foo setup 2')).toBeTruthy()
})

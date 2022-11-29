import { cleanup, configure, fireEvent, render } from '@testing-library/vue'
import { afterEach, expect, it } from 'vitest'

import App from './App.vue'

configure({ testIdAttribute: 'data-qa' })

afterEach(cleanup)

it('should show a joke setup', async () => {
  const { findByTestId } = render(App)

  const setup = await findByTestId('setup')
  expect(setup.innerHTML.length).toBeGreaterThan(0)
})

it('should show the delivery when clicking `Tell Me!`', async () => {
  const { findByRole, findByTestId } = render(App)

  await fireEvent.click(await findByRole('button', { name: 'Tell Me!' }))

  const delivery = await findByTestId('delivery')
  expect(delivery.innerHTML.length).toBeGreaterThan(0)
})

it('should show a new joke setup when clicking `Another` after seeing the delivery', async () => {
  const { findByRole, findByTestId } = render(App)

  const setupOldText = (await findByTestId('setup')).innerHTML
  await fireEvent.click(await findByRole('button', { name: 'Tell Me!' }))
  await fireEvent.click(await findByRole('button', { name: 'Another' }))

  const setup = await findByTestId('setup')
  expect(setup.innerHTML.length).toBeGreaterThan(0)
  expect(setup.innerHTML).not.toBe(setupOldText)
})

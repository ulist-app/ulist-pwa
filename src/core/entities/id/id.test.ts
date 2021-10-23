import { Id } from './id'

describe('Id should', () => {
  it('be created generating a version 4 uuid', () => {
    const id = new Id()

    expect(id.value).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
  })
})

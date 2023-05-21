import { productListingApi } from "../src/api/ProductListingApi/api"
const mockJson = require('./mockJson.json');

const unmockedFetch = global.fetch

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
})

afterAll(() => {
  global.fetch = unmockedFetch
})

describe('Api Test', () => {
  it('Should fetch api data', async () => {
    const json = await productListingApi(true)
    expect(Array.isArray(json)).toEqual(true)
    expect(json).toMatchObject(mockJson)
  })
})
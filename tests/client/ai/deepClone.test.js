const {deepClone} = require('../../../lib/medAiV2/lib/deepClone')

test('deep clones a array matrix', () => {
  const expected = copy
  const actual = deepClone(arr)
  expect(actual).toEqual(expected)
})

const arr = [
  [
    {name: 'Bob', partners: ['John', 'Tammy', 'Jill', 'his work'], age: 78},
    {home: 'terrace', purchaseDate: '1942'},
    {favColor: 'brown'}
  ],
  [
    {name: 'Jasmine', partners: ['single'], age: 28},
    {home: 'flat', purchaseDate: '2009'},
    {favColor: 'green'}
  ]
]

const copy = [
  [
    {name: 'Bob', partners: ['John', 'Tammy', 'Jill', 'his work'], age: 78},
    {home: 'terrace', purchaseDate: '1942'},
    {favColor: 'brown'}
  ],
  [
    {name: 'Jasmine', partners: ['single'], age: 28},
    {home: 'flat', purchaseDate: '2009'},
    {favColor: 'green'}
  ]
]
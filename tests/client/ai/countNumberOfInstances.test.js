const {countNumberOfInstances} = require('../../../lib/medAiV2/lib/getInfoV2')

test('checks array for duplicates, organizes counts into arr of objs from most to least', () => {
  const expected = [
    {value: 4, count: 2},
    {value: 2, count: 2},
    {value: 3, count: 1},
    {value: 7, count: 1},
    {value: 0, count: 1},
    {value: 8, count: 1}
  ]
  const actual = countNumberOfInstances([3, 4, 4, 7, 0, 2, 2, 8])
  expect(actual).toEqual(expected)
})

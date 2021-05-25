export const tetrisShapes = [
    {
      type: 'T',
      value: [[0, 0, 0, 2, 2, 2, 0, 0, 0], [0, 0, 0, 0, 2, 0, 0, 0, 0]],
      rowsCount: 2,
      matrix: [[2, 2, 2], [0, 2, 0]],
      starts: 3,
      expands: 3,
      rotated: false,
      isRotatable: true
    },
    {
      type: 'Z',
      value: [[0, 0, 0, 2, 2, 0, 0, 0, 0], [0, 0, 0, 0, 2, 2, 0, 0, 0]],
      rowsCount: 2,
      matrix: [[2, 2, 0], [0, 2, 2]],
      starts: 3,
      expands: 3,
      rotated: false,
      isRotatable: true
    },
    {
      type: 'S',
      value: [[0, 0, 0, 0, 2, 2, 0, 0, 0], [0, 0, 0, 2, 2, 0, 0, 0, 0]],
      rowsCount: 2,
      matrix: [[0, 2, 2], [2, 2, 0]],
      starts: 3,
      expands: 3,
      rotated: false,
      isRotatable: true
    },
    {
      type: 'I',
      value: [
        [0, 0, 0, 0, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 0, 0, 0, 0]
      ],
      rowsCount: 3,
      matrix: [[0, 2, 0], [0, 2, 0], [0, 2, 0]],
      starts: 4,
      expands: 1,
      rotated: false,
      isRotatable: true
    },
    {
      type: 'IH',
      value: [[0, 0, 0, 2, 2, 2, 0, 0, 0]],
      rowsCount: 1,
      matrix: [[0, 0, 0], [2, 2, 2], [0, 0, 0]],
      starts: 3,
      expands: 3,
      rotated: false,
      isRotatable: true
    },
    {
      type: 'O',
      value: [[0, 0, 0, 0, 2, 2, 0, 0, 0], [0, 0, 0, 0, 2, 2, 0, 0, 0]],
      rowsCount: 2,
      matrix: [[0, 2, 2], [0, 2, 2]],
      starts: 4,
      expands: 2,
      rotated: false,
      isRotatable: false
    },
    {
      type: 'L',
      value: [
        [0, 0, 0, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 2, 0, 0, 0, 0]
      ],
      rowsCount: 3,
      matrix: [[2, 0, 0], [2, 0, 0], [2, 2, 0]],
      starts: 3,
      expands: 2,
      rotated: false,
      isRotatable: true
    }
  ]
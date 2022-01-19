const length = 100

export function getEmptyGridData() {
    return Array.from({ length }).map(() => Array.from({ length }).map(() => undefined))
}

export function getInitialGridData() {
    return Array.from({ length }).map(() => Array.from({ length }).map(() => Math.random() > 0.5 ? 1 : 0))
}

export function getNextGridData(gridData = []) {
    const nextGridData = getEmptyGridData()

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            let aliveCount
            if (i > 0 && i < length - 1) {
                if (j > 0 && j < length - 1) {
                    aliveCount = gridData[i - 1][j - 1] + gridData[i - 1][j] + gridData[i - 1][j + 1] + gridData[i][j - 1] + gridData[i][j + 1] + gridData[i + 1][j - 1] + gridData[i + 1][j] + gridData[i + 1][j + 1]
                }
                if (j === 0) {
                    aliveCount = gridData[i - 1][length - 1] + gridData[i - 1][j] + gridData[i - 1][j + 1] + gridData[i][length - 1] + gridData[i][j + 1] + gridData[i + 1][length - 1] + gridData[i + 1][j] + gridData[i + 1][j + 1]
                }
                if (j === length - 1) {
                    aliveCount = gridData[i - 1][j - 1] + gridData[i - 1][j] + gridData[i - 1][0] + gridData[i][j - 1] + gridData[i][0] + gridData[i + 1][j - 1] + gridData[i + 1][j] + gridData[i + 1][0]
                }
            }
            if (i === 0) {
                if (j > 0 && j < length - 1) {
                    aliveCount = gridData[length - 1][j - 1] + gridData[length - 1][j] + gridData[length - 1][j + 1] + gridData[i][j - 1] + gridData[i][j + 1] + gridData[i + 1][j - 1] + gridData[i + 1][j] + gridData[i + 1][j + 1]
                }
                if (j === 0) {
                    aliveCount = gridData[length - 1][length - 1] + gridData[length - 1][j] + gridData[length - 1][j + 1] + gridData[i][length - 1] + gridData[i][j + 1] + gridData[i + 1][length - 1] + gridData[i + 1][j] + gridData[i + 1][j + 1]
                }
                if (j === length - 1) {
                    aliveCount = gridData[length - 1][j - 1] + gridData[length - 1][j] + gridData[length - 1][0] + gridData[i][j - 1] + gridData[i][0] + gridData[i + 1][j - 1] + gridData[i + 1][j] + gridData[i + 1][0]
                }
            }
            if (i === length - 1) {
                if (j > 0 && j < length - 1) {
                    aliveCount = gridData[i - 1][j - 1] + gridData[i - 1][j] + gridData[i - 1][j + 1] + gridData[i][j - 1] + gridData[i][j + 1] + gridData[0][j - 1] + gridData[0][j] + gridData[0][j + 1]
                }
                if (j === 0) {
                    aliveCount = gridData[i - 1][length - 1] + gridData[i - 1][j] + gridData[i - 1][j + 1] + gridData[i][length - 1] + gridData[i][j + 1] + gridData[0][length - 1] + gridData[0][j] + gridData[0][j + 1]
                }
                if (j === length - 1) {
                    aliveCount = gridData[i - 1][j - 1] + gridData[i - 1][j] + gridData[i - 1][0] + gridData[i][j - 1] + gridData[i][0] + gridData[0][j - 1] + gridData[0][j] + gridData[0][0]
                }
            }
            if (aliveCount === 3) {
                nextGridData[i][j] = 1
            } else if (aliveCount === 2) {
                nextGridData[i][j] = gridData[i][j]
            } else {
                nextGridData[i][j] = 0
            }
        }
    }
    return nextGridData
}
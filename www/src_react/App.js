import { html, useEffect, useReducer} from './modules.js'
import TimeLabel from './TimeLabel.js'
import Container from './Container.js'
import { createGUI } from '../src/gui.js'
import { getInitialGridData, getNextGridData } from '../src/game.js'

const length = 100

const initialState = {
    running: true,
    gridData: getInitialGridData(length),
    startTime: 0,
    pauseTime: 0,
    pauseDuration: 0,
    runningDuration: 0,
}

const reducers = {
    toggleRunning(state, action) {
        if (state.running && !action.payload) {
            return reducers.pauseGame(state)
        }
        if (!state.running && action.payload) {
            return reducers.startGame(state)
        }
    },
    step(state) {
        return {
            ...state,
            runningDuration: new Date().getTime() - state.startTime - state.pauseDuration,
            gridData: getNextGridData(state.gridData),
        }
    },
    pauseGame(state) {
        return {
            ...state,
            pauseTime: new Date().getTime(),
            running: false,
        }
    },
    resetGame(state) {
        return {
            ...state,
            startTime: state.running ? new Date().getTime() : 0,
            pauseTime: 0,
            pauseDuration: 0,
            runningDuration: 0,
            gridData: getInitialGridData(length)
        }
    },
    toggleGrid(state, action) {
        const gridData = state.gridData
        const { i, j } = action.payload
        gridData[i][j] = gridData[i][j] ^ 1
        return {
            ...state,
            gridData,
        }
    },
    startGame(state) {
        const newState = {}
        const now = new Date().getTime()
        if (state.pauseTime) {
            newState.pauseDuration = state.pauseDuration + now - state.pauseTime
            newState.pauseTime = 0
        } else {
            newState.startTime = now
        }
        newState.running = true
        return {
            ...state,
            ...newState,
        }
    },
}

function reducer(state, action) {
    const handle = reducers[action.type]
    return typeof handle === 'function' ? handle(state, action) : state
}

export default function App(props) {
    const [state, dispatch] = useReducer(reducer, initialState)

    function handleToggleGrid(ev) {
        dispatch({ type: 'toggleGrid', payload: ev })
    }

    function startGame() {
        dispatch({ type: 'startGame' })
    }

    function resetGame() {
        dispatch({ type: 'resetGame' })
    }

    useEffect(() => {
        if (!state.running) {
            return
        }
        let handle

        function step() {
            dispatch({ type: 'step' })
            handle = requestAnimationFrame(step)
        }
        handle = requestAnimationFrame(step)

        return () => {
            cancelAnimationFrame(handle)
        }
    }, [state.running])

    useEffect(() => {
        createGUI({
            onChange: (ev) => {
                dispatch({ type: 'toggleRunning', payload: ev.object.running })
            },
            reset: resetGame,
        })
        startGame()
    }, [])

    return html`
        <${TimeLabel} key="time-label" duration=${state.runningDuration}></TimeLabel>
        <${Container} key="container" gridData=${state.gridData} onToggle=${handleToggleGrid}></Container>
    `
}
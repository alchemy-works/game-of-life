import { onMounted, shallowReactive } from './modules.js'
import Container from './Container.js'
import { getInitialGridData, getNextGridData } from '../src/game.js'
import { createGUI } from '../src/gui.js'
import TimeLabel from './TimeLabel.js'

export default {
    template: `
      <div id="app">
      <TimeLabel :duration="state.runningDuration"/>
      <Container :gridData="state.gridData" @toggle="handleToggleGrid"/>
      </div>
    `,
    setup(props) {
        const length = 100

        const state = shallowReactive({
            length,
            running: true,
            gridData: getInitialGridData(length),
            startTime: 0,
            pauseTime: 0,
            pauseDuration: 0,
            runningDuration: 0,
        })

        function step() {
            if (!state.running) {
                return
            }
            state.runningDuration = new Date().getTime() - state.startTime - state.pauseDuration
            state.gridData = getNextGridData(state.gridData)
            requestAnimationFrame(step)
        }

        function startGame() {
            const now = new Date().getTime()
            if (state.pauseTime) {
                state.pauseDuration += now - state.pauseTime
                state.pauseTime = 0
            } else {
                state.startTime = now
            }
            state.running = true
            step()
        }

        function pauseGame() {
            state.pauseTime = new Date().getTime()
            state.running = false
        }

        function resetGame() {
            state.startTime = state.running ? new Date().getTime() : 0
            state.pauseTime = 0
            state.pauseDuration = 0
            state.runningDuration = 0
            state.gridData = getInitialGridData(length)
        }

        function handleToggleGrid({ i, j }) {
            const gridData = [...state.gridData]
            gridData[i][j] = gridData[i][j] ^ 1
            state.gridData = gridData
        }

        onMounted(() => {
            createGUI({
                onChange: (ev) => {
                    if (state.running && !ev.object.running) {
                        pauseGame()
                    }
                    if (!state.running && ev.object.running) {
                        startGame()
                    }
                },
                reset: resetGame,
            })
            startGame()
        })

        return {
            state,
            handleToggleGrid,
        }
    },
    components: {
        Container,
        TimeLabel,
    },
}
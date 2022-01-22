import Container from './Container.js'
import { getInitialGridData, getNextGridData } from '../src/game.js'
import { createGUI } from '../src/gui.js'
import TimeLabel from './TimeLabel.js'

export default {
    template: `
      <div id="app">
      <TimeLabel :duration="runningDuration"/>
      <Container :gridData="gridData" @toggle="handleToggleGrid"/>
      </div>
    `,
    data() {
        const length = 100
        return {
            length,
            running: true,
            gridData: getInitialGridData(length),
            startTime: 0,
            pauseTime: 0,
            pauseDuration: 0,
            runningDuration: 0,
        }
    },
    mounted() {
        createGUI({
            onChange: (ev) => {
                if (this.running && !ev.object.running) {
                    this.pauseGame()
                }
                if (!this.running && ev.object.running) {
                    this.startGame()
                }
            },
            reset: this.resetGame,
        })
        this.startGame()
    },
    components: {
        Container,
        TimeLabel,
    },
    methods: {
        startGame() {
            const now = new Date().getTime()
            if (this.pauseTime) {
                this.pauseDuration += now - this.pauseTime
                this.pauseTime = 0
            } else {
                this.startTime = now
            }
            this.running = true
            this.step()
        },
        step() {
            if (!this.running) {
                return
            }
            this.runningDuration = new Date().getTime() - this.startTime - this.pauseDuration
            this.gridData = getNextGridData(this.gridData)
            requestAnimationFrame(this.step)
        },
        pauseGame() {
            this.pauseTime = new Date().getTime()
            this.running = false
        },
        resetGame() {
            this.startTime = this.running ? new Date().getTime() : 0
            this.pauseTime = 0
            this.pauseDuration = 0
            this.runningDuration = 0
            this.gridData = getInitialGridData(this.length)
        },
        handleToggleGrid({ i, j }) {
            const gridData = [...this.gridData]
            gridData[i][j] = gridData[i][j] ^ 1
            this.gridData = gridData
        },
    },
}
import Container from './Container.js'
import { getInitialGridData, getNextGridData } from './game.js'
import { createGUI } from './gui.js'

export default {
    template: `
      <div id="app">
      <Container :gridData="gridData"/>
      </div>
    `,
    data() {
        const length = 100
        return {
            length,
            running: true,
            gridData: getInitialGridData(length),
        }
    },
    mounted() {
        createGUI({
            onChange: (ev) => {
                if (this.running && !ev.object.running) {
                    this.pauseGame()
                }
                if (!this.running && ev.object.running) {
                    const _ = this.startGame()
                }
            },
            reset: () => this.resetGame(),
        })
        const _ = this.startGame()
    },
    components: {
        Container,
    },
    methods: {
        async startGame() {
            this.running = true
            while (this.running) {
                await new Promise((resole) => setTimeout(resole, 50))
                this.gridData = getNextGridData(this.gridData)
            }
        },
        pauseGame() {
            this.running = false
        },
        resetGame() {
            this.gridData = getInitialGridData(this.length)
        },
    },
}
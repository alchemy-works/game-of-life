import Container from './Container.js'
import { getInitialGridData, getNextGridData } from './game.js'

export default {
    template: `
      <div id="app">
      <Container :gridData="gridData"/>
      </div>
    `,
    data() {
        return {
            running: true,
            gridData: getInitialGridData(),
        }
    },
    async mounted() {
        while (this.running) {
            await new Promise((resole) => setTimeout(resole, 50))
            this.gridData = getNextGridData(this.gridData)
        }
    },
    components: {
        Container,
    },
}
import { css } from './modules.js'

const _Container = css`
  border-collapse: collapse;
  margin: 0 auto;
  width: max-content;
  height: max-content;

  > tbody {
    > tr {
      > td {
        width: .25rem;
        height: .25rem;
      }

      > td.alive {
        background-color: #111;
      }

      > td.die {
        background: transparent;
      }
    }
  }
`

export default {
    template: `
      <table class="${_Container}">
      <tbody>
      <tr v-for="(row, rowIndex) of gridData" :key="rowIndex">
        <td v-for="(item, itemIndex) of row" :key="itemIndex" :class="item ? 'alive' : 'die'"
            @click="handleClickGrid(rowIndex, itemIndex)"/>
      </tr>
      </tbody>
      </table>
    `,
    props: {
        gridData: {
            type: Array,
            required: true,
        },
    },
    setup(props, { emit }) {

        function handleClickGrid(i, j) {
            emit('toggle', { i, j })
        }

        return {
            handleClickGrid,
        }
    },
}
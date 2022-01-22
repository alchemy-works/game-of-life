import { html, css } from './modules.js'

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

export default function Container(props) {

    function handleClickGrid(i, j) {
        props?.onToggle({ i, j })
    }

    return html`
        <table className="${_Container}">
            <tbody>
            ${props.gridData.map((row, rowIndex) => {
                return html`
                    <tr key=${rowIndex}>
                        ${row.map((item, itemIndex) => {
                            return html`
                                <td key=${itemIndex} className=${item ? 'alive' : 'die'}
                                    onClick=${() => handleClickGrid(rowIndex, itemIndex)}></td>
                            `
                        })}
                    </tr>
                `
            })}
            </tbody>
        </table>
    `
}
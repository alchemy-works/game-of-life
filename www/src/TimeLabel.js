import { css } from './modules.js'

function paddingLeft(n) {
    return n.toString().padStart(2, '0')
}

const _TimeLabel = css`
  position: absolute;
  top: 0;
  left: 15px;
  font-size: 1.25rem;
  color: #111;
`

export default {
    template: `
      <div class="${_TimeLabel}">
      {{ durationText }}
      </div>
    `,
    props: {
        duration: {
            type: Number,
            default: () => 0,
        },
    },
    computed: {
        durationText() {
            const milliseconds = this.duration % 1000
            const seconds = Math.trunc(this.duration / 1000) % 60
            const minutes = Math.trunc(this.duration / 1000 / 60) % 60
            return [
                minutes.toString().padStart(2, '0'),
                seconds.toString().padStart(2, '0'),
                milliseconds.toString().padStart(3, '0'),
            ].join(':')
        },
    },
}
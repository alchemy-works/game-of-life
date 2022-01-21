import { css } from './modules.js'

const _TimeLabel = css`
  position: fixed;
  top: 0;
  right: 30px;
  font-size: 1rem;
  color: #fff;
  user-select: none;
  pointer-events: none;
  z-index: 2000;
  opacity: .9;
  height: 25px;
  line-height: 25px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
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
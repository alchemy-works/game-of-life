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
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
`

export default {
    template: `
      <div class="${_TimeLabel}" :style="heightStyle">
      {{ durationText }}
      </div>
    `,
    props: {
        duration: {
            type: Number,
            default: () => 0,
        },
    },
    data() {
        return {
            height: '0',
        }
    },
    mounted() {
        this.setHeight()
    },
    computed: {
        heightStyle() {
            return `height: ${this.height}; line-height: ${this.height};`
        },
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
    methods: {
        setHeight() {
            const lilGuiRoot = document.querySelector('.lil-gui.root')
            if (!lilGuiRoot) {
                requestAnimationFrame(this.setHeight)
            } else {
                this.height = getComputedStyle(lilGuiRoot).height
            }
        },
    },
}
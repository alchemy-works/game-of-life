import { css, ref, computed, onMounted, } from './modules.js'

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
    setup(props) {
        const height = ref('0')

        const durationText = computed(() => {
            const milliseconds = props.duration % 1000
            const seconds = Math.trunc(props.duration / 1000) % 60
            const minutes = Math.trunc(props.duration / 1000 / 60) % 60
            return [
                minutes.toString().padStart(2, '0'),
                seconds.toString().padStart(2, '0'),
                milliseconds.toString().padStart(3, '0'),
            ].join(':')
        })

        const heightStyle = computed(() => {
            return `height: ${height.value}; line-height: ${height.value};`
        })

        function setHeight() {
            const lilGuiRoot = document.querySelector('.lil-gui.root')
            if (!lilGuiRoot) {
                requestAnimationFrame(setHeight)
            } else {
                height.value = getComputedStyle(lilGuiRoot).height
            }
        }

        onMounted(() => {
            setHeight()
        })

        return {
            durationText,
            heightStyle,
        }
    }
}
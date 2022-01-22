import { html, css, useState, useMemo, useEffect } from './modules.js'

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

export default function TimeLabel(props) {
    const [height, setHeight] = useState('0')

    const heightStyle = useMemo(() => ({ height, lineHeight: height }), [height])

    const durationText = useMemo(() => {
        const minutes = Math.trunc(props.duration / 1000 / 60) % 60
        const seconds = Math.trunc(props.duration / 1000) % 60
        const milliseconds = props.duration % 1000
        return [
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0'),
            milliseconds.toString().padStart(3, '0'),
        ].join(':')
    }, [props.duration])

    useEffect(() => {
        function initialHeight() {
            const lilGuiRoot = document.querySelector('.lil-gui.root')
            if (!lilGuiRoot) {
                requestAnimationFrame(initialHeight)
            } else {
                setHeight(getComputedStyle(lilGuiRoot).height)
            }
        }

        initialHeight()
    }, [])


    return html`
        <div className="${_TimeLabel}" style=${heightStyle}>
            ${durationText}
        </div>
    `
}
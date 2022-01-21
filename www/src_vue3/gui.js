import { GUI } from './modules.js'

export function createGUI(options) {
    const gui = new GUI()
    const object = {
        running: true,
        reset() {
            options?.reset()

        },
    }
    gui.add(object, 'running').name('Running')
    gui.add(object, 'reset').name('Reset')
    gui.onChange((ev) => {
        options?.onChange(ev)
    })
    gui.close()
}
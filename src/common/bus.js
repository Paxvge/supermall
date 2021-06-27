import mitt from 'mitt'   // mitt 总线程引入

const bus = {}

const emitter = mitt()

bus.$on = emitter.on
bus.$off = emitter.off
bus.$emit = emitter.emit

export default bus

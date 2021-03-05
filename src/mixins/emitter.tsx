import { Component, Vue } from 'vue-property-decorator'

function broadcast(this: any, componentName: string, eventName: string, params?: any) {
  this.$children.forEach(child => {
    const name = child.$options.componentName
    if (name === componentName) {
      child.$emit.call(child, eventName, params)
    } else {
      broadcast.call(child, componentName, eventName, params)
    }
  })
}

@Component({})
export default class Emitter extends Vue {
  dispatch(componentName: string, eventName: string, params?: any) {
    let parent = this.$parent || this.$root
    let name = parent.$options.componentName

    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent

      if (parent) {
        name = parent.$options.componentName
      }
    }
    if (parent) {
      parent.$emit.call(parent, eventName, params)
    }
  }

  broadcast(componentName, eventName, params?) {
    broadcast.call(this, componentName, eventName, params)
  }
}

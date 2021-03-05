import Vue from 'vue'
// require in the layout component context
const requireComponent = require.context('./', false, /\.vue$/)

const componentName = []

requireComponent.keys().forEach(item => {
  // get component config
  const componentConfig = requireComponent(item)
  const component = componentConfig.default || componentConfig
  componentName.push(component.name)
  // register component globally
  Vue.component(component.name, component)
})

export default componentName

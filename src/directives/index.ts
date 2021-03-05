import Vue from 'vue'

Vue.directive('preventRpt', {
  inserted(el: any, binding: any) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 1000)
      }
    })
  }
})

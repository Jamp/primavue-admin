export default {
  data () {
    return {
      messages: []
    }
  },
  methods: {
    showInfo (message) {
      this.resetMessages()
      this.messages.push({
        text: message,
        type: 'info',
        closeable: false
      })
    },
    showError (message) {
      this.resetMessages()
      this.messages.push({
        text: message,
        type: 'error',
        closeable: true
      })
    },
    resetMessages () {
      this.$set(this, 'messages', [])
    }
  }
}

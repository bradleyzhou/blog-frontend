import Vue from 'vue'

// Handles authentication with backend APIs,
// also servers as an event bus/data bus for auth info.
// Whenever authentication status changes, an event is emitted.
// Accessors to the data also have reactive behavior.

const auth = new Vue({
  data () {
    return {
      authenticated: false
    }
  },

  methods: {
    login (credentials = {nameOrEmail: '', password: ''}) {
      // login uses username and password, get back a token,
      // then stored in localStorage
      this.$http({
        method: 'get',
        url: '/token',
        auth: {
          username: credentials.nameOrEmail,
          password: credentials.password
        }
      })
        .then((response) => {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('expires_at', Date.now() + Number(response.data.expiration) * 1000)

          this.authenticated = true
          this.$emit('auth-success', 'Login Success')
        })
        .catch((err) => {
          this.$emit('auth-error', err)
        })
    },

    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('expires_at')
      this.authenticated = false
    },

    checkAuth () {
      // get auth info from localStorage, useful when initializing
      let token = localStorage.getItem('token')
      let expiresAt = localStorage.getItem('expires_at')
      let now = Date.now()
      if (token && (now < expiresAt)) {
        this.authenticated = true
      } else {
        this.authenticated = false
      }
    },

    getToken () {
      this.checkAuth()
      if (!this.authenticated) {
        this.$emit('token-error', 'Not authenticated')
        return undefined
      }
      return localStorage.getItem('token')
    }
  },

  watch: {
    authenticated () {
      this.$emit('auth-update', 'updated')
    }
  },

  mounted () {
    this.checkAuth()
  }
})

export default auth

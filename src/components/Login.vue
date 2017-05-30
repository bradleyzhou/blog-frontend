<docs>
  Page for user(admin) login.
</docs>

<template lang="html">
  <div class="login">
    <h2>Log In</h2>
    <div class="alert flash" v-if="messege">
      <p>{{ messege }}</p>
    </div>
    <div class="login-form">
      <input type="text"
        placeholder="Username or Email"
        v-model="credentials.nameOrEmail"
      >
      <input type="password"
        placeholder="Password"
        v-model="credentials.password"
      >
      <button type="button" @click="submit">Log In</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',

  data () {
    return {
      credentials: {
        nameOrEmail: '',
        password: ''
      },
      messege: ''
    }
  },

  methods: {
    validate () {
      if (!this.credentials.nameOrEmail || !this.credentials.password) {
        return false
      } else {
        return true
      }
    },

    submit () {
      this.messege = ''
      if (!this.validate()) {
        this.messege = 'Invalid input'
        return
      }
      let credentials = {
        nameOrEmail: this.credentials.nameOrEmail,
        password: this.credentials.password
      }
      console.log(this.$auth)
      this.$auth.login(credentials)
    }
  },

  mounted () {
    this.$auth.$on('auth-success', (msg) => { this.messege = msg })
    this.$auth.$on('auth-error', (err) => { this.messege = err })
  }
}
</script>

<style lang="css">
</style>

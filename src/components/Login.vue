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
        v-model="nameOrEmail"
      >
      <input type="password"
        placeholder="Password"
        v-model="password"
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
      nameOrEmail: '',
      password: '',
      messege: ''
    }
  },

  props: ['redirection'],

  methods: {
    validate () {
      if (!this.nameOrEmail || !this.password) {
        return false
      } else {
        return true
      }
    },

    submit () {
      this.messege = ''
      if (!this.validate()) {
        this.messege = 'Invalid Input'
        return
      }
      let credentials = {
        nameOrEmail: this.nameOrEmail,
        password: this.password
      }
      this.$auth.login(credentials)
    },

    clearCreds () {
      this.nameOrEmail = ''
      this.password = ''
    },

    redirect () {
      if (!this.redirection) {
        this.$router.push('/')
      } else {
        this.$router.push(this.redirection)
      }
    }
  },

  mounted () {
    this.$auth.$on('auth-success', (msg) => {
      this.messege = msg
      this.clearCreds()
      this.redirect()
    })
    this.$auth.$on('auth-error', () => {
      this.messege = 'Invalid Username/Email or Password'
    })
  }
}
</script>

<style lang="css">
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flash p {
  border-radius: 2px;
  text-align: center;
  font-size: 0.75em;
  background-color: #F9F5D9;
}

.login-form {
  width: 200px;
  display: flex;
  flex-direction: column;
}

.login-form input {
  margin-top: 10px;
  height: 2em;
}

.login-form button {
  margin-top: 20px;
  height: 2em;
}
</style>

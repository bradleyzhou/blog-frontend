import { Component, Watch, Vue } from 'vue-property-decorator';

// Handles authentication with backend APIs,
// also servers as an event bus/data bus for auth info.
// Whenever authentication status changes, an event is emitted.
// Accessors to the data also have reactive behavior.
@Component
export class Auth extends Vue {
  public authenticated = false;

  constructor() {
    super();
    this.checkAuth();
  }

  public login(credentials = {nameOrEmail: '', password: ''}) {
    // login uses username and password, get back a token,
    // then stored in localStorage
    this.$http({
      method: 'get',
      url: '/token',
      auth: {
        username: credentials.nameOrEmail,
        password: credentials.password,
      },
    })
      .then((response) => {
        const expiresAt = Date.now() + Number(response.data.expiration) * 1000;
        const expiresAtStr = expiresAt.toString();
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expires_at', expiresAtStr);

        this.authenticated = true;
        this.$emit('auth-success', 'Login Success');
      })
      .catch((err) => {
        this.$emit('auth-error', err);
      });
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    this.authenticated = false;
  }

  public checkAuth() {
    // get auth info from localStorage, useful when initializing
    const token = localStorage.getItem('token');
    const expiresAtStr = localStorage.getItem('expires_at');
    const expiresAt = expiresAtStr == null ? Number.NEGATIVE_INFINITY : Number(expiresAtStr);
    const now = Date.now();

    if (token && expiresAtStr && (now < expiresAt)) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
  }

  public getToken() {
    this.checkAuth();
    if (!this.authenticated) {
      this.$emit('token-error', 'Not authenticated');
      return undefined;
    }
    return localStorage.getItem('token');
  }

  @Watch('authenticated')
  public onAuthChange() {
    this.$emit('auth-update', 'updated');
  }

  public mounted() {
    this.checkAuth();
  }
}

// AuthServer is a single instance that is meant to be used app-wise
export const AuthServer = new Auth();

export default Auth;

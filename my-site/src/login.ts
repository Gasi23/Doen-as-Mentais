
import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

@customElement('login-page')
export class LoginPage extends LitElement {
  @state() private userType = 'paciente'

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      font-family: Arial, sans-serif;
      color: #514653;
      background: linear-gradient(135deg, #fffcfa, #f3eaf5);
    }

    * {
      box-sizing: border-box;
    }

    .container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 30px 20px;
    }

    .login-card {
      width: 100%;
      max-width: 460px;
      padding: 40px;
      background: white;
      border-radius: 24px;
      box-shadow: 0 12px 40px #80648318;
      text-align: center;
    }

    .logo {
      width: 145px;
      height: 115px;
      object-fit: contain;
      margin-bottom: 10px;
    }

    h1 {
      color: #806483;
      font-family: Georgia, serif;
      font-size: 30px;
      font-weight: normal;
      margin: 10px 0;
    }

    .subtitle {
      color: #756b76;
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 28px;
    }

    .user-types {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 25px;
    }

    .user-type {
      padding: 15px 10px;
      border: 1px solid #eadbea;
      border-radius: 14px;
      background: #fffcfe;
      color: #806483;
      cursor: pointer;
      font-size: 14px;
      transition: 0.2s;
    }

    .user-type.active {
      border: 2px solid #987b9a;
      background: #f8eff8;
      font-weight: bold;
    }

    .user-type span {
      display: block;
      font-size: 25px;
      margin-bottom: 7px;
    }

    .field {
      text-align: left;
      margin-bottom: 18px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      color: #68576b;
      font-size: 13px;
      font-weight: bold;
    }

    input {
      width: 100%;
      padding: 14px;
      border: 1px solid #eadbea;
      border-radius: 12px;
      outline: none;
      font-size: 14px;
      color: #514653;
      background: #fffcfe;
    }

    input:focus {
      border-color: #987b9a;
      box-shadow: 0 0 0 3px #987b9a18;
    }

    .submit {
      width: 100%;
      padding: 15px;
      margin-top: 8px;
      border: none;
      border-radius: 30px;
      background: #987b9a;
      color: white;
      font-size: 15px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.2s;
    }

    .submit:hover {
      background: #806483;
    }

    .forgot {
      display: inline-block;
      margin-top: 20px;
      color: #987b9a;
      font-size: 13px;
      text-decoration: none;
    }

    .register {
      display: block;
      margin-top: 20px;
      color: #806483;
      font-size: 14px;
      text-decoration: none;
      font-weight: bold;
    }

    .register:hover,
    .forgot:hover,
    .back:hover {
      text-decoration: underline;
    }

    .back {
      display: block;
      margin-top: 25px;
      color: #756b76;
      font-size: 13px;
      text-decoration: none;
    }

    @media (max-width: 480px) {
      .login-card {
        padding: 30px 22px;
      }
    }
  `

  private selectUser(type: string) {
    this.userType = type
  }

  private handleSubmit(event: Event) {
  event.preventDefault()

  if (this.userType === 'psicologa') {
    window.location.href = '/painel-psicologa.html'
    return
  }

  alert('A área do paciente será disponibilizada na próxima etapa.')
}

  render() {
    return html`
      <main class="container">
        <section class="login-card">
          <img
            class="logo"
            src="/logo-ale.jpeg"
            alt="Alessandra Larissa Psicóloga"
          />

          <h1>Bem-vinda(o)!</h1>

          <p class="subtitle">
            Acesse seu espaço de cuidado, acolhimento e acompanhamento.
          </p>

          <div class="user-types">
            <button
              type="button"
              class="user-type ${this.userType === 'paciente' ? 'active' : ''}"
              @click=${() => this.selectUser('paciente')}
            >
              <span>♡</span>
              Sou paciente
            </button>

            <button
              type="button"
              class="user-type ${this.userType === 'psicologa' ? 'active' : ''}"
              @click=${() => this.selectUser('psicologa')}
            >
              <span>✿</span>
              Sou psicóloga
            </button>
          </div>

          <form @submit=${this.handleSubmit}>
            <div class="field">
              <label for="email">E-mail</label>
              <input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                autocomplete="username"
                required
              />
            </div>

            <div class="field">
              <label for="password">Senha</label>
              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                autocomplete="current-password"
                required
              />
            </div>

            <button class="submit" type="submit">
              Entrar na minha conta
            </button>
          </form>

          <a class="forgot" href="#">
            Esqueci minha senha
          </a>

          <a class="register" href="/cadastro.html">
            Ainda não tem conta? Criar minha conta
          </a>

          <a class="back" href="/">
            ← Voltar para o início
          </a>
        </section>
      </main>
    `
  }
}

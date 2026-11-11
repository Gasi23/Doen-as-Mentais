
import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('cadastro-page')
export class CadastroPage extends LitElement {

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
      justify-content: center;
      align-items: center;
      padding: 30px 20px;
    }

    .card {
      width: 100%;
      max-width: 490px;
      padding: 38px;
      background: white;
      border-radius: 24px;
      box-shadow: 0 12px 40px #80648318;
      text-align: center;
    }

    .logo {
      width: 130px;
      height: 100px;
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
      margin-bottom: 25px;
    }

    .field {
      text-align: left;
      margin-bottom: 17px;
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
      margin-top: 10px;
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

    .login-link {
      display: block;
      margin-top: 22px;
      color: #987b9a;
      font-size: 14px;
      text-decoration: none;
    }

    .back {
      display: block;
      margin-top: 18px;
      color: #756b76;
      font-size: 13px;
      text-decoration: none;
    }

    .notice {
      margin-top: 18px;
      color: #8a7c8b;
      font-size: 11px;
      line-height: 1.5;
    }

    @media (max-width: 480px) {
      .card {
        padding: 30px 22px;
      }
    }
  `

  private handleSubmit(event: Event) {
    event.preventDefault()

    const form = event.currentTarget as HTMLFormElement
    const formData = new FormData(form)

    const senha = String(formData.get('senha'))
    const confirmacao = String(formData.get('confirmacao'))

    if (senha !== confirmacao) {
      alert('As senhas não coincidem. Verifique e tente novamente.')
      return
    }

    alert('Cadastro visual concluído! A integração segura será feita na próxima etapa.')
    form.reset()
  }

  render() {
    return html`
      <main class="container">
        <section class="card">
          <img
            class="logo"
            src="/logo-ale.jpeg"
            alt="Alessandra Larissa Psicóloga"
          />

          <h1>Crie sua conta</h1>

          <p class="subtitle">
            Comece sua jornada de cuidado e autoconhecimento.
          </p>

          <form @submit=${this.handleSubmit}>
            <div class="field">
              <label for="nome">Nome completo</label>
              <input
                id="nome"
                name="nome"
                type="text"
                placeholder="Digite seu nome completo"
                autocomplete="name"
                required
              />
            </div>

            <div class="field">
              <label for="email">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Digite seu e-mail"
                autocomplete="email"
                required
              />
            </div>

            <div class="field">
              <label for="telefone">Telefone</label>
              <input
                id="telefone"
                name="telefone"
                type="tel"
                placeholder="(00) 00000-0000"
                autocomplete="tel"
                required
              />
            </div>

            <div class="field">
              <label for="senha">Senha</label>
              <input
                id="senha"
                name="senha"
                type="password"
                placeholder="Crie uma senha"
                autocomplete="new-password"
                minlength="8"
                required
              />
            </div>

            <div class="field">
              <label for="confirmacao">Confirmar senha</label>
              <input
                id="confirmacao"
                name="confirmacao"
                type="password"
                placeholder="Digite a senha novamente"
                autocomplete="new-password"
                minlength="8"
                required
              />
            </div>

            <button class="submit" type="submit">
              Criar minha conta
            </button>
          </form>

          <p class="notice">
            Seus dados deverão ser tratados com segurança e privacidade.
          </p>

          <a class="login-link" href="/login.html">
            Já tenho uma conta. Entrar
          </a>

          <a class="back" href="/">
            ← Voltar para o início
          </a>
        </section>
      </main>
    `
  }
}


import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { supabase } from './supabase'

@customElement('login-page')
export class LoginPage extends LitElement {
  @state() private userType = 'paciente'
  @state() private mensagem = ''
  @state() private carregando = false
  @state() private modoRecuperacao = false
  @state() private modoNovaSenha = false

  private authSubscription?: { unsubscribe: () => void }

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      font-family: Arial, sans-serif;
      color: #514653;
    }

    * {
      box-sizing: border-box;
    }

    main {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 30px 18px;
      background: linear-gradient(135deg, #fffcfa, #f3eaf5);
    }

    section {
      width: 100%;
      max-width: 460px;
      padding: 40px;
      background: #fff;
      border-radius: 24px;
      box-shadow: 0 12px 40px rgba(128, 100, 131, 0.12);
      text-align: center;
    }

    img {
      display: block;
      width: 145px;
      height: 115px;
      object-fit: contain;
      margin: 0 auto 20px;
    }

    h1 {
      margin: 0 0 12px;
      color: #806483;
      font-family: Georgia, serif;
      font-size: 29px;
      font-weight: normal;
    }

    .descricao {
      margin: 0 0 28px;
      color: #817783;
      font-size: 14px;
      line-height: 1.6;
    }

    .tipo-usuario {
      display: flex;
      gap: 10px;
      margin-bottom: 25px;
    }

    .tipo-btn {
      flex: 1;
      padding: 13px 8px;
      border: 1px solid #e5d9e8;
      border-radius: 12px;
      background: #fff;
      color: #806483;
      font-size: 14px;
      transition: 0.2s;
    }

    .tipo-btn.ativo {
      background: #f3eaf5;
      border-color: #987b9a;
      color: #705374;
      font-weight: bold;
    }

    form {
      display: flex;
      flex-direction: column;
      text-align: left;
    }

    label {
      margin: 0 0 7px;
      color: #625567;
      font-size: 14px;
      font-weight: 600;
    }

    .campo {
      width: 100%;
      padding: 14px 15px;
      margin: 0 0 19px;
      border: 1px solid #e4dce6;
      border-radius: 11px;
      background: #fdfbfd;
      color: #514653;
      font-size: 14px;
      outline: none;
      transition: border 0.2s, box-shadow 0.2s;
    }

    .campo:focus {
      border-color: #987b9a;
      box-shadow: 0 0 0 3px rgba(152, 123, 154, 0.12);
    }

    .botao-principal {
      width: 100%;
      padding: 15px;
      margin-top: 3px;
      border: none;
      border-radius: 12px;
      background: #987b9a;
      color: white;
      font-size: 15px;
      font-weight: bold;
      transition: 0.2s;
    }

    .botao-principal:hover {
      background: #806483;
    }

    button {
      cursor: pointer;
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .links {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-top: 22px;
      font-size: 13px;
    }

    a {
      color: #806483;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    .mensagem {
      margin: 18px 0 0;
      padding: 12px;
      border-radius: 10px;
      background: #f8f0f7;
      color: #806483;
      font-size: 13px;
      line-height: 1.5;
    }

    .voltar {
      display: inline-block;
      margin-top: 25px;
      font-size: 13px;
    }

    @media (max-width: 480px) {
      main {
        padding: 18px 12px;
      }

      section {
        padding: 30px 22px;
      }

      h1 {
        font-size: 25px;
      }
    }
  `

  connectedCallback() {
    super.connectedCallback()

    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        this.ativarModoNovaSenha()
      }
    })

    this.authSubscription = data.subscription

    void this.verificarRecuperacao()
  }

  disconnectedCallback() {
    this.authSubscription?.unsubscribe()
    super.disconnectedCallback()
  }

  private ativarModoNovaSenha() {
    this.modoNovaSenha = true
    this.modoRecuperacao = false
    this.userType = 'psicologa'
    this.mensagem = ''
  }

  private async verificarRecuperacao() {
    const url = new URL(window.location.href)

    const parametrosHash = new URLSearchParams(
      url.hash.replace(/^#/, '')
    )

    const recuperacaoPorHash =
      parametrosHash.get('type') === 'recovery'

    const recuperacaoPorParametro =
      url.searchParams.get('mode') === 'recovery'

    const possuiCodigo = url.searchParams.has('code')

    const possuiErro =
      parametrosHash.has('error') ||
      url.searchParams.has('error')

    if (possuiErro) {
      this.mensagem =
        'O link de recuperação expirou ou é inválido. Solicite um novo link.'
      return
    }

    if (
      !recuperacaoPorHash &&
      !recuperacaoPorParametro &&
      !possuiCodigo
    ) {
      return
    }

    try {
      const { data, error } = await supabase.auth.getSession()

      if (error) throw error

      if (data.session) {
        this.ativarModoNovaSenha()
      } else {
        this.mensagem =
          'Não foi possível validar o link. Solicite uma nova recuperação de senha.'
      }
    } catch (error) {
      console.error('Erro ao verificar recuperação:', error)

      this.mensagem =
        'Não foi possível validar o link. Solicite uma nova recuperação de senha.'
    }
  }

  private async solicitarRecuperacao(event: Event) {
    event.preventDefault()

    const form = event.currentTarget as HTMLFormElement
    const dados = new FormData(form)
    const email = String(dados.get('email') || '').trim()

    this.carregando = true
    this.mensagem = ''

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login.html?mode=recovery`
      })

      if (error) throw error

      this.mensagem =
        'Enviamos um link de recuperação para seu e-mail. Verifique também a caixa de spam.'
    } catch (error) {
      console.error('Erro ao solicitar recuperação:', error)

      this.mensagem =
        'Não foi possível enviar o e-mail. Tente novamente mais tarde.'
    } finally {
      this.carregando = false
    }
  }

  private async salvarNovaSenha(event: Event) {
    event.preventDefault()

    const form = event.currentTarget as HTMLFormElement
    const dados = new FormData(form)

    const senha = String(dados.get('password') || '')
    const confirmar = String(dados.get('confirmar') || '')

    if (senha.length < 8) {
      this.mensagem = 'A senha deve ter pelo menos 8 caracteres.'
      return
    }

    if (senha !== confirmar) {
      this.mensagem = 'As senhas não coincidem.'
      return
    }

    this.carregando = true
    this.mensagem = ''

    try {
      const { data: sessao } = await supabase.auth.getSession()

      if (!sessao.session) {
        throw new Error('Sessão de recuperação não encontrada.')
      }

      const { error } = await supabase.auth.updateUser({
        password: senha
      })

      if (error) throw error

      await supabase.auth.signOut()

      this.modoNovaSenha = false
      this.modoRecuperacao = false

      this.mensagem =
        'Senha atualizada com sucesso! Agora entre com sua nova senha.'
    } catch (error) {
      console.error('Erro ao atualizar senha:', error)

      this.mensagem =
        'Não foi possível atualizar a senha. Solicite um novo link de recuperação.'
    } finally {
      this.carregando = false
    }
  }

  private async handleSubmit(event: Event) {
    event.preventDefault()

    if (this.userType !== 'psicologa') {
      this.mensagem =
        'A área do paciente ainda não está disponível.'
      return
    }

    const form = event.currentTarget as HTMLFormElement
    const dados = new FormData(form)

    const email = String(dados.get('email') || '').trim()
    const senha = String(dados.get('password') || '')

    this.carregando = true
    this.mensagem = ''

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: senha
      })

      if (error) throw error

      window.location.href = '/painel-psicologa.html'
    } catch (error) {
      console.error('Erro no login:', error)

      this.mensagem =
        'E-mail ou senha incorretos. Verifique seus dados.'
    } finally {
      this.carregando = false
    }
  }

  private selectUser(type: string) {
    this.userType = type
    this.mensagem = ''
  }

  render() {
    return html`
      <main>
        <section>
          <img
            src="/logo-ale.jpeg"
            alt="Alessandra Larissa Psicóloga"
          >

          <h1>
            ${this.modoNovaSenha
              ? 'Criar nova senha'
              : this.modoRecuperacao
                ? 'Recuperar senha'
                : 'Bem-vinda(o)!'}
          </h1>

          <p class="descricao">
            ${this.modoNovaSenha
              ? 'Cadastre uma nova senha para sua conta.'
              : this.modoRecuperacao
                ? 'Informe seu e-mail para receber o link de recuperação.'
                : 'Acesse seu espaço de cuidado, acolhimento e acompanhamento.'}
          </p>

          ${!this.modoNovaSenha && !this.modoRecuperacao
            ? html`
                <div class="tipo-usuario">
                  <button
                    type="button"
                    class="tipo-btn ${this.userType === 'paciente' ? 'ativo' : ''}"
                    @click=${() => this.selectUser('paciente')}
                  >
                    ♡ Sou paciente
                  </button>

                  <button
                    type="button"
                    class="tipo-btn ${this.userType === 'psicologa' ? 'ativo' : ''}"
                    @click=${() => this.selectUser('psicologa')}
                  >
                    ✿ Sou psicóloga
                  </button>
                </div>
              `
            : ''}

          ${this.modoNovaSenha
            ? html`
                <form @submit=${this.salvarNovaSenha}>
                  <label>Nova senha</label>

                  <input
                    class="campo"
                    type="password"
                    name="password"
                    placeholder="Digite a nova senha"
                    autocomplete="new-password"
                    required
                    minlength="8"
                  >

                  <label>Confirme a nova senha</label>

                  <input
                    class="campo"
                    type="password"
                    name="confirmar"
                    placeholder="Digite novamente"
                    autocomplete="new-password"
                    required
                    minlength="8"
                  >

                  <button
                    class="botao-principal"
                    type="submit"
                    ?disabled=${this.carregando}
                  >
                    ${this.carregando
                      ? 'Salvando...'
                      : 'Salvar nova senha'}
                  </button>
                </form>
              `
            : this.modoRecuperacao
              ? html`
                  <form @submit=${this.solicitarRecuperacao}>
                    <label>E-mail</label>

                    <input
                      class="campo"
                      type="email"
                      name="email"
                      placeholder="Seu e-mail"
                      autocomplete="email"
                      required
                    >

                    <button
                      class="botao-principal"
                      type="submit"
                      ?disabled=${this.carregando}
                    >
                      ${this.carregando
                        ? 'Enviando...'
                        : 'Enviar link de recuperação'}
                    </button>
                  </form>

                  <div class="links">
                    <a
                      href="#"
                      @click=${(e: Event) => {
                        e.preventDefault()
                        this.modoRecuperacao = false
                        this.mensagem = ''
                      }}
                    >
                      Voltar para o login
                    </a>
                  </div>
                `
              : html`
                  <form @submit=${this.handleSubmit}>
                    <label>E-mail</label>

                    <input
                      class="campo"
                      type="email"
                      name="email"
                      placeholder="Seu e-mail"
                      autocomplete="username"
                      required
                    >

                    <label>Senha</label>

                    <input
                      class="campo"
                      type="password"
                      name="password"
                      placeholder="Sua senha"
                      autocomplete="current-password"
                      required
                    >

                    <button
                      class="botao-principal"
                      type="submit"
                      ?disabled=${this.carregando}
                    >
                      ${this.carregando
                        ? 'Entrando...'
                        : 'Entrar na minha conta'}
                    </button>
                  </form>

                  <div class="links">
                    <a
                      href="#"
                      @click=${(e: Event) => {
                        e.preventDefault()
                        this.modoRecuperacao = true
                        this.mensagem = ''
                      }}
                    >
                      Esqueci minha senha
                    </a>

                    <a href="/cadastro.html">
                      Ainda não tem conta? Criar minha conta
                    </a>
                  </div>
                `}

          ${this.mensagem
            ? html`
                <p class="mensagem">${this.mensagem}</p>
              `
            : ''}

          <a class="voltar" href="/">
            ← Voltar para o início
          </a>
        </section>
      </main>
    `
  }
}

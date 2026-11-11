
import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

@customElement('painel-psicologa')
export class PainelPsicologa extends LitElement {
  @state()
  private paginaAtual = 'visao-geral'

  // PACIENTES
  @state()
  private buscaPaciente = ''

  @state()
  private mostrarCadastro = false

  @state()
  private pacienteSelecionado: number | null = null

  @state()
  private pacientes: Array<{
    nome: string
    email: string
    telefone: string
    nascimento: string
    status: string
  }> = []

  // AGENDA
  @state()
  private mostrarCadastroSessao = false

  @state()
  private sessoes: Array<{
    paciente: string
    data: string
    horario: string
    modalidade: string
    status: string
  }> = []

  // PRONTUÁRIOS
  @state()
  private mostrarCadastroProntuario = false

  @state()
  private prontuarios: Array<{
    paciente: string
    data: string
    registro: string
  }> = []

  @state()
  private buscaProntuario = ''

  // DOCUMENTOS
  @state()
  private tipoDocumento = ''

  @state()
  private pacienteDocumento = ''

  @state()
  private dataDocumento = ''

  @state()
  private conteudoDocumento = ''

  @state()
  private mostrarPreviaDocumento = false

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      font-family: Arial, sans-serif;
      color: #514653;
      background: #faf7fa;
    }

    * {
      box-sizing: border-box;
    }

    .layout {
      display: flex;
      min-height: 100vh;
    }

    .sidebar {
      width: 255px;
      background: #fff;
      border-right: 1px solid #eee5ef;
      padding: 28px 18px;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }

    .logo {
      width: 100%;
      max-width: 195px;
      display: block;
      margin: 0 auto 35px;
      object-fit: contain;
    }

    .menu-title {
      font-size: 11px;
      color: #a397a5;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      margin: 15px 12px 12px;
    }

    .menu {
      display: flex;
      flex-direction: column;
      gap: 7px;
    }

    .menu button {
      border: none;
      background: transparent;
      color: #756b76;
      text-align: left;
      padding: 13px 14px;
      border-radius: 10px;
      font-size: 14px;
      cursor: pointer;
      transition: 0.2s;
    }

    .menu button:hover,
    .menu button.active {
      background: #f3eaf5;
      color: #806483;
      font-weight: 600;
    }

    .sidebar-bottom {
      margin-top: auto;
      padding-top: 25px;
      border-top: 1px solid #eee5ef;
    }

    .back-link {
      display: block;
      text-decoration: none;
      color: #806483;
      font-size: 13px;
      padding: 12px;
    }

    .main {
      flex: 1;
      min-width: 0;
      padding: 35px 42px;
    }

    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      margin-bottom: 35px;
    }

    .topbar h1 {
      font-size: 25px;
      margin: 0 0 7px;
      color: #514653;
    }

    .subtitle {
      color: #928694;
      font-size: 14px;
      margin: 0;
    }

    .profile {
      display: flex;
      align-items: center;
      gap: 12px;
      background: white;
      padding: 10px 16px;
      border-radius: 12px;
      border: 1px solid #eee5ef;
    }

    .avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: #f3eaf5;
      color: #806483;
      display: grid;
      place-items: center;
      font-weight: bold;
    }

    .profile strong {
      display: block;
      font-size: 13px;
    }

    .profile span {
      color: #928694;
      font-size: 11px;
    }

    .welcome {
      background: linear-gradient(120deg, #f3eaf5, #fff0f2);
      border-radius: 18px;
      padding: 28px;
      margin-bottom: 27px;
    }

    .welcome h2 {
      margin: 0 0 9px;
      font-size: 21px;
      color: #66516b;
    }

    .welcome p {
      margin: 0;
      font-size: 14px;
      color: #756b76;
      line-height: 1.6;
    }

    .section-heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 30px 0 17px;
      gap: 12px;
    }

    .section-heading h2 {
      font-size: 17px;
      margin: 0;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 17px;
    }

    .card {
      background: white;
      padding: 22px;
      border-radius: 15px;
      border: 1px solid #eee5ef;
    }

    .card-label {
      color: #928694;
      font-size: 13px;
      margin-bottom: 13px;
    }

    .card-number {
      font-size: 28px;
      font-weight: bold;
      color: #806483;
    }

    .card-description {
      color: #a397a5;
      font-size: 11px;
      margin-top: 8px;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 20px;
      margin-top: 22px;
    }

    .panel {
      background: white;
      border: 1px solid #eee5ef;
      border-radius: 15px;
      padding: 23px;
    }

    .panel h3 {
      font-size: 16px;
      margin: 0 0 20px;
    }

    .appointment {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding: 14px 0;
      border-bottom: 1px solid #f1ebf2;
      flex-wrap: wrap;
    }

    .appointment:last-child {
      border-bottom: none;
    }

    .appointment strong {
      display: block;
      font-size: 13px;
      margin-bottom: 5px;
    }

    .appointment span {
      font-size: 12px;
      color: #928694;
    }

    .time {
      color: #806483 !important;
      font-weight: bold;
      white-space: nowrap;
    }

    .quick-link {
      display: block;
      padding: 13px 15px;
      background: #faf7fa;
      border-radius: 10px;
      color: #66516b;
      text-decoration: none;
      font-size: 13px;
      margin-bottom: 10px;
      cursor: pointer;
      border: none;
      width: 100%;
      text-align: left;
    }

    .quick-link:hover {
      background: #f3eaf5;
    }

    .field {
      text-align: left;
      margin-bottom: 18px;
    }

    .field label {
      display: block;
      margin-bottom: 8px;
      color: #68576b;
      font-size: 13px;
      font-weight: bold;
    }

    .field input,
    .field select,
    .field textarea {
      width: 100%;
      padding: 13px;
      border: 1px solid #eadbea;
      border-radius: 10px;
      outline: none;
      font-size: 14px;
      color: #514653;
      background: #fffcfe;
      font-family: Arial, sans-serif;
    }

    .field textarea {
      min-height: 150px;
      resize: vertical;
      line-height: 1.6;
    }

    .field input:focus,
    .field select:focus,
    .field textarea:focus {
      border-color: #987b9a;
      box-shadow: 0 0 0 3px #987b9a18;
    }

    .submit {
      width: 100%;
      padding: 14px;
      border: none;
      border-radius: 25px;
      background: #987b9a;
      color: white;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
    }

    .submit:hover {
      background: #806483;
    }

    .placeholder {
      background: white;
      padding: 35px;
      border: 1px solid #eee5ef;
      border-radius: 15px;
      color: #756b76;
      line-height: 1.7;
    }

    .placeholder h2 {
      color: #66516b;
      margin-top: 0;
    }

    .notice {
      font-size: 12px;
      color: #928694;
      margin-top: 20px;
      line-height: 1.6;
    }

    .patient-details {
      margin-bottom: 20px;
      background: #f8eff8;
    }

    .patient-details p {
      font-size: 13px;
      line-height: 1.7;
    }

    .status {
      display: inline-block;
      padding: 7px 11px;
      border-radius: 20px;
      background: #f3eaf5;
      color: #806483 !important;
      font-size: 11px !important;
      font-weight: bold;
    }

    .agenda-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .agenda-actions button {
      width: auto;
      margin: 0;
      padding: 9px 12px;
    }

    .empty {
      text-align: center;
      padding: 30px 15px;
      color: #928694;
      font-size: 14px;
      line-height: 1.6;
    }

    .record-card {
      background: #fff;
      border: 1px solid #eee5ef;
      border-radius: 13px;
      padding: 20px;
      margin-top: 14px;
    }

    .record-card h3 {
      color: #66516b;
      margin: 0 0 8px;
      font-size: 15px;
    }

    .record-date {
      color: #928694;
      font-size: 12px;
      margin-bottom: 14px;
    }

    .record-text {
      color: #514653;
      font-size: 14px;
      line-height: 1.7;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }

    .document-warning {
      margin: 20px 0;
      padding: 13px;
      background: #fff5e9;
      border-radius: 9px;
      color: #80613c;
      font-size: 12px;
      line-height: 1.6;
    }

    .document-preview {
      padding: 30px;
    }

    .document-preview h2 {
      color: #66516b;
      text-align: center;
      margin: 20px 0;
    }

    .document-preview .record-text {
      margin: 25px 0;
    }

    @media (max-width: 850px) {
      .sidebar {
        width: 210px;
      }

      .main {
        padding: 25px 20px;
      }

      .cards {
        grid-template-columns: 1fr;
      }

      .content-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 600px) {
      .layout {
        flex-direction: column;
      }

      .sidebar {
        width: 100%;
        padding: 15px;
      }

      .logo {
        max-width: 150px;
        margin-bottom: 15px;
      }

      .menu {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }

      .menu-title,
      .sidebar-bottom {
        display: none;
      }

      .main {
        padding: 22px 15px;
      }

      .topbar {
        align-items: flex-start;
        flex-direction: column;
      }

      .topbar h1 {
        font-size: 22px;
      }
    }

    @media print {
      body {
        background: white;
      }

      .sidebar,
      .topbar,
      .section-heading,
      .document-form,
      .document-warning,
      .print-button,
      .notice {
        display: none !important;
      }

      .layout,
      .main {
        display: block;
        padding: 0;
        margin: 0;
      }

      .document-preview {
        border: none;
        padding: 20px;
        margin: 0;
      }
    }
  `

  private menuItems = [
    { id: 'visao-geral', label: 'Visão geral' },
    { id: 'pacientes', label: 'Pacientes' },
    { id: 'agenda', label: 'Agenda' },
    { id: 'prontuarios', label: 'Prontuários' },
    { id: 'documentos', label: 'Documentos' },
    { id: 'financeiro', label: 'Financeiro' },
  ]

  private mudarPagina(pagina: string) {
    this.paginaAtual = pagina
  }

  // PACIENTES
  private cadastrarPaciente(event: Event) {
    event.preventDefault()

    const formulario = event.target as HTMLFormElement
    const dados = new FormData(formulario)

    const novoPaciente = {
      nome: String(dados.get('nome') || ''),
      email: String(dados.get('email') || ''),
      telefone: String(dados.get('telefone') || ''),
      nascimento: String(dados.get('nascimento') || ''),
      status: 'Ativo',
    }

    this.pacientes = [...this.pacientes, novoPaciente]
    this.mostrarCadastro = false
    this.pacienteSelecionado = null
    formulario.reset()
  }

  private visualizarPaciente(index: number) {
    this.pacienteSelecionado = index
  }

  private excluirPaciente(index: number) {
    this.pacientes = this.pacientes.filter((_, i) => i !== index)
    this.pacienteSelecionado = null
  }

  // AGENDA
  private cadastrarSessao(event: Event) {
    event.preventDefault()

    const formulario = event.target as HTMLFormElement
    const dados = new FormData(formulario)

    const novaSessao = {
      paciente: String(dados.get('paciente') || ''),
      data: String(dados.get('data') || ''),
      horario: String(dados.get('horario') || ''),
      modalidade: String(dados.get('modalidade') || ''),
      status: 'Agendada',
    }

    this.sessoes = [...this.sessoes, novaSessao]
    this.mostrarCadastroSessao = false
    formulario.reset()
  }

  private atualizarStatusSessao(index: number, status: string) {
    this.sessoes = this.sessoes.map((sessao, i) =>
      i === index ? { ...sessao, status } : sessao,
    )
  }

  private excluirSessao(index: number) {
    if (confirm('Deseja excluir este agendamento de demonstração?')) {
      this.sessoes = this.sessoes.filter((_, i) => i !== index)
    }
  }

  private formatarData(data: string) {
    if (!data) return 'Data não informada'

    const [ano, mes, dia] = data.split('-')
    return `${dia}/${mes}/${ano}`
  }

  // PRONTUÁRIOS
  private cadastrarProntuario(event: Event) {
    event.preventDefault()

    const formulario = event.target as HTMLFormElement
    const dados = new FormData(formulario)

    const novoRegistro = {
      paciente: String(dados.get('paciente') || ''),
      data: String(dados.get('data') || ''),
      registro: String(dados.get('registro') || '').trim(),
    }

    if (
      !novoRegistro.paciente ||
      !novoRegistro.data ||
      !novoRegistro.registro
    ) {
      alert('Preencha todos os campos para salvar o registro.')
      return
    }

    this.prontuarios = [...this.prontuarios, novoRegistro]
    this.mostrarCadastroProntuario = false
    formulario.reset()
  }

  private excluirProntuario(index: number) {
    if (confirm('Deseja excluir este registro de demonstração?')) {
      this.prontuarios = this.prontuarios.filter(
        (_, i) => i !== index,
      )
    }
  }

  // DOCUMENTOS
  private gerarPreviaDocumento(event: Event) {
    event.preventDefault()

    const formulario = event.target as HTMLFormElement
    const dados = new FormData(formulario)

    this.tipoDocumento = String(dados.get('tipo') || '')
    this.pacienteDocumento = String(dados.get('paciente') || '')
    this.dataDocumento = String(dados.get('data') || '')
    this.conteudoDocumento = String(dados.get('conteudo') || '').trim()

    if (
      !this.tipoDocumento ||
      !this.pacienteDocumento ||
      !this.dataDocumento ||
      !this.conteudoDocumento
    ) {
      alert('Preencha todos os campos do documento.')
      return
    }

    this.mostrarPreviaDocumento = true
  }

  private renderDocumentos() {
    return html`
      <div class="section-heading">
        <div>
          <h2>Documentos psicológicos</h2>
          <p class="subtitle">
            Preparação e visualização de documentos profissionais.
          </p>
        </div>
      </div>

      ${this.pacientes.length === 0
        ? html`
            <div class="panel">
              <h3>Nenhum paciente cadastrado</h3>
              <p class="notice">
                Cadastre um paciente na seção Pacientes antes de preparar
                um documento nesta demonstração.
              </p>

              <button
                class="submit"
                @click=${() => this.mudarPagina('pacientes')}
              >
                Ir para Pacientes
              </button>
            </div>
          `
        : html`
            <form
              class="panel document-form"
              @submit=${this.gerarPreviaDocumento}
            >
              <h3>Novo documento</h3>

              <div class="field">
                <label>Tipo de documento</label>

                <select name="tipo" required>
                  <option value="">Selecione o documento</option>
                  <option value="Declaração de comparecimento">
                    Declaração de comparecimento
                  </option>
                  <option value="Declaração de acompanhamento psicológico">
                    Declaração de acompanhamento psicológico
                  </option>
                  <option value="Atestado psicológico">
                    Atestado psicológico
                  </option>
                  <option value="Relatório psicológico">
                    Relatório psicológico
                  </option>
                  <option value="Laudo psicológico">
                    Laudo psicológico
                  </option>
                  <option value="Parecer psicológico">
                    Parecer psicológico
                  </option>
                </select>
              </div>

              <div class="field">
                <label>Paciente</label>

                <select name="paciente" required>
                  <option value="">Selecione um paciente</option>

                  ${this.pacientes.map(
                    (paciente) => html`
                      <option value=${paciente.nome}>
                        ${paciente.nome}
                      </option>
                    `,
                  )}
                </select>
              </div>

              <div class="field">
                <label>Data do documento</label>
                <input type="date" name="data" required />
              </div>

              <div class="field">
                <label>Conteúdo do documento</label>

                <textarea
                  name="conteudo"
                  rows="8"
                  required
                  placeholder="Insira o conteúdo que será revisado pela psicóloga..."
                ></textarea>
              </div>

              <button class="submit" type="submit">
                Visualizar documento
              </button>
            </form>
          `}

      ${this.mostrarPreviaDocumento
        ? html`
            <article class="record-card document-preview">
              <p class="record-date">PRÉ-VISUALIZAÇÃO · RASCUNHO</p>

              <h2>${this.tipoDocumento}</h2>

              <p>
                <strong>Paciente:</strong>
                ${this.pacienteDocumento}
              </p>

              <p>
                <strong>Data:</strong>
                ${this.formatarData(this.dataDocumento)}
              </p>

              <div class="record-text">${this.conteudoDocumento}</div>

              <div class="document-warning">
                Este documento é apenas uma prévia de demonstração.
                Deve ser revisado, fundamentado, assinado e autorizado
                pela psicóloga antes de qualquer emissão.
              </div>

              <button
                class="submit print-button"
                @click=${() => window.print()}
              >
                Imprimir / Salvar em PDF
              </button>

              <button
                class="quick-link print-button"
                style="margin-top: 10px;"
                @click=${() => {
                  this.mostrarPreviaDocumento = false
                }}
              >
                Voltar à edição
              </button>
            </article>
          `
        : ''}

      <p class="notice">
        Os modelos são demonstrativos. A elaboração e emissão dos documentos
        devem respeitar as normas profissionais vigentes e a avaliação
        técnica da psicóloga. Não há assinatura digital nesta demonstração.
      </p>
    `
  }

  // TELA DE PACIENTES
  private renderPacientes() {
    const pacientesFiltrados = this.pacientes
      .map((paciente, index) => ({ paciente, index }))
      .filter(({ paciente }) =>
        paciente.nome.toLowerCase().includes(
          this.buscaPaciente.toLowerCase(),
        ),
      )

    const pacienteAtual =
      this.pacienteSelecionado !== null
        ? this.pacientes[this.pacienteSelecionado]
        : null

    return html`
      <div class="section-heading">
        <h2>Pacientes cadastrados</h2>

        <button
          class="quick-link"
          style="width: auto; margin: 0;"
          @click=${() => {
            this.mostrarCadastro = !this.mostrarCadastro
            this.pacienteSelecionado = null
          }}
        >
          ${this.mostrarCadastro ? 'Cancelar' : '+ Novo paciente'}
        </button>
      </div>

      ${this.mostrarCadastro
        ? html`
            <form class="panel" @submit=${this.cadastrarPaciente}>
              <h3>Novo cadastro</h3>

              <div class="field">
                <label>Nome completo</label>
                <input name="nome" type="text" required />
              </div>

              <div class="field">
                <label>E-mail</label>
                <input name="email" type="email" required />
              </div>

              <div class="field">
                <label>Telefone</label>
                <input name="telefone" type="tel" required />
              </div>

              <div class="field">
                <label>Data de nascimento (opcional)</label>
                <input name="nascimento" type="date" />
              </div>

              <button class="submit" type="submit">
                Cadastrar paciente
              </button>
            </form>
          `
        : ''}

      ${pacienteAtual
        ? html`
            <div class="panel patient-details">
              <h3>Detalhes do paciente</h3>

              <p><strong>Nome:</strong> ${pacienteAtual.nome}</p>
              <p><strong>E-mail:</strong> ${pacienteAtual.email}</p>
              <p><strong>Telefone:</strong> ${pacienteAtual.telefone}</p>
              <p>
                <strong>Nascimento:</strong>
                ${pacienteAtual.nascimento || 'Não informado'}
              </p>
              <p><strong>Status:</strong> ${pacienteAtual.status}</p>

              <button
                class="quick-link"
                @click=${() => (this.pacienteSelecionado = null)}
              >
                Fechar detalhes
              </button>
            </div>
          `
        : ''}

      <div class="panel" style="margin-top: 20px;">
        <div class="field">
          <label>Pesquisar paciente</label>

          <input
            type="search"
            placeholder="Digite o nome do paciente..."
            .value=${this.buscaPaciente}
            @input=${(event: Event) =>
              (this.buscaPaciente = (
                event.target as HTMLInputElement
              ).value)}
          />
        </div>

        ${pacientesFiltrados.length === 0
          ? html`
              <p class="notice">
                ${this.pacientes.length === 0
                  ? 'Nenhum paciente cadastrado nesta demonstração.'
                  : 'Nenhum paciente encontrado.'}
              </p>
            `
          : pacientesFiltrados.map(
              ({ paciente, index }) => html`
                <div class="appointment">
                  <div>
                    <strong>${paciente.nome}</strong>
                    <span>
                      ${paciente.email} · ${paciente.telefone}
                    </span>
                  </div>

                  <span class="time">${paciente.status}</span>

                  <button
                    class="quick-link"
                    style="width: auto; margin: 0;"
                    @click=${() => this.visualizarPaciente(index)}
                  >
                    Visualizar
                  </button>

                  <button
                    class="quick-link"
                    style="width: auto; margin: 0;"
                    @click=${() => {
                      if (
                        confirm(
                          'Deseja excluir este cadastro de demonstração?',
                        )
                      ) {
                        this.excluirPaciente(index)
                      }
                    }}
                  >
                    Excluir
                  </button>
                </div>
              `,
            )}
      </div>

      <p class="notice">
        Demonstração temporária. Não insira dados reais de pacientes.
      </p>
    `
  }

  // TELA DE AGENDA
  private renderAgenda() {
    const sessoesOrdenadas = this.sessoes
      .map((sessao, index) => ({ sessao, index }))
      .sort((a, b) =>
        `${a.sessao.data} ${a.sessao.horario}`.localeCompare(
          `${b.sessao.data} ${b.sessao.horario}`,
        ),
      )

    return html`
      <div class="section-heading">
        <h2>Organização dos atendimentos</h2>

        <button
          class="quick-link"
          style="width: auto; margin: 0;"
          @click=${() => {
            this.mostrarCadastroSessao = !this.mostrarCadastroSessao
          }}
        >
          ${this.mostrarCadastroSessao ? 'Cancelar' : '+ Nova sessão'}
        </button>
      </div>

      ${this.mostrarCadastroSessao
        ? html`
            <form class="panel" @submit=${this.cadastrarSessao}>
              <h3>Novo agendamento</h3>

              ${this.pacientes.length === 0
                ? html`
                    <p class="notice">
                      Primeiro, cadastre um paciente na seção Pacientes
                      para conseguir criar um agendamento.
                    </p>

                    <button
                      type="button"
                      class="quick-link"
                      @click=${() => {
                        this.mostrarCadastroSessao = false
                        this.mudarPagina('pacientes')
                      }}
                    >
                      Ir para Pacientes
                    </button>
                  `
                : html`
                    <div class="field">
                      <label>Paciente</label>

                      <select name="paciente" required>
                        <option value="">Selecione um paciente</option>

                        ${this.pacientes.map(
                          (paciente) => html`
                            <option value=${paciente.nome}>
                              ${paciente.nome}
                            </option>
                          `,
                        )}
                      </select>
                    </div>

                    <div class="field">
                      <label>Data da sessão</label>
                      <input name="data" type="date" required />
                    </div>

                    <div class="field">
                      <label>Horário</label>
                      <input name="horario" type="time" required />
                    </div>

                    <div class="field">
                      <label>Modalidade</label>

                      <select name="modalidade" required>
                        <option value="">Selecione</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Online">Online</option>
                      </select>
                    </div>

                    <button class="submit" type="submit">
                      Salvar agendamento
                    </button>
                  `}
            </form>
          `
        : ''}

      <div class="panel" style="margin-top: 20px;">
        <h3>Atendimentos agendados</h3>

        ${sessoesOrdenadas.length === 0
          ? html`
              <div class="empty">
                <p>◷</p>
                <strong>Nenhuma sessão cadastrada</strong>
                <p>
                  Os agendamentos aparecerão aqui depois de cadastrados.
                </p>
              </div>
            `
          : sessoesOrdenadas.map(
              ({ sessao, index }) => html`
                <div class="appointment">
                  <div>
                    <strong>${sessao.paciente}</strong>
                    <span>
                      ${this.formatarData(sessao.data)}
                      · ${sessao.horario}
                    </span>
                    <br />
                    <span>${sessao.modalidade}</span>
                  </div>

                  <span class="status">${sessao.status}</span>

                  <div class="agenda-actions">
                    ${sessao.status === 'Agendada'
                      ? html`
                          <button
                            class="quick-link"
                            @click=${() =>
                              this.atualizarStatusSessao(index, 'Realizada')}
                          >
                            Realizada
                          </button>

                          <button
                            class="quick-link"
                            @click=${() =>
                              this.atualizarStatusSessao(index, 'Cancelada')}
                          >
                            Cancelar
                          </button>
                        `
                      : ''}

                    <button
                      class="quick-link"
                      @click=${() => this.excluirSessao(index)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              `,
            )}
      </div>

      <p class="notice">
        Esta agenda é apenas uma demonstração. Os agendamentos não são
        salvos permanentemente e serão perdidos ao atualizar a página.
      </p>
    `
  }

  // TELA DE PRONTUÁRIOS
  private renderProntuarios() {
    const registrosFiltrados = this.prontuarios
      .map((registro, index) => ({ registro, index }))
      .filter(({ registro }) =>
        registro.paciente.toLowerCase().includes(
          this.buscaProntuario.toLowerCase(),
        ),
      )
      .sort((a, b) =>
        b.registro.data.localeCompare(a.registro.data),
      )

    return html`
      <div class="section-heading">
        <h2>Registros e evoluções profissionais</h2>

        <button
          class="quick-link"
          style="width: auto; margin: 0;"
          @click=${() => {
            this.mostrarCadastroProntuario =
              !this.mostrarCadastroProntuario
          }}
        >
          ${this.mostrarCadastroProntuario
            ? 'Cancelar'
            : '+ Novo registro'}
        </button>
      </div>

      ${this.mostrarCadastroProntuario
        ? html`
            <form
              class="panel"
              @submit=${this.cadastrarProntuario}
            >
              <h3>Novo registro profissional</h3>

              ${this.pacientes.length === 0
                ? html`
                    <p class="notice">
                      Primeiro, cadastre um paciente na seção
                      Pacientes para adicionar um registro.
                    </p>

                    <button
                      type="button"
                      class="quick-link"
                      @click=${() => {
                        this.mostrarCadastroProntuario = false
                        this.mudarPagina('pacientes')
                      }}
                    >
                      Ir para Pacientes
                    </button>
                  `
                : html`
                    <div class="field">
                      <label>Paciente</label>

                      <select name="paciente" required>
                        <option value="">
                          Selecione um paciente
                        </option>

                        ${this.pacientes.map(
                          (paciente) => html`
                            <option value=${paciente.nome}>
                              ${paciente.nome}
                            </option>
                          `,
                        )}
                      </select>
                    </div>

                    <div class="field">
                      <label>Data do atendimento</label>
                      <input type="date" name="data" required />
                    </div>

                    <div class="field">
                      <label>Registro da evolução</label>

                      <textarea
                        name="registro"
                        placeholder="Campo demonstrativo para observações profissionais..."
                        required
                      ></textarea>
                    </div>

                    <button class="submit" type="submit">
                      Salvar registro
                    </button>
                  `}
            </form>
          `
        : ''}

      <div class="panel" style="margin-top: 20px;">
        <h3>Histórico de registros</h3>

        <div class="field">
          <label>Pesquisar por paciente</label>

          <input
            type="search"
            placeholder="Digite o nome do paciente..."
            .value=${this.buscaProntuario}
            @input=${(event: Event) =>
              (this.buscaProntuario = (
                event.target as HTMLInputElement
              ).value)}
          />
        </div>

        ${registrosFiltrados.length === 0
          ? html`
              <div class="empty">
                <strong>Nenhum registro encontrado</strong>
                <p>
                  Os registros profissionais cadastrados aparecerão
                  nesta área.
                </p>
              </div>
            `
          : registrosFiltrados.map(
              ({ registro, index }) => html`
                <article class="record-card">
                  <h3>${registro.paciente}</h3>

                  <div class="record-date">
                    Atendimento em ${this.formatarData(registro.data)}
                  </div>

                  <div class="record-text">${registro.registro}</div>

                  <div class="agenda-actions" style="margin-top: 18px;">
                    <button
                      class="quick-link"
                      style="width: auto; margin: 0;"
                      @click=${() => this.excluirProntuario(index)}
                    >
                      Excluir registro
                    </button>
                  </div>
                </article>
              `,
            )}
      </div>

      <p class="notice">
        Demonstração de interface. Os registros são temporários e
        não possuem armazenamento seguro. Não insira informações
        reais ou dados pessoais de pacientes.
      </p>
    `
  }

  // VISÃO GERAL
  private renderVisaoGeral() {
    return html`
      <section class="welcome">
        <h2>Bem-vinda, Alessandra! 💜</h2>
        <p>
          Este é o seu espaço de organização profissional.
          Acompanhe sua agenda e gerencie suas atividades em um só lugar.
        </p>
      </section>

      <div class="section-heading">
        <h2>Resumo geral</h2>
      </div>

      <section class="cards">
        <article class="card">
          <div class="card-label">Pacientes cadastrados</div>
          <div class="card-number">${this.pacientes.length}</div>
          <div class="card-description">Cadastros nesta demonstração</div>
        </article>

        <article class="card">
          <div class="card-label">Sessões cadastradas</div>
          <div class="card-number">${this.sessoes.length}</div>
          <div class="card-description">Agendamentos nesta demonstração</div>
        </article>

        <article class="card">
          <div class="card-label">Documentos preparados</div>
          <div class="card-number">--</div>
          <div class="card-description">Pré-visualizações não são armazenadas</div>
        </article>
      </section>

      <section class="content-grid">
        <div class="panel">
          <h3>Próximos atendimentos</h3>

          ${this.sessoes.length === 0
            ? html`
                <div class="appointment">
                  <div>
                    <strong>Agenda não configurada</strong>
                    <span>Os atendimentos aparecerão aqui.</span>
                  </div>
                </div>
              `
            : this.sessoes
                .filter((sessao) => sessao.status === 'Agendada')
                .slice()
                .sort((a, b) =>
                  `${a.data} ${a.horario}`.localeCompare(
                    `${b.data} ${b.horario}`,
                  ),
                )
                .slice(0, 3)
                .map(
                  (sessao) => html`
                    <div class="appointment">
                      <div>
                        <strong>${sessao.paciente}</strong>
                        <span>
                          ${this.formatarData(sessao.data)}
                          · ${sessao.modalidade}
                        </span>
                      </div>

                      <span class="time">${sessao.horario}</span>
                    </div>
                  `,
                )}

          <p class="notice">
            Os dados exibidos são registros temporários desta demonstração.
          </p>
        </div>

        <div class="panel">
          <h3>Acesso rápido</h3>

          <button
            class="quick-link"
            @click=${() => this.mudarPagina('pacientes')}
          >
            + Gerenciar pacientes
          </button>

          <button
            class="quick-link"
            @click=${() => this.mudarPagina('agenda')}
          >
            ◷ Organizar agenda
          </button>

          <button
            class="quick-link"
            @click=${() => this.mudarPagina('prontuarios')}
          >
            ▤ Acessar prontuários
          </button>

          <button
            class="quick-link"
            @click=${() => this.mudarPagina('documentos')}
          >
            ▤ Acessar documentos
          </button>
        </div>
      </section>
    `
  }

  // CONTROLE DAS PÁGINAS
  private renderPagina() {
    if (this.paginaAtual === 'pacientes') {
      return this.renderPacientes()
    }

    if (this.paginaAtual === 'agenda') {
      return this.renderAgenda()
    }

    if (this.paginaAtual === 'prontuarios') {
      return this.renderProntuarios()
    }

    if (this.paginaAtual === 'documentos') {
      return this.renderDocumentos()
    }

    if (this.paginaAtual === 'financeiro') {
      return html`
        <section class="placeholder">
          <h2>Financeiro</h2>
          <p>
            Acompanhe os registros financeiros e pagamentos dos atendimentos.
          </p>
          <p>Esta seção será desenvolvida em uma próxima etapa.</p>
        </section>
      `
    }

    return this.renderVisaoGeral()
  }

  // RENDERIZAÇÃO PRINCIPAL
  render() {
    return html`
      <div class="layout">
        <aside class="sidebar">
          <img
            class="logo"
            src="/logo-ale.jpeg"
            alt="Alessandra Larissa - Psicóloga"
          />

          <p class="menu-title">Menu principal</p>

          <nav class="menu">
            ${this.menuItems.map(
              (item) => html`
                <button
                  class=${this.paginaAtual === item.id ? 'active' : ''}
                  @click=${() => this.mudarPagina(item.id)}
                >
                  ${item.label}
                </button>
              `,
            )}
          </nav>

          <div class="sidebar-bottom">
            <a class="back-link" href="/">← Voltar ao site</a>
            <a class="back-link" href="/login.html">
              Sair da demonstração
            </a>
          </div>
        </aside>

        <main class="main">
          <header class="topbar">
            <div>
              <h1>
                ${this.menuItems.find(
                  (item) => item.id === this.paginaAtual,
                )?.label || 'Painel administrativo'}
              </h1>

              <p class="subtitle">Gestão do espaço profissional</p>
            </div>

            <div class="profile">
              <div class="avatar">AL</div>

              <div>
                <strong>Alessandra Larissa</strong>
                <span>Psicóloga</span>
              </div>
            </div>
          </header>

          ${this.paginaAtual === 'visao-geral'
            ? this.renderVisaoGeral()
            : this.renderPagina()}
        </main>
      </div>
    `
  }
}

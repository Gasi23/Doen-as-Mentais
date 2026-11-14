
import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { supabase } from './supabase'

interface Paciente {
  id: string
  nome: string
  email: string
  telefone: string
  nascimento: string
  status: string
}

interface Sessao {
  paciente: string
  data: string
  horario: string
  modalidade: string
  status: string
}

interface Prontuario {
  paciente: string
  data: string
  registro: string
}

interface Documento {
  tipo: string
  paciente: string
  data: string
  conteudo: string
}

interface Pagamento {
  paciente: string
  valor: number
  data: string
  formaPagamento: string
  status: string
}

@customElement('painel-psicologa')
export class PainelPsicologa extends LitElement {
    @state()
  private autenticado = false

  @state()
  private verificandoAcesso = true

  @state()
  private paginaAtual = 'visao-geral'

  // PACIENTES
  @state()
  private buscaPaciente = ''

  @state()
  private mostrarCadastro = false

  @state()
  private pacientes: Paciente[] = []

  private async carregarPacientes() {
  try {
    const { data, error } = await supabase
      .from('pacientes')
      .select('id, nome, email, telefone, data_nascimento')
      .order('criado_em', { ascending: false })

    if (error) {
      throw error
    }

    this.pacientes = (data || []).map(paciente => ({
      id: paciente.id,
      nome: paciente.nome,
      email: paciente.email || '',
      telefone: paciente.telefone || '',
      nascimento: paciente.data_nascimento || '',
      status: 'Ativo',
    }))
  } catch (error) {
    console.error('Erro ao carregar pacientes:', error)
    window.alert('Não foi possível carregar os pacientes.')
  }
}

  // AGENDA
  @state()
  private mostrarCadastroSessao = false

  @state()
  private sessoes: Sessao[] = []

  // PRONTUÁRIOS
  @state()
  private mostrarCadastroProntuario = false

  @state()
  private buscaProntuario = ''

  @state()
  private prontuarios: Prontuario[] = []

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

  @state()
  private documentos: Documento[] = []

  // FINANCEIRO
  @state()
  private mostrarCadastroPagamento = false

  @state()
  private pagamentos: Pagamento[] = []

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      color: #514653;
      background: #fffcfa;
      font-family: Arial, Helvetica, sans-serif;
    }

    * {
      box-sizing: border-box;
    }

    button, input, select, textarea {
      font: inherit;
    }

    .layout {
      display: flex;
      min-height: 100vh;
    }

    .sidebar {
      width: 250px;
      flex-shrink: 0;
      padding: 28px 18px;
      background: #f3eaf5;
      border-right: 1px solid #eadfea;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 38px;
      padding: 0 8px;
    }

    .brand img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
    }

    .brand strong {
      display: block;
      font-size: 15px;
      color: #806483;
    }

    .brand span {
      display: block;
      margin-top: 4px;
      font-size: 11px;
      color: #887b8b;
    }

    .menu-label {
      margin: 20px 10px 10px;
      color: #9a8b9c;
      font-size: 10px;
      font-weight: bold;
      letter-spacing: 1.2px;
      text-transform: uppercase;
    }

    .menu {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .menu button {
      width: 100%;
      padding: 12px 14px;
      display: flex;
      align-items: center;
      gap: 12px;
      border: 0;
      border-radius: 10px;
      background: transparent;
      color: #655768;
      text-align: left;
      cursor: pointer;
      transition: .2s;
    }

    .menu button:hover,
    .menu button.active {
      background: #806483;
      color: white;
    }

    .main {
      flex: 1;
      min-width: 0;
      padding: 30px;
    }

    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 15px;
      margin-bottom: 30px;
    }

    .topbar h1 {
      margin: 0;
      font-size: 25px;
      color: #514653;
    }

    .topbar p {
      margin: 7px 0 0;
      color: #938895;
      font-size: 13px;
    }

    .profile {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 13px;
      color: #806483;
    }

.btn-sair {
  border: 1px solid #e7d6e9;
  background: #fff;
  color: #806483;
  padding: 9px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  transition: 0.2s;
}

.btn-sair:hover {
  background: #f4eaf5;
}

    .profile-avatar {
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: #f4b8b8;
      color: white;
      font-weight: bold;
    }

    .page-content {
      display: flex;
      flex-direction: column;
      gap: 22px;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
    }

    .card, .panel {
      padding: 22px;
      border: 1px solid #eee6ee;
      border-radius: 15px;
      background: white;
      box-shadow: 0 3px 14px rgba(80, 55, 80, .04);
    }

    .card-label {
      color: #8d8190;
      font-size: 13px;
    }

    .card-value {
      margin-top: 12px;
      color: #806483;
      font-size: 28px;
      font-weight: bold;
    }

    .card-description {
      margin-top: 7px;
      color: #a398a5;
      font-size: 12px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 18px;
    }

    .section-header h2,
    .panel h2 {
      margin: 0;
      color: #514653;
      font-size: 18px;
    }

    .section-header p {
      margin: 6px 0 0;
      color: #968b98;
      font-size: 12px;
    }

    .primary-button {
      padding: 11px 17px;
      border: 0;
      border-radius: 9px;
      background: #806483;
      color: white;
      cursor: pointer;
      font-size: 13px;
      font-weight: bold;
    }

    .primary-button:hover {
      background: #6d5370;
    }

    .secondary-button {
      padding: 9px 14px;
      border: 1px solid #d9cbdc;
      border-radius: 9px;
      background: white;
      color: #806483;
      cursor: pointer;
    }

    .danger-button {
      padding: 8px 11px;
      border: 0;
      border-radius: 8px;
      background: #fff0f0;
      color: #bd6565;
      cursor: pointer;
      font-size: 12px;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 15px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 7px;
    }

    .form-group.full {
      grid-column: 1 / -1;
    }

    .form-group label {
      color: #68596b;
      font-size: 12px;
      font-weight: bold;
    }

    input, select, textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #e5dce7;
      border-radius: 9px;
      outline: none;
      background: #fff;
      color: #514653;
    }

    input:focus, select:focus, textarea:focus {
      border-color: #987b9a;
      box-shadow: 0 0 0 3px #f3eaf5;
    }

    textarea {
      min-height: 120px;
      resize: vertical;
    }

    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 18px;
    }

    .search {
      max-width: 360px;
      margin-bottom: 18px;
    }

    .table-wrapper {
      width: 100%;
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }

    th, td {
      padding: 14px 12px;
      border-bottom: 1px solid #f0eaf0;
      text-align: left;
      white-space: nowrap;
    }

    th {
      color: #887b8b;
      font-size: 11px;
      text-transform: uppercase;
    }

    td {
      color: #5f5362;
    }

    .status {
      display: inline-block;
      padding: 6px 10px;
      border-radius: 20px;
      background: #f3eaf5;
      color: #806483;
      font-size: 11px;
      font-weight: bold;
    }

    .status.pago, .status.realizada, .status.ativo {
      background: #e9f5ed;
      color: #42835a;
    }

    .status.pendente {
      background: #fff4df;
      color: #a67a29;
    }

    .status.cancelada, .status.inativo {
      background: #fff0f0;
      color: #bd6565;
    }

    .empty {
      padding: 30px 15px;
      color: #968b98;
      text-align: center;
      font-size: 13px;
    }

    .notice {
      padding: 13px 15px;
      border-radius: 10px;
      background: #f8eff8;
      color: #806483;
      font-size: 12px;
      line-height: 1.6;
    }

    .document-preview {
      padding: 28px;
      border: 1px solid #e8dfe8;
      border-radius: 10px;
      background: white;
      line-height: 1.8;
      white-space: pre-wrap;
    }

    .document-preview h3 {
      text-align: center;
      color: #514653;
    }

    .document-preview p {
      margin: 12px 0;
    }

    .signature {
      margin-top: 60px;
      text-align: center;
    }

    .signature-line {
      width: 240px;
      margin: 0 auto 8px;
      border-top: 1px solid #514653;
    }

    .finance-total {
      color: #806483;
      font-size: 25px;
      font-weight: bold;
    }

    @media (max-width: 850px) {
      .layout {
        flex-direction: column;
      }

      .sidebar {
        width: 100%;
        padding: 15px;
      }

      .brand {
        margin-bottom: 15px;
      }

      .menu {
        flex-direction: row;
        overflow-x: auto;
      }

      .menu button {
        width: auto;
        flex-shrink: 0;
        font-size: 12px;
      }

      .menu-label {
        display: none;
      }

      .main {
        padding: 20px 15px;
      }
    }

    @media (max-width: 600px) {
      .cards {
        grid-template-columns: 1fr;
      }

      .form-grid {
        grid-template-columns: 1fr;
      }

      .form-group.full {
        grid-column: auto;
      }

      .topbar {
        align-items: flex-start;
      }

      .topbar h1 {
        font-size: 21px;
      }

      .profile span {
        display: none;
      }
    }

    @media print {
      body * {
        visibility: hidden;
      }

      .document-preview,
      .document-preview * {
        visibility: visible;
      }

      .document-preview {
        position: absolute;
        inset: 0;
        width: 100%;
        border: 0;
      }

      .no-print {
        display: none !important;
      }
    }
  `

  private menuItems = [
    { id: 'visao-geral', nome: 'Visão geral', icone: '⌂' },
    { id: 'pacientes', nome: 'Pacientes', icone: '♙' },
    { id: 'agenda', nome: 'Agenda', icone: '▦' },
    { id: 'prontuarios', nome: 'Prontuários', icone: '▤' },
    { id: 'documentos', nome: 'Documentos', icone: '▧' },
    { id: 'financeiro', nome: 'Financeiro', icone: 'R$' },
  ]

  private navegar(pagina: string) {
    this.paginaAtual = pagina
    this.mostrarCadastro = false
    this.mostrarCadastroSessao = false
    this.mostrarCadastroProntuario = false
    this.mostrarCadastroPagamento = false
    this.mostrarPreviaDocumento = false
  }

  private formatarData(data: string) {
    if (!data) return '-'

    const partes = data.split('-')
    if (partes.length !== 3) return data

    return `${partes[2]}/${partes[1]}/${partes[0]}`
  }

  private formatarMoeda(valor: number) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  private classeStatus(status: string) {
    return status.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
  }

  // PACIENTES
  
private async cadastrarPaciente(event: Event) {
  event.preventDefault()

  const formulario = event.currentTarget as HTMLFormElement
  const dados = new FormData(formulario)

  const novoPaciente = {
    nome: String(dados.get('nome') || '').trim(),
    email: String(dados.get('email') || '').trim(),
    telefone: String(dados.get('telefone') || '').trim(),
    data_nascimento: String(dados.get('nascimento') || '') || null,
  }

  if (!novoPaciente.nome) {
    window.alert('Informe o nome do paciente.')
    return
  }

  try {
    const { data, error } = await supabase
      .from('pacientes')
      .insert(novoPaciente)
      .select('id, nome, email, telefone, data_nascimento')
      .single()

    if (error) {
      throw error
    }

    const paciente: Paciente = {
      id: data.id,
      nome: data.nome,
      email: data.email || '',
      telefone: data.telefone || '',
      nascimento: data.data_nascimento || '',
      status: 'Ativo',
    }

    this.pacientes = [...this.pacientes, paciente]

    formulario.reset()
    this.mostrarCadastro = false

    window.alert('Paciente cadastrado com sucesso!')
  } catch (error) {
    console.error('Erro ao cadastrar paciente:', error)
    window.alert('Não foi possível cadastrar o paciente. Tente novamente.')
  }
}

  private async excluirPaciente(index: number) {
  const paciente = this.pacientes[index]

  if (!paciente) return

  if (!confirm(`Deseja excluir o paciente ${paciente.nome}?`)) {
    return
  }

  try {
    const { error } = await supabase
      .from('pacientes')
      .delete()
      .eq('id', paciente.id)

    if (error) {
      throw error
    }

    this.pacientes = this.pacientes.filter(
      p => p.id !== paciente.id
    )

    window.alert('Paciente excluído com sucesso!')
  } catch (error) {
    console.error('Erro ao excluir paciente:', error)
    window.alert('Não foi possível excluir o paciente.')
  }
}

  private renderPacientes() {
    const filtrados = this.pacientes.filter(p =>
      p.nome.toLowerCase().includes(this.buscaPaciente.toLowerCase()),
    )

    return html`
      <div class="page-content">
        <section class="panel">
          <div class="section-header">
            <div>
              <h2>Pacientes</h2>
              <p>Gerencie os cadastros de pacientes.</p>
            </div>
            <button class="primary-button"
              @click=${() => this.mostrarCadastro = !this.mostrarCadastro}>
              ${this.mostrarCadastro ? 'Fechar cadastro' : '+ Novo paciente'}
            </button>
          </div>

          ${this.mostrarCadastro ? html`
            <form @submit=${this.cadastrarPaciente}>
              <div class="form-grid">
                <div class="form-group">
                  <label>Nome completo *</label>
                  <input name="nome" required placeholder="Nome do paciente">
                </div>
                <div class="form-group">
                  <label>E-mail</label>
                  <input name="email" type="email" placeholder="E-mail">
                </div>
                <div class="form-group">
                  <label>Telefone</label>
                  <input name="telefone" placeholder="(00) 00000-0000">
                </div>
                <div class="form-group">
                  <label>Data de nascimento</label>
                  <input name="nascimento" type="date">
                </div>
                <div class="form-group">
                  <label>Status</label>
                  <select name="status">
                    <option>Ativo</option>
                    <option>Inativo</option>
                  </select>
                </div>
              </div>
              <div class="form-actions">
                <button class="primary-button" type="submit">Salvar paciente</button>
                <button class="secondary-button" type="button"
                  @click=${() => this.mostrarCadastro = false}>Cancelar</button>
              </div>
            </form>
          ` : ''}

          <div class="search">
            <input
              placeholder="Pesquisar paciente pelo nome..."
              .value=${this.buscaPaciente}
              @input=${(e: Event) =>
                this.buscaPaciente = (e.target as HTMLInputElement).value}
            >
          </div>

          ${filtrados.length ? html`
            <div class="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Paciente</th>
                    <th>E-mail</th>
                    <th>Telefone</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  ${filtrados.map(paciente => {
                    const index = this.pacientes.indexOf(paciente)
                    return html`
                      <tr>
                        <td>${paciente.nome}</td>
                        <td>${paciente.email || '-'}</td>
                        <td>${paciente.telefone || '-'}</td>
                        <td><span class="status ${this.classeStatus(paciente.status)}">${paciente.status}</span></td>
                        <td>
                          <button class="danger-button"
                            @click=${() => this.excluirPaciente(index)}>Excluir</button>
                        </td>
                      </tr>
                    `
                  })}
                </tbody>
              </table>
            </div>
          ` : html`<div class="empty">Nenhum paciente cadastrado.</div>`}
        </section>
      </div>
    `
  }

  // AGENDA
  private cadastrarSessao(event: Event) {
    event.preventDefault()

    const formulario = event.target as HTMLFormElement
    const dados = new FormData(formulario)

    const sessao: Sessao = {
      paciente: String(dados.get('paciente') || ''),
      data: String(dados.get('data') || ''),
      horario: String(dados.get('horario') || ''),
      modalidade: String(dados.get('modalidade') || ''),
      status: String(dados.get('status') || 'Agendada'),
    }

    if (!sessao.paciente || !sessao.data || !sessao.horario) {
      alert('Preencha os campos obrigatórios.')
      return
    }

    this.sessoes = [...this.sessoes, sessao]
    formulario.reset()
    this.mostrarCadastroSessao = false
  }

  private atualizarStatusSessao(index: number, status: string) {
    this.sessoes = this.sessoes.map((sessao, i) =>
      i === index ? { ...sessao, status } : sessao,
    )
  }

  private excluirSessao(index: number) {
    if (confirm('Deseja excluir este atendimento de demonstração?')) {
      this.sessoes = this.sessoes.filter((_, i) => i !== index)
    }
  }

  private renderAgenda() {
    return html`
      <div class="page-content">
        <section class="panel">
          <div class="section-header">
            <div>
              <h2>Agenda de atendimentos</h2>
              <p>Organize os horários e acompanhe os atendimentos.</p>
            </div>
            <button class="primary-button"
              ?disabled=${this.pacientes.length === 0}
              @click=${() => this.mostrarCadastroSessao = !this.mostrarCadastroSessao}>
              + Novo atendimento
            </button>
          </div>

          ${this.pacientes.length === 0 ? html`
            <div class="notice">Cadastre um paciente antes de agendar um atendimento.</div>
          ` : ''}

          ${this.mostrarCadastroSessao ? html`
            <form @submit=${this.cadastrarSessao}>
              <div class="form-grid">
                <div class="form-group">
                  <label>Paciente *</label>
                  <select name="paciente" required>
                    <option value="">Selecione</option>
                    ${this.pacientes.map(p => html`<option value=${p.nome}>${p.nome}</option>`)}
                  </select>
                </div>
                <div class="form-group">
                  <label>Data *</label>
                  <input name="data" type="date" required>
                </div>
                <div class="form-group">
                  <label>Horário *</label>
                  <input name="horario" type="time" required>
                </div>
                <div class="form-group">
                  <label>Modalidade</label>
                  <select name="modalidade">
                    <option>Presencial</option>
                    <option>Online</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Status</label>
                  <select name="status">
                    <option>Agendada</option>
                    <option>Realizada</option>
                    <option>Cancelada</option>
                  </select>
                </div>
              </div>
              <div class="form-actions">
                <button class="primary-button" type="submit">Salvar atendimento</button>
                <button class="secondary-button" type="button"
                  @click=${() => this.mostrarCadastroSessao = false}>Cancelar</button>
              </div>
            </form>
          ` : ''}

          ${this.sessoes.length ? html`
            <div class="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Paciente</th><th>Data</th><th>Horário</th>
                    <th>Modalidade</th><th>Status</th><th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.sessoes.map((sessao, index) => html`
                    <tr>
                      <td>${sessao.paciente}</td>
                      <td>${this.formatarData(sessao.data)}</td>
                      <td>${sessao.horario}</td>
                      <td>${sessao.modalidade}</td>
                      <td>
                        <select
                          .value=${sessao.status}
                          @change=${(e: Event) => this.atualizarStatusSessao(
                            index, (e.target as HTMLSelectElement).value,
                          )}>
                          <option>Agendada</option>
                          <option>Realizada</option>
                          <option>Cancelada</option>
                        </select>
                      </td>
                      <td><button class="danger-button"
                        @click=${() => this.excluirSessao(index)}>Excluir</button></td>
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>
          ` : html`<div class="empty">Nenhum atendimento cadastrado.</div>`}
        </section>
      </div>
    `
  }

  // PRONTUÁRIOS
  private cadastrarProntuario(event: Event) {
    event.preventDefault()

    const formulario = event.target as HTMLFormElement
    const dados = new FormData(formulario)

    const prontuario: Prontuario = {
      paciente: String(dados.get('paciente') || ''),
      data: String(dados.get('data') || ''),
      registro: String(dados.get('registro') || ''),
    }

    if (!prontuario.paciente || !prontuario.data || !prontuario.registro.trim()) {
      alert('Preencha todos os campos.')
      return
    }

    this.prontuarios = [...this.prontuarios, prontuario]
    formulario.reset()
    this.mostrarCadastroProntuario = false
  }

  private excluirProntuario(index: number) {
    if (confirm('Deseja excluir este registro de demonstração?')) {
      this.prontuarios = this.prontuarios.filter((_, i) => i !== index)
    }
  }

  private renderProntuarios() {
    const filtrados = this.prontuarios.filter(p =>
      p.paciente.toLowerCase().includes(this.buscaProntuario.toLowerCase()),
    )

    return html`
      <div class="page-content">
        <section class="panel">
          <div class="section-header">
            <div>
              <h2>Prontuários</h2>
              <p>Registros clínicos dos atendimentos.</p>
            </div>
            <button class="primary-button"
              ?disabled=${this.pacientes.length === 0}
              @click=${() => this.mostrarCadastroProntuario = !this.mostrarCadastroProntuario}>
              + Novo registro
            </button>
          </div>

          ${this.pacientes.length === 0 ? html`
            <div class="notice">Cadastre um paciente antes de criar um prontuário.</div>
          ` : ''}

          ${this.mostrarCadastroProntuario ? html`
            <form @submit=${this.cadastrarProntuario}>
              <div class="form-grid">
                <div class="form-group">
                  <label>Paciente *</label>
                  <select name="paciente" required>
                    <option value="">Selecione</option>
                    ${this.pacientes.map(p => html`<option value=${p.nome}>${p.nome}</option>`)}
                  </select>
                </div>
                <div class="form-group">
                  <label>Data do registro *</label>
                  <input name="data" type="date" required>
                </div>
                <div class="form-group full">
                  <label>Registro *</label>
                  <textarea name="registro" required
                    placeholder="Digite o registro clínico..."></textarea>
                </div>
              </div>
              <div class="form-actions">
                <button class="primary-button" type="submit">Salvar registro</button>
                <button class="secondary-button" type="button"
                  @click=${() => this.mostrarCadastroProntuario = false}>Cancelar</button>
              </div>
            </form>
          ` : ''}

          <div class="search">
            <input placeholder="Pesquisar pelo nome do paciente..."
              .value=${this.buscaProntuario}
              @input=${(e: Event) =>
                this.buscaProntuario = (e.target as HTMLInputElement).value}>
          </div>

          ${filtrados.length ? html`
           ${filtrados.map((p) => html`
              <article class="card" style="margin-bottom: 12px">
                <div class="section-header">
                  <div>
                    <strong>${p.paciente}</strong>
                    <p>${this.formatarData(p.data)}</p>
                  </div>
                  <button class="danger-button"
                    @click=${() => this.excluirProntuario(this.prontuarios.indexOf(p))}>
                    Excluir
                  </button>
                </div>
                <p style="white-space: pre-wrap; line-height: 1.7">${p.registro}</p>
              </article>
            `)}
          ` : html`<div class="empty">Nenhum prontuário encontrado.</div>`}
        </section>
      </div>
    `
  }

  // DOCUMENTOS
  private gerarDocumento(event: Event) {
    event.preventDefault()

    const formulario = event.target as HTMLFormElement
    const dados = new FormData(formulario)

    this.tipoDocumento = String(dados.get('tipo') || '')
    this.pacienteDocumento = String(dados.get('paciente') || '')
    this.dataDocumento = String(dados.get('data') || '')
    this.conteudoDocumento = String(dados.get('conteudo') || '')

    if (!this.tipoDocumento || !this.pacienteDocumento || !this.dataDocumento ||
        !this.conteudoDocumento.trim()) {
      alert('Preencha todos os campos.')
      return
    }

    this.mostrarPreviaDocumento = true
  }

  private salvarDocumento() {
    const documento: Documento = {
      tipo: this.tipoDocumento,
      paciente: this.pacienteDocumento,
      data: this.dataDocumento,
      conteudo: this.conteudoDocumento,
    }

    this.documentos = [...this.documentos, documento]
    this.mostrarPreviaDocumento = false
    alert('Documento adicionado ao histórico desta demonstração.')
  }

  private excluirDocumento(index: number) {
    if (confirm('Deseja excluir este documento de demonstração?')) {
      this.documentos = this.documentos.filter((_, i) => i !== index)
    }
  }

  private visualizarDocumento(documento: Documento) {
    this.tipoDocumento = documento.tipo
    this.pacienteDocumento = documento.paciente
    this.dataDocumento = documento.data
    this.conteudoDocumento = documento.conteudo
    this.mostrarPreviaDocumento = true
  }

  private renderDocumentos() {
    return html`
      <div class="page-content">
        <section class="panel">
          <div class="section-header">
            <div>
              <h2>Documentos</h2>
              <p>Prepare documentos para revisão profissional.</p>
            </div>
          </div>

          ${this.pacientes.length === 0 ? html`
            <div class="notice">Cadastre um paciente antes de criar um documento.</div>
          ` : ''}

          ${!this.mostrarPreviaDocumento ? html`
            <form @submit=${this.gerarDocumento}>
              <div class="form-grid">
                <div class="form-group">
                  <label>Tipo de documento *</label>
                  <select name="tipo" required>
                    <option value="">Selecione</option>
                    <option>Declaração de comparecimento</option>
                    <option>Declaração de acompanhamento</option>
                    <option>Relatório psicológico</option>
                    <option>Encaminhamento</option>
                    <option>Outro</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Paciente *</label>
                  <select name="paciente" required>
                    <option value="">Selecione</option>
                    ${this.pacientes.map(p => html`<option value=${p.nome}>${p.nome}</option>`)}
                  </select>
                </div>
                <div class="form-group">
                  <label>Data *</label>
                  <input name="data" type="date" required>
                </div>
                <div class="form-group full">
                  <label>Conteúdo do documento *</label>
                  <textarea name="conteudo" required
                    placeholder="Escreva o conteúdo para revisão da profissional..."></textarea>
                </div>
              </div>
              <div class="form-actions">
                <button class="primary-button" type="submit">Gerar prévia</button>
              </div>
            </form>
          ` : html`
            <div class="document-preview">
              <h3>${this.tipoDocumento}</h3>
              <p><strong>Paciente:</strong> ${this.pacienteDocumento}</p>
              <p><strong>Data:</strong> ${this.formatarData(this.dataDocumento)}</p>
              <p>${this.conteudoDocumento}</p>
              <div class="signature">
                <div class="signature-line"></div>
                <strong>Assinatura da profissional</strong>
                <p>Preencher identificação e registro profissional após revisão.</p>
              </div>
            </div>
            <div class="form-actions no-print">
              <button class="primary-button" @click=${() => window.print()}>
                Imprimir / Salvar PDF
              </button>
              <button class="secondary-button" @click=${this.salvarDocumento}>
                Adicionar ao histórico
              </button>
              <button class="secondary-button"
                @click=${() => this.mostrarPreviaDocumento = false}>Voltar</button>
            </div>
          `}
        </section>

        <section class="panel">
          <h2>Histórico de documentos</h2>
          ${this.documentos.length ? html`
            <div class="table-wrapper">
              <table>
                <thead>
                  <tr><th>Documento</th><th>Paciente</th><th>Data</th><th>Ações</th></tr>
                </thead>
                <tbody>
                  ${this.documentos.map((doc, index) => html`
                    <tr>
                      <td>${doc.tipo}</td>
                      <td>${doc.paciente}</td>
                      <td>${this.formatarData(doc.data)}</td>
                      <td>
                        <button class="secondary-button"
                          @click=${() => this.visualizarDocumento(doc)}>Visualizar</button>
                        <button class="danger-button"
                          @click=${() => this.excluirDocumento(index)}>Excluir</button>
                      </td>
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>
          ` : html`<div class="empty">Nenhum documento no histórico.</div>`}
        </section>
      </div>
    `
  }

  // FINANCEIRO
  private cadastrarPagamento(event: Event) {
    event.preventDefault()

    const formulario = event.target as HTMLFormElement
    const dados = new FormData(formulario)

    const valor = Number(
      String(dados.get('valor') || '').replace(',', '.'),
    )

    const pagamento: Pagamento = {
      paciente: String(dados.get('paciente') || ''),
      valor,
      data: String(dados.get('data') || ''),
      formaPagamento: String(dados.get('formaPagamento') || ''),
      status: String(dados.get('status') || ''),
    }

    if (
      !pagamento.paciente ||
      !Number.isFinite(pagamento.valor) ||
      pagamento.valor <= 0 ||
      !pagamento.data ||
      !pagamento.formaPagamento ||
      !pagamento.status
    ) {
      alert('Preencha todos os campos com informações válidas.')
      return
    }

    this.pagamentos = [...this.pagamentos, pagamento]
    formulario.reset()
    this.mostrarCadastroPagamento = false
  }

  private excluirPagamento(index: number) {
    if (confirm('Deseja excluir este lançamento financeiro de demonstração?')) {
      this.pagamentos = this.pagamentos.filter((_, i) => i !== index)
    }
  }

  private renderFinanceiro() {
    const recebidos = this.pagamentos
      .filter(p => p.status === 'Pago')
      .reduce((total, p) => total + p.valor, 0)

    const pendentes = this.pagamentos
      .filter(p => p.status === 'Pendente')
      .reduce((total, p) => total + p.valor, 0)

    return html`
      <div class="page-content">
        <section class="cards">
          <article class="card">
            <div class="card-label">Total recebido</div>
            <div class="card-value">${this.formatarMoeda(recebidos)}</div>
            <div class="card-description">Lançamentos com status pago</div>
          </article>
          <article class="card">
            <div class="card-label">Valores pendentes</div>
            <div class="card-value">${this.formatarMoeda(pendentes)}</div>
            <div class="card-description">Lançamentos aguardando pagamento</div>
          </article>
          <article class="card">
            <div class="card-label">Lançamentos</div>
            <div class="card-value">${this.pagamentos.length}</div>
            <div class="card-description">Registros financeiros cadastrados</div>
          </article>
        </section>

        <section class="panel">
          <div class="section-header">
            <div>
              <h2>Financeiro</h2>
              <p>Registre e acompanhe os pagamentos dos atendimentos.</p>
            </div>
            <button class="primary-button"
              ?disabled=${this.pacientes.length === 0}
              @click=${() => this.mostrarCadastroPagamento = !this.mostrarCadastroPagamento}>
              + Novo lançamento
            </button>
          </div>

          ${this.pacientes.length === 0 ? html`
            <div class="notice">
              Cadastre um paciente na seção Pacientes antes de registrar um pagamento.
            </div>
          ` : ''}

          ${this.mostrarCadastroPagamento ? html`
            <form @submit=${this.cadastrarPagamento}>
              <div class="form-grid">
                <div class="form-group">
                  <label>Paciente *</label>
                  <select name="paciente" required>
                    <option value="">Selecione um paciente</option>
                    ${this.pacientes.map(p => html`
                      <option value=${p.nome}>${p.nome}</option>
                    `)}
                  </select>
                </div>

                <div class="form-group">
                  <label>Valor (R$) *</label>
                  <input name="valor" type="number" min="0.01"
                    step="0.01" placeholder="Ex.: 150,00" required>
                </div>

                <div class="form-group">
                  <label>Data do pagamento *</label>
                  <input name="data" type="date" required>
                </div>

                <div class="form-group">
                  <label>Forma de pagamento *</label>
                  <select name="formaPagamento" required>
                    <option value="">Selecione</option>
                    <option>Pix</option>
                    <option>Dinheiro</option>
                    <option>Cartão de crédito</option>
                    <option>Cartão de débito</option>
                    <option>Transferência</option>
                    <option>Outro</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Status *</label>
                  <select name="status" required>
                    <option value="">Selecione</option>
                    <option>Pago</option>
                    <option>Pendente</option>
                  </select>
                </div>
              </div>

              <div class="form-actions">
                <button class="primary-button" type="submit">
                  Salvar lançamento
                </button>
                <button class="secondary-button" type="button"
                  @click=${() => this.mostrarCadastroPagamento = false}>
                  Cancelar
                </button>
              </div>
            </form>
          ` : ''}

          <div class="notice">
            Os valores apresentados são registros de demonstração.
            Confira os lançamentos antes de utilizar qualquer informação.
          </div>
        </section>

        <section class="panel">
          <h2>Histórico financeiro</h2>

          ${this.pagamentos.length ? html`
            <div class="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Paciente</th>
                    <th>Valor</th>
                    <th>Data</th>
                    <th>Forma de pagamento</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.pagamentos.map((pagamento, index) => html`
                    <tr>
                      <td>${pagamento.paciente}</td>
                      <td>${this.formatarMoeda(pagamento.valor)}</td>
                      <td>${this.formatarData(pagamento.data)}</td>
                      <td>${pagamento.formaPagamento}</td>
                      <td>
                        <span class="status ${this.classeStatus(pagamento.status)}">
                          ${pagamento.status}
                        </span>
                      </td>
                      <td>
                        <button class="danger-button"
                          @click=${() => this.excluirPagamento(index)}>
                          Excluir
                        </button>
                      </td>
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>
          ` : html`
            <div class="empty">Nenhum lançamento financeiro cadastrado.</div>
          `}
        </section>
      </div>
    `
  }

  // VISÃO GERAL
  private renderVisaoGeral() {
    const recebidos = this.pagamentos
      .filter(p => p.status === 'Pago')
      .reduce((total, p) => total + p.valor, 0)

    return html`
      <div class="page-content">
        <section class="cards">
          <article class="card">
            <div class="card-label">Pacientes cadastrados</div>
            <div class="card-value">${this.pacientes.length}</div>
            <div class="card-description">Total de cadastros</div>
          </article>

          <article class="card">
            <div class="card-label">Atendimentos agendados</div>
            <div class="card-value">
              ${this.sessoes.filter(s => s.status === 'Agendada').length}
            </div>
            <div class="card-description">Sessões com status agendada</div>
          </article>

          <article class="card">
            <div class="card-label">Documentos preparados</div>
            <div class="card-value">${this.documentos.length}</div>
            <div class="card-description">Documentos no histórico</div>
          </article>
        </section>

        <section class="cards">
          <article class="card">
            <div class="card-label">Registros clínicos</div>
            <div class="card-value">${this.prontuarios.length}</div>
            <div class="card-description">Prontuários cadastrados</div>
          </article>

          <article class="card">
            <div class="card-label">Pagamentos recebidos</div>
            <div class="card-value" style="font-size: 21px">
              ${this.formatarMoeda(recebidos)}
            </div>
            <div class="card-description">Total dos lançamentos pagos</div>
          </article>

          <article class="card">
            <div class="card-label">Lançamentos financeiros</div>
            <div class="card-value">${this.pagamentos.length}</div>
            <div class="card-description">Registros cadastrados</div>
          </article>
        </section>

        <section class="panel">
          <h2>Bem-vinda ao painel!</h2>
          <p style="color: #887b8b; line-height: 1.7">
            Aqui você pode acompanhar os cadastros, organizar os atendimentos,
            consultar registros, preparar documentos e visualizar os lançamentos
            financeiros.
          </p>
          <div class="notice">
            Este painel é uma demonstração. Os dados ficam somente na memória
            durante o uso e são perdidos ao atualizar ou fechar a página.
            Não utilize informações reais de pacientes.
          </div>
        </section>
      </div>
    `
  }

  private renderPagina() {
    switch (this.paginaAtual) {
      case 'pacientes':
        return this.renderPacientes()
      case 'agenda':
        return this.renderAgenda()
      case 'prontuarios':
        return this.renderProntuarios()
      case 'documentos':
        return this.renderDocumentos()
      case 'financeiro':
        return this.renderFinanceiro()
      default:
        return this.renderVisaoGeral()
    }
  }

private async sair() {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw error
    }

    window.location.replace('/login.html')
  } catch (error) {
    console.error('Erro ao sair:', error)
    window.alert('Não foi possível encerrar a sessão. Tente novamente.')
  }
}

  connectedCallback() {
  super.connectedCallback()
  this.verificarAcesso()
}

private async verificarAcesso() {
  try {
    const { data, error } = await supabase.auth.getSession()

    if (error || !data.session) {
      window.location.replace('/login.html')
      return
    }

       await this.carregarPacientes()
    this.autenticado = true
  } catch (error) {
    console.error('Erro ao verificar acesso:', error)
    window.location.replace('/login.html')
  } finally {
    this.verificandoAcesso = false
  }
}

  render() {
        if (this.verificandoAcesso) {
      return html`<p>Verificando acesso...</p>`
    }

    if (!this.autenticado) {
      return html``
    }
    const pagina = this.menuItems.find(item => item.id === this.paginaAtual)

    return html`
      <div class="layout">
        <aside class="sidebar">
          <div class="brand">
            <img src="/logo-ale.jpeg" alt="Logo">
            <div>
              <strong>Alessandra Larissa</strong>
              <span>Painel da Psicóloga</span>
            </div>
          </div>

          <div class="menu-label">Menu principal</div>

          <nav class="menu">
            ${this.menuItems.map(item => html`
              <button
                class=${this.paginaAtual === item.id ? 'active' : ''}
                @click=${() => this.navegar(item.id)}>
                <span>${item.icone}</span>
                ${item.nome}
              </button>
            `)}
          </nav>
        </aside>

        <main class="main">
          <header class="topbar">
            <div>
              <h1>${pagina?.nome || 'Visão geral'}</h1>
              <p>Bem-vinda ao seu espaço de gestão profissional.</p>
            </div>

            <div class="profile">
  <div class="profile-avatar">AL</div>
  <span>Psicóloga</span>

  <button
    class="btn-sair"
    @click=${this.sair}
  >
    Sair
  </button>
</div>
          </header>

          ${this.renderPagina()}
        </main>
      </div>
    `
  }
}

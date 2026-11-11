
import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('my-element')
export class MyElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      color: #514653;
      font-family: Arial, sans-serif;
      background: #fffcfa;
    }

    * {
      box-sizing: border-box;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 8%;
      background: #ffffff;
      box-shadow: 0 2px 15px #987b9a12;
    }

    .logo-image {
      width: 105px;
      height: 85px;
      object-fit: contain;
      border-radius: 12px;
    }

    nav {
      display: flex;
      gap: 28px;
      align-items: center;
    }

    nav a {
      color: #68576b;
      text-decoration: none;
      font-size: 14px;
      transition: color 0.3s;
    }

    nav a:hover {
      color: #d99eae;
    }

    .login {
      padding: 12px 24px;
      border-radius: 25px;
      background: #987b9a;
      color: white;
      transition: 0.3s;
    }

    .login:hover {
      background: #806483;
      color: white;
    }

    .hero {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      align-items: center;
      gap: 55px;
      padding: 90px 10%;
      background: linear-gradient(120deg, #fffcfa, #f8eff8);
    }

    .tag {
      color: #b18fb5;
      font-size: 13px;
      font-weight: bold;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    h1 {
      max-width: 650px;
      margin: 20px 0;
      font-family: Georgia, serif;
      font-size: clamp(38px, 5vw, 58px);
      font-weight: normal;
      line-height: 1.15;
      color: #806483;
    }

    .description {
      max-width: 490px;
      color: #756b76;
      font-size: 17px;
      line-height: 1.8;
    }

    .cta {
      display: inline-block;
      margin-top: 25px;
      padding: 16px 28px;
      border-radius: 30px;
      background: #987b9a;
      color: white;
      text-decoration: none;
      font-weight: bold;
      transition: 0.3s;
    }

    .cta:hover {
      background: #806483;
      transform: translateY(-2px);
    }

    .image-placeholder {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 390px;
      padding: 30px;
      border-radius: 48% 48% 20px 20px;
      background: #f3eaf5;
      border: 2px solid #eadbea;
      text-align: center;
      color: #987b9a;
      font-family: Georgia, serif;
      font-size: 25px;
    }

    .image-placeholder span {
      display: block;
      color: #d99eae;
      font-size: 38px;
      margin-bottom: 12px;
    }

    .services {
      padding: 75px 10%;
      background: #ffffff;
      text-align: center;
    }

    .services h2 {
      font-family: Georgia, serif;
      font-size: 36px;
      font-weight: normal;
      color: #806483;
    }

    .service-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 22px;
      margin-top: 45px;
    }

    .service {
      padding: 32px;
      border: 1px solid #f0e5f0;
      border-radius: 18px;
      background: #fffcfe;
      text-align: left;
      transition: 0.3s;
    }

    .service:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px #987b9a18;
    }

    .service-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #f8e8ed;
      color: #c989a0;
      font-size: 22px;
    }

    .service h3 {
      color: #987b9a;
      margin-top: 20px;
    }

    .service p {
      color: #756b76;
      line-height: 1.7;
    }

    .about {
      padding: 70px 10%;
      background: #f8eff8;
      text-align: center;
    }

    .about h2 {
      color: #806483;
      font-family: Georgia, serif;
      font-size: 34px;
      font-weight: normal;
    }

    .about p {
      max-width: 700px;
      margin: 20px auto 0;
      color: #756b76;
      line-height: 1.9;
    }

    footer {
      padding: 30px;
      background: #806483;
      color: #ffffff;
      text-align: center;
      font-size: 13px;
    }

    @media (max-width: 750px) {
      header {
        flex-direction: column;
        gap: 15px;
      }

      nav {
        flex-wrap: wrap;
        justify-content: center;
        gap: 15px;
      }

      .hero {
        grid-template-columns: 1fr;
        padding: 55px 7%;
      }

      .image-placeholder {
        min-height: 260px;
      }

      .service-grid {
        grid-template-columns: 1fr;
      }

      .services,
      .about {
        padding: 55px 7%;
      }
    }
  `

  render() {
    return html`
      <header>
        <img
          class="logo-image"
          src="/logo-ale.jpeg"
          alt="Logo de Alessandra Larissa, Psicóloga"
        />

        <nav>
          <a href="#inicio">Início</a>
          <a href="#sobre">Sobre</a>
          <a href="#servicos">Atendimentos</a>
          <a href="contato.html">Contato</a>
         <a class="login" href="/login.html">Entrar</a>
        </nav>
      </header>

      <main>
        <section class="hero" id="inicio">
          <div>
            <span class="tag">Psicologia é acolhimento</span>

            <h1>
              Um espaço para cuidar de você e da sua história.
            </h1>

            <p class="description">
              Um ambiente de escuta, acolhimento e desenvolvimento
              emocional, respeitando sua individualidade e seu tempo.
            </p>

            <a class="cta" href="/login.html">
  Acesse sua área
</a>
          </div>

          <div class="image-placeholder">
            <div>
              <span>♡</span>
              Seu espaço de acolhimento
            </div>
          </div>
        </section>

        <section class="services" id="servicos">
          <span class="tag">Como podemos ajudar</span>
          <h2>Cuidado em cada etapa da sua jornada</h2>

          <div class="service-grid">
            <article class="service">
              <span class="service-icon">♡</span>
              <h3>Escuta e acolhimento</h3>
              <p>
                Um espaço de escuta respeitosa para compartilhar
                sentimentos, experiências e desafios.
              </p>
            </article>

            <article class="service">
              <span class="service-icon">✿</span>
              <h3>Autoconhecimento</h3>
              <p>
                Um processo de reflexão e compreensão
                da própria história.
              </p>
            </article>

            <article class="service">
              <span class="service-icon">🦋</span>
              <h3>Acompanhamento</h3>
              <p>
                Um cuidado psicológico construído com
                respeito à individualidade de cada pessoa.
              </p>
            </article>
          </div>
        </section>

        <section class="about" id="sobre">
          <span class="tag">Sobre a profissional</span>
          <h2>Um cuidado que respeita sua história</h2>

          <p>
            Cada pessoa tem sua própria história, seus sentimentos
            e seu tempo. A proposta é oferecer um espaço de
            acolhimento, escuta e cuidado psicológico.
          </p>
        </section>
      </main>

      <footer>
        © 2026 Alê — Psicóloga. Todos os direitos reservados.
      </footer>
    `
  }
}

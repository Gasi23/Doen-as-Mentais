const users = JSON.parse(localStorage.getItem('users')) || {};
const historicoAvaliacoes = JSON.parse(localStorage.getItem('historicoAvaliacoes')) || {};
const relatorios = JSON.parse(localStorage.getItem('relatorios')) || {};
const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || {};
const terapias = JSON.parse(localStorage.getItem('terapias')) || [];

function adicionarFeedback() {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (!usuarioLogado) {
        alert("Nenhum usuário logado. Faça login para enviar feedback.");
        return;
    }
    const novoFeedback = document.getElementById("novo-feedback").value.trim();
    if (novoFeedback === "") {
        alert("Por favor, insira seu feedback.");
        return;
    }
    feedbacks[usuarioLogado] = feedbacks[usuarioLogado] || [];
    feedbacks[usuarioLogado].push({ data: new Date().toLocaleString(), conteudo: novoFeedback });
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
    alert("Feedback enviado com sucesso!");
    document.getElementById("novo-feedback").value = "";
    adicionarNotificacao("sucesso", "Feedback enviado com sucesso!");
}

function showLoading() {
    const loading = document.getElementById("loading");
    if (loading) loading.style.display = "flex";
}

function hideLoading() {
    const loading = document.getElementById("loading");
    if (loading) loading.style.display = "none";
}

function login() {
    showLoading();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    setTimeout(() => {
        if (users[username] && users[username] === password) {
            localStorage.setItem("usuarioLogado", username);
            alert(`Login realizado! Usuário: ${username}`);
            window.location.href = "profile.html";
        } else {
            alert("Nome de usuário ou senha inválidos!");
        }
        hideLoading();
    }, 1000);
}

function register() {
    showLoading();
    const newUsername = document.getElementById("new-username").value.trim();
    const newPassword = document.getElementById("new-password").value.trim();

    setTimeout(() => {
        if (newUsername && newPassword) {
            if (!users[newUsername]) {
                users[newUsername] = newPassword;
                localStorage.setItem('users', JSON.stringify(users));
                alert(`Usuário registrado com sucesso! Usuário: ${newUsername}`);
                window.location.href = "login.html";
            } else {
                alert("Nome de usuário já existe!");
            }
        } else {
            alert("Por favor, preencha todos os campos!");
        }
        hideLoading();
    }, 1000);
}

function logout() {
    localStorage.removeItem("usuarioLogado");
    alert("Logout realizado com sucesso!");
    window.location.href = "login.html";
}

function adicionarNotificacao(tipo, mensagem) {
    const notificacao = document.createElement("div");
    notificacao.className = `notificacao ${tipo}`;
    notificacao.innerText = mensagem;
    document.body.appendChild(notificacao);
    setTimeout(() => notificacao.remove(), 3000);
}

function adicionarRelatorio() {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (!usuarioLogado) {
        alert("Nenhum usuário logado. Faça login para adicionar relatórios.");
        return;
    }
    const novoRelatorio = document.getElementById("novo-relatorio").value.trim();
    if (novoRelatorio === "") {
        alert("Por favor, insira um relatório.");
        return;
    }
    relatorios[usuarioLogado] = relatorios[usuarioLogado] || [];
    relatorios[usuarioLogado].push({ data: new Date().toLocaleString(), conteudo: novoRelatorio });
    localStorage.setItem("relatorios", JSON.stringify(relatorios));
    exibirRelatorios(relatorios[usuarioLogado]);
    document.getElementById("novo-relatorio").value = "";
    adicionarNotificacao("sucesso", "Relatório adicionado com sucesso!");
}

function exibirHistorico(historico) {
    const historicoElement = document.getElementById("historico");
    if (!historicoElement) return;

    historicoElement.innerHTML = '';
    if (!historico || historico.length === 0) {
        historicoElement.innerHTML = "<p class='placeholder'>Nenhum histórico encontrado.</p>";
        return;
    }

    historico.forEach(avaliacao => {
        const div = document.createElement("div");
        div.className = "historico-item";
        div.innerHTML = `
            <p><strong>Data:</strong> ${avaliacao.data}</p>
            <p><strong>Resultado:</strong> ${avaliacao.resultado}</p>
            <p><strong>Diagnósticos:</strong> ${avaliacao.diagnosticos.join(", ")}</p>
        `;
        historicoElement.appendChild(div);
    });
}

function exibirRelatorios(relatorios) {
    const relatoriosElement = document.getElementById("relatorios");
    if (!relatoriosElement) return;

    relatoriosElement.innerHTML = '';
    if (!relatorios || relatorios.length === 0) {
        relatoriosElement.innerHTML = "<p class='placeholder'>Nenhum relatório disponível.</p>";
        return;
    }

    relatorios.forEach(relatorio => {
        const div = document.createElement("div");
        div.className = "relatorio-item";
        div.innerHTML = `
            <p><strong>Data:</strong> ${relatorio.data}</p>
            <p>${relatorio.conteudo}</p>
        `;
        relatoriosElement.appendChild(div);
    });
}

function registrarTerapia() {
    const nomePaciente = document.getElementById("patient-name").value.trim();
    const detalhesTerapia = document.getElementById("therapy-details").value.trim();
    const dataTerapia = document.getElementById("therapy-date").value;

    if (nomePaciente && detalhesTerapia && dataTerapia) {
        const novaTerapia = { nome: nomePaciente, detalhes: detalhesTerapia, data: dataTerapia };
        terapias.push(novaTerapia);
        localStorage.setItem('terapias', JSON.stringify(terapias));
        alert("Terapia registrada com sucesso!");
        document.getElementById("therapy-form").reset();
    } else {
        alert("Por favor, preencha todos os campos!");
    }
}

function enviarMensagem() {
    const input = document.getElementById("chat-input");
    const message = input.value.trim();
    if (message) {
        const chatContent = document.getElementById("chat-content");
        const userMsg = document.createElement("div");
        userMsg.className = "chat-message user-message";
        userMsg.innerText = message;
        chatContent.appendChild(userMsg);

        const botResponse = document.createElement("div");
        botResponse.className = "chat-message bot-message";
        botResponse.innerText = "Obrigado pela sua mensagem! Vamos analisar e responder em breve.";
        chatContent.appendChild(botResponse);

        input.value = "";
        chatContent.scrollTop = chatContent.scrollHeight;
    }
}

function pesquisarNoSite() {
    const input = document.getElementById("search-input").value.toLowerCase();
    const resultsContainer = document.getElementById("search-results");

    const pages = [
        { title: "Home", url: "index.html", content: "Bem-vindo ao site de Alessandra Larissa, Psicóloga." },
        { title: "Sobre", url: "sobre.html", content: "Informações sobre Alessandra Larissa e os serviços oferecidos." },
        { title: "Contato", url: "contato.html", content: "Formulário para os usuários entrarem em contato." },
        { title: "FAQs", url: "faqs.html", content: "Perguntas frequentes para ajudar os usuários." },
        { title: "Testemunhos", url: "testemunhos.html", content: "Comentários e avaliações de clientes." },
        { title: "Política de Privacidade", url: "politica.html", content: "Informações sobre como os dados dos usuários são protegidos." },
        { title: "Blog", url: "blog.html", content: "Artigos e dicas sobre saúde mental." }
    ];

    const results = pages.filter(page =>
        page.title.toLowerCase().includes(input) || page.content.toLowerCase().includes(input)
    );

    resultsContainer.innerHTML = results.length
        ? results.map(result => `
            <div class="result-item">
                <a href="${result.url}"><strong>${result.title}</strong></a>
                <p>${result.content}</p>
            </div>
        `).join('')
        : "<p>Nenhum resultado encontrado.</p>";
}

// Continue os outros métodos (quiz, newsletter, agendamento, etc.) como no original, se desejar.
// Se quiser, posso montar a continuação completa. Deseja isso?

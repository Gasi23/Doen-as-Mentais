const users = JSON.parse(localStorage.getItem('users')) || {};
const historicoAvaliacoes = JSON.parse(localStorage.getItem('historicoAvaliacoes')) || {};
const relatorios = JSON.parse(localStorage.getItem('relatorios')) || {};
const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || {};

function adicionarFeedback() { const usuarioLogado = localStorage.getItem("usuarioLogado"); if (!usuarioLogado) { alert("Nenhum usuário logado. Faça login para enviar feedback."); return; } const novoFeedback = document.getElementById("novo-feedback").value.trim(); if (novoFeedback === "") { alert("Por favor, insira seu feedback."); return; } feedbacks[usuarioLogado] = feedbacks[usuarioLogado] || []; feedbacks[usuarioLogado].push({ data: new Date().toLocaleString(), conteudo: novoFeedback }); localStorage.setItem("feedbacks", JSON.stringify(feedbacks)); alert("Feedback enviado com sucesso!"); document.getElementById("novo-feedback").value = ""; adicionarNotificacao("sucesso", "Feedback enviado com sucesso!"); }

function showLoading() {
    const loading = document.getElementById("loading");
    if (loading) {
        loading.style.display = "flex";
    }
}

function hideLoading() {
    const loading = document.getElementById("loading");
    if (loading) {
        loading.style.display = "none";
    }
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

document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogado = localStorage.getItem("usuarioLogado");

    if (usuarioLogado) {
        const usuarioNomeElement = document.getElementById("usuario-nome");
        if (usuarioNomeElement) {
            usuarioNomeElement.innerText = usuarioLogado;
        }

        if (historicoAvaliacoes[usuarioLogado]) {
            exibirHistorico(historicoAvaliacoes[usuarioLogado]);
        }
        if (relatorios[usuarioLogado]) {
            exibirRelatorios(relatorios[usuarioLogado]);
        }

        // Exibir gráfico de progresso
        const ctx = document.getElementById('graficoRendimento').getContext('2d');
        const graficoRendimento = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                datasets: [{
                    label: 'Progresso do Rendimento',
                    data: [0, 10, 5, 20, 30, 25, 40, 50, 45, 60, 55, 70],
                    backgroundColor: 'rgba(255, 105, 180, 0.2)',
                    borderColor: '#ff69b4',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        if (!window.location.href.includes("login.html") && !window.location.href.includes("register.html")) {
            window.location.href = "login.html";
        }
    }
});

function exibirHistorico(historico) {
    const historicoElement = document.getElementById("historico");
    if (historicoElement) {
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
}

function exibirRelatorios(relatorios) {
    const relatoriosElement = document.getElementById("relatorios");
    if (relatoriosElement) {
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
}

function adicionarRelatorio() { const usuarioLogado = localStorage.getItem("usuarioLogado"); if (!usuarioLogado) { alert("Nenhum usuário logado. Faça login para adicionar relatórios."); return; } const novoRelatorio = document.getElementById("novo-relatorio").value.trim(); if (novoRelatorio === "") { alert("Por favor, insira um relatório."); return; } relatorios[usuarioLogado] = relatorios[usuarioLogado] || []; relatorios[usuarioLogado].push({ data: new Date().toLocaleString(), conteudo: novoRelatorio }); localStorage.setItem("relatorios", JSON.stringify(relatorios)); exibirRelatorios(relatorios[usuarioLogado]); document.getElementById("novo-relatorio").value = ""; adicionarNotificacao("sucesso", "Relatório adicionado com sucesso!"); }

function adicionarNotificacao(tipo, mensagem) { const notificacao = document.createElement("div"); notificacao.className = `notificacao ${tipo}`; notificacao.innerText = mensagem; document.body.appendChild(notificacao); setTimeout(() => { notificacao.remove(); }, 3000); }

function enviarMensagem() {
    const input = document.getElementById("chat-input");
    const message = input.value.trim();

    if (message) {
        const chatContent = document.getElementById("chat-content");
        const newMessage = document.createElement("div");
        newMessage.className = "chat-message user-message";
        newMessage.innerText = message;

        chatContent.appendChild(newMessage);

        // Adicionar resposta do chatbot
        const botResponse = document.createElement("div");
        botResponse.className = "chat-message bot-message";
        botResponse.innerText = "Obrigado pela sua mensagem! Vamos analisar e responder em breve.";
        
        chatContent.appendChild(botResponse);

        input.value = "";
        chatContent.scrollTop = chatContent.scrollHeight;
    }
}

function logout() {
    localStorage.removeItem("usuarioLogado");
    alert("Logout realizado com sucesso!");
    window.location.href = "login.html";
}

function pesquisarNoSite() {
    const input = document.getElementById("search-input");
    const filter = input.value.toLowerCase();
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

    let results = pages.filter(page => {
        return page.title.toLowerCase().includes(filter) || page.content.toLowerCase().includes(filter);
    });

    resultsContainer.innerHTML = "";
    if (results.length > 0) {
        results.forEach(result => {
            const div = document.createElement("div");
            div.className = "result-item";
            div.innerHTML = `<a href="${result.url}"><strong>${result.title}</strong></a><p>${result.content}</p>`;
            resultsContainer.appendChild(div);
        });
    } else {
        resultsContainer.innerHTML = "<p>Nenhum resultado encontrado.</p>";
    }
}

function assinarNewsletter() {
    const email = document.getElementById("newsletter-email").value.trim();

    if (email) {
        alert("Obrigado por assinar nossa newsletter!");
        document.getElementById("newsletter-form").reset();
    } else {
        alert("Por favor, insira um email válido.");
    }
}

function validarFormulario() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (nome === "" || email === "" || mensagem === "") {
        alert("Por favor, preencha todos os campos!");
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, insira um email válido.");
        return false;
    }

    alert("Mensagem enviada com sucesso!");
    document.getElementById("contact-form").reset();
    return true;
}

function initMap() {
    const location = { lat: -23.550520, lng: -46.633308 }; // Exemplo de localização (São Paulo)
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: location
    });
    const marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

// Certifique-se de adicionar a chave da API do Google Maps no script a seguir
<script async defer src="https://maps.googleapis.com/maps/api/js?key=SUA_CHAVE_API&callback=initMap"></script>

function agendarConsulta() {
    const name = document.getElementById("appointment-name").value.trim();
    const email = document.getElementById("appointment-email").value.trim();
    const date = document.getElementById("appointment-date").value;
    const time = document.getElementById("appointment-time").value;

    if (name && email && date && time) {
        alert(`Consulta agendada com sucesso para ${date} às ${time}!`);
        document.getElementById("appointment-form").reset();
    } else {
        alert("Por favor, preencha todos os campos!");
    }
}

function toggleFaq(element) {
    const answer = element.nextElementSibling;
    answer.style.display = (answer.style.display === "block") ? "none" : "block";
}

function enviarFeedback() {
    const name = document.getElementById("feedback-name").value.trim();
    const message = document.getElementById("feedback-message").value.trim();

    if (name && message) {
        const feedbackDisplay = document.getElementById("feedback-display");
        const feedbackItem = document.createElement("div");
        feedbackItem.className = "feedback-item";
        feedbackItem.innerHTML = `<strong>${name}:</strong> <p>${message}</p>`;
        
        feedbackDisplay.appendChild(feedbackItem);
        document.getElementById("feedback-form").reset();
        alert("Feedback enviado com sucesso!");
    } else {
        alert("Por favor, preencha todos os campos!");
    }
}

const posts = [
    {
        title: "Como Gerenciar a Ansiedade",
        excerpt: "A ansiedade pode ser desafiadora, mas há várias estratégias que podem ajudar a gerenciá-la...",
        url: "artigo1.html"
    },
    {
        title: "Importância da Saúde Mental",
        excerpt: "A saúde mental é tão importante quanto a saúde física. Aqui estão algumas maneiras de cuidar da sua...",
        url: "artigo2.html"
    },
    // Adicione mais artigos conforme necessário
];

let currentPostIndex = 0;
const postsPerPage = 2;

function loadMorePosts() {
    const blogPostsContainer = document.getElementById("blog-posts");
    
    for (let i = 0; i < postsPerPage; i++) {
        if (currentPostIndex < posts.length) {
            const post = posts[currentPostIndex];
            const postElement = document.createElement("article");
            postElement.innerHTML = `<h3>${post.title}</h3><p>${post.excerpt}</p><a href="${post.url}">Leia mais</a>`;
            blogPostsContainer.appendChild(postElement);
            currentPostIndex++;
        } else {
            document.getElementById("load-more").style.display = "none";
            break;
        }
    }
}

// Carregar os primeiros posts ao carregar a página
document.addEventListener("DOMContentLoaded", loadMorePosts);

function calcularResultado() {
    const respostas = document.querySelectorAll('#quiz-form input[type="radio"]:checked');
    let pontuacao = 0;

    respostas.forEach((resposta) => {
        if (resposta.value === 'Sim') {
            pontuacao += 1;
        }
    });

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `<p>Você respondeu "Sim" a ${pontuacao} questões.</p>`;
}

const terapias = JSON.parse(localStorage.getItem('terapias')) || [];

function registrarTerapia() {
    const nomePaciente = document.getElementById("patient-name").value.trim();
    const detalhesTerapia = document.getElementById("therapy-details").value.trim();
    const dataTerapia = document.getElementById("therapy-date").value;

    if (nomePaciente && detalhesTerapia && dataTerapia) {
        const novaTerapia = {
            nome: nomePaciente,
            detalhes: detalhesTerapia,
            data: dataTerapia
        };

        terapias.push(novaTerapia);
        localStorage.setItem('terapias', JSON.stringify(terapias));
        alert("Terapia registrada com sucesso!");
        document.getElementById("therapy-form").reset();
    } else {
        alert("Por favor, preencha todos os campos!");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const therapyList = document.getElementById("therapy-list");

    if (terapias.length > 0) {
        terapias.forEach(terapia => {
            const therapyLog = document.createElement("div");
            therapyLog.className = "therapy-log";
            therapyLog.innerHTML = `<h4>${terapia.nome}</h4><p>${terapia.detalhes}</p><p><strong>Data:</strong> ${terapia.data}</p>`;
            therapyList.appendChild(therapyLog);
        });
    } else {
        therapyList.innerHTML = "<p>Nenhuma terapia registrada.</p>";
    }
});

function agendarConsulta() {
    const name = document.getElementById("appointment-name").value.trim();
    const email = document.getElementById("appointment-email").value.trim();
    const date = document.getElementById("appointment-date").value;
    const time = document.getElementById("appointment-time").value;

    if (name && email && date && time) {
        alert(`Consulta agendada com sucesso para ${date} às ${time}!`);
        document.getElementById("appointment-form").reset();
    } else {
        alert("Por favor, preencha todos os campos!");
    }
}

const questions = [
    { question: "Você se sente nervoso ou ansioso frequentemente?", options: ["Sim", "Não"], correct: "Sim" },
    { question: "Você tem dificuldade para dormir devido à ansiedade?", options: ["Sim", "Não"], correct: "Sim" },
    // Adicione mais perguntas conforme necessário
];

let currentQuestionIndex = 0;

function startQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = generateQuestionHTML(questions[currentQuestionIndex]);
}

function generateQuestionHTML(question) {
    const optionsHTML = question.options.map(option => `<button onclick="checkAnswer('${option}')">${option}</button>`).join('');
    return `<div><h4>${question.question}</h4>${optionsHTML}</div>`;
}

function checkAnswer(selectedOption) {
    const question = questions[currentQuestionIndex];
    const quizContainer = document.getElementById("quiz-container");

    if (selectedOption === question.correct) {
        alert("Resposta correta!");
    } else {
        alert("Resposta incorreta.");
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        quizContainer.innerHTML = generateQuestionHTML(questions[currentQuestionIndex]);
    } else {
        quizContainer.innerHTML = "<h4>Você concluiu o teste!</h4>";
    }
}

document.getElementById('wellbeing-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const sleep = parseInt(document.getElementById('sleep-hours').value);
    const exercise = parseInt(document.getElementById('exercise-frequency').value);
    const stress = parseInt(document.getElementById('stress-level').value);
    const resultDiv = document.getElementById('wellbeing-result');
    
    let score = (sleep * 1.5) + (exercise * 2) - (stress * 1.2);
    score = Math.max(0, Math.min(100, score));

    resultDiv.innerHTML = `Seu nível de bem-estar é ${score.toFixed(1)} de 100.`;
});

// Carregar o Google Charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Data', 'Progresso'],
        ['01/12/2024',  80],
        ['08/12/2024',  85],
        ['15/12/2024',  90],
        ['22/12/2024',  95],
        // Adicione mais pontos de dados conforme necessário
    ]);

    var options = {
        title: 'Progresso de Rendimento',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('progress-chart'));
    chart.draw(data, options);
}

// script.js

// Adicione suas funcionalidades JavaScript aqui

document.addEventListener('DOMContentLoaded', function() {
    console.log('Documento carregado e pronto!');
});

// server.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
// O Vercel define a porta automaticamente, mas 3000 é usado localmente
const port = process.env.PORT || 3000; 

// =======================================================
// DADOS SIMULADOS (Substitui o Banco de Dados)
// =======================================================
const USUARIO_VALIDO = 'admin'; 
const SENHA_VALIDA = '12345';   

let listaDeAlunos = [
    { id: 1, nome: 'João Victor Silva', idade: 28, modalidade: 'Musculação' },
    { id: 2, nome: 'Mariana Lopes Souza', idade: 35, modalidade: 'Cross Training' },
    { id: 3, nome: 'Pedro Henrique Santos', idade: 22, modalidade: 'Natação' },
    { id: 4, nome: 'Ana Clara Lima', idade: 31, modalidade: 'Yoga e Pilates' },
];
let nextId = listaDeAlunos.length + 1;
// =======================================================

// Configurações do Express
// Permite que o Express leia dados de formulários
app.use(bodyParser.urlencoded({ extended: true })); 

// CONFIGURAÇÃO CRÍTICA PARA ARQUIVOS ESTÁTICOS (CSS, JS, Imagens)
// Utiliza o método mais robusto para Vercel: aponta para a raiz do projeto (./)
app.use(express.static('./')); 

// =======================================================
// ROTAS DO BACKEND
// =======================================================

// Rota 1: LOGIN (POST) - Valida as credenciais
app.post('/login', (req, res) => {
    const { usuario, senha } = req.body;

    if (usuario === USUARIO_VALIDO && senha === SENHA_VALIDA) {
        // Sucesso: Redireciona para a página de gestão
        res.redirect('/cadastro_alunos'); 
    } else {
        // Falha: Envia uma mensagem de erro
        res.send(`
            <h2>❌ Acesso Negado</h2>
            <p>Usuário ou senha inválidos. Tente novamente.</p>
            <a href="/login">Voltar para o Login</a>
        `);
    }
});

// Rota 2: API para Ler a Lista de Alunos (GET - READ do CRUD)
app.get('/api/alunos', (req, res) => {
    // Retorna a lista de alunos em formato JSON para o front-end
    res.json(listaDeAlunos); 
});

// Rota 3: API para Criar Novo Aluno (POST - CREATE do CRUD)
app.post('/api/alunos', (req, res) => {
    const { nome, idade, modalidade } = req.body;

    const novoAluno = {
        id: nextId++,
        nome: nome,
        idade: parseInt(idade), 
        modalidade: modalidade
    };

    listaDeAlunos.push(novoAluno);

    // Redireciona para a página de visualização atualizada
    res.redirect('/cadastro_alunos'); 
});


// ROTAS PARA SERVIR PÁGINAS HTML
// (Usamos sendFile para garantir que o Express carregue o HTML)

// Rota para a Página Inicial (URL: / ou /index)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para a Página de Login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Rota para a Página de Gestão (Cadastro de Alunos)
app.get('/cadastro_alunos', (req, res) => {
    res.sendFile(path.join(__dirname, 'cadastro_alunos.html'));
});

// Rota para Modalidades
app.get('/modalidades', (req, res) => {
    res.sendFile(path.join(__dirname, 'modalidades.html'));
});


// Inicia o Servidor
app.listen(port, () => {
    console.log(`Servidor "Força Total" rodando em http://localhost:${port}`);
});
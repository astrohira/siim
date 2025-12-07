// server.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// =======================================================
// DADOS SIMULADOS (Substitui o Banco de Dados)
// =======================================================
// Seu usuário e senha válidos para teste
const USUARIO_VALIDO = 'admin'; 
const SENHA_VALIDA = '12345';   

// Array de Alunos (para o CRUD)
let listaDeAlunos = [
    { id: 1, nome: 'João Victor Silva', idade: 28, modalidade: 'Musculação' },
    { id: 2, nome: 'Mariana Lopes Souza', idade: 35, modalidade: 'Cross Training' },
    { id: 3, nome: 'Pedro Henrique Santos', idade: 22, modalidade: 'Natação' },
    { id: 4, nome: 'Ana Clara Lima', idade: 31, modalidade: 'Yoga e Pilates' },
];
let nextId = listaDeAlunos.length + 1;
// =======================================================

// Configurações do Express
// 1. Permite que o Express leia dados de formulários HTML (chaves: usuario, senha, nome, etc.)
app.use(bodyParser.urlencoded({ extended: true })); 
// 2. Permite servir arquivos estáticos (HTML, CSS)
app.use(express.static(path.join(__dirname, ''))); 

// =======================================================
// ROTAS DO BACKEND
// =======================================================

// Rota 1: LOGIN (POST) - A FUNÇÃO QUE VOCÊ PRECISA!
app.post('/login', (req, res) => {
    // 1. O servidor recebe os dados dos campos 'name' do formulário
    const { usuario, senha } = req.body;

    console.log(`Tentativa de Login: Usuário "${usuario}", Senha "${senha}"`);

    // 2. Validação: compara o que foi digitado com os dados simulados
    if (usuario === USUARIO_VALIDO && senha === SENHA_VALIDA) {
        // Sucesso: 3. Redireciona para a página de gestão
        console.log('Login SUCESSO.');
        res.redirect('/cadastro_alunos.html');
    } else {
        // Falha: 4. Envia uma mensagem de erro simples
        console.log('Login FALHOU.');
        res.send(`
            <h2>❌ Acesso Negado</h2>
            <p>Usuário ou senha inválidos. Tente novamente.</p>
            <a href="/login.html">Voltar para o Login</a>
        `);
    }
});

// Rota 2: API para Ler a Lista de Alunos (GET)
app.get('/api/alunos', (req, res) => {
    res.json(listaDeAlunos); 
});

// Rota 3: API para Criar Novo Aluno (POST)
app.post('/api/alunos', (req, res) => {
    const { nome, idade, modalidade } = req.body;

    const novoAluno = {
        id: nextId++,
        nome: nome,
        idade: parseInt(idade), 
        modalidade: modalidade
    };

    listaDeAlunos.push(novoAluno);
    console.log('Novo aluno cadastrado:', novoAluno);

    res.redirect('/cadastro_alunos.html'); 
});


// Rota para a Página Inicial (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para a Página de Login
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Inicia o Servidor
app.listen(port, () => {
    console.log(`Servidor "Força Total" rodando em http://localhost:${port}`);
    console.log('Acesse a página de login: http://localhost:3000/login.html');
});
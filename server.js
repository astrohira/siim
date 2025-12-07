// server.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; 

// =======================================================
// DADOS SIMULADOS
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
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public'))); 

// =======================================================
// ROTAS DO BACKEND
// =======================================================

// Rota 1: LOGIN (POST)
app.post('/login', (req, res) => {
    const { usuario, senha } = req.body;

    if (usuario === USUARIO_VALIDO && senha === SENHA_VALIDA) {
        // Sucesso: Redireciona para a página de gestão (Rota '/cadastro_alunos')
        res.redirect('/cadastro_alunos'); 
    } else {
        // Falha
        res.send(`
            <h2>❌ Acesso Negado</h2>
            <p>Usuário ou senha inválidos. Tente novamente.</p>
            <a href="/login">Voltar para o Login</a>
        `);
    }
});

// Rota 2: API para Ler a Lista de Alunos (GET - READ)
app.get('/api/alunos', (req, res) => {
    res.json(listaDeAlunos); 
});

// Rota 3: API para Criar Novo Aluno (POST - CREATE)
app.post('/api/alunos', (req, res) => {
    const { nome, idade, modalidade } = req.body;

    const novoAluno = {
        id: nextId++,
        nome: nome,
        idade: parseInt(idade), 
        modalidade: modalidade
    };

    listaDeAlunos.push(novoAluno);

    res.redirect('/cadastro_alunos'); 
});


// ROTAS PARA SERVIR PÁGINAS HTML (APONTANDO PARA A PASTA 'public')

// Rota para a Página Inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para a Página de Login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Rota para a Página de Gestão (Cadastro de Alunos)
app.get('/cadastro_alunos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastro_alunos.html'));
});

// Rota para Modalidades
app.get('/modalidades', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'modalidades.html'));
});


// Inicia o Servidor
app.listen(port, () => {
    console.log(`Servidor "Força Total" rodando em http://localhost:${port}`);
});
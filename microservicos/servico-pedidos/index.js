const express = require('express');
const app = express();
app.use(express.json());

// Endpoints de Saúde para o Kubernetes (Health Checks)
app.get('/health/live', (req, res) => res.status(200).send('OK'));
app.get('/health/ready', (req, res) => res.status(200).send('READY'));

// Rota raiz para testes simples no navegador (GET /)
app.get('/', (req, res) => {
  res.json({
    servico: "Pedidos",
    status: "Serviço ativo e operacional",
    timestamp: new Date()
  });
});

// Rota principal de Pedidos
app.get('/pedidos', (req, res) => {
  res.json({
    servico: "Pedidos",
    acao: "Consulta e criação de pedidos",
    status: "OK"
  });
});

// Endpoint de Métricas simulado para o Prometheus
app.get('/metrics', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('# HELP http_requests_total Total de requisicoes HTTP\n# TYPE http_requests_total counter\nhttp_requests_total{method="GET",handler="/pedidos",status="200"} 42\n');
});

app.listen(8080, () => console.log('Serviço de Pedidos rodando na porta 8080'));
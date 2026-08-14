const express = require('express');
const app = express();
app.use(express.json());

// Endpoints de Saúde para o Kubernetes (Health Checks)
app.get('/health/live', (req, res) => res.status(200).send('OK'));
app.get('/health/ready', (req, res) => res.status(200).send('READY'));

// Rota raiz para testes no navegador (GET /)
app.get('/', (req, res) => {
  res.json({
    servico: "Estoque",
    status: "Serviço ativo e operacional",
    timestamp: new Date()
  });
});

// Rota de consulta de estoque no navegador (GET /estoque)
app.get('/estoque', (req, res) => {
  res.json({
    servico: "Estoque",
    status: "Itens disponíveis em estoque"
  });
});

// Rota de reserva/baixa de itens (POST /estoque/reserva)
app.post('/estoque/reserva', (req, res) => {
  res.json({
    servico: "Estoque",
    status: "Sucesso",
    mensagem: "Item reservado com sucesso no banco de dados!"
  });
});

// Endpoint de Métricas simulado para o Prometheus
app.get('/metrics', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('# HELP http_requests_total Total de requisicoes HTTP\n# TYPE http_requests_total counter\nhttp_requests_total{method="POST",handler="/estoque/reserva",status="200"} 30\n');
});

app.listen(8080, () => console.log('Serviço de Estoque rodando na porta 8080'));
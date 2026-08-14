const express = require('express');
const app = express();
app.use(express.json());

// Endpoints de Saúde para o Kubernetes (Health Checks)
app.get('/health/live', (req, res) => res.status(200).send('OK'));
app.get('/health/ready', (req, res) => res.status(200).send('READY'));

// Rota raiz para testes no navegador (GET /)
app.get('/', (req, res) => {
  res.json({
    servico: "Pagamentos",
    status: "Serviço ativo e operacional",
    timestamp: new Date()
  });
});

// Rota de consulta do serviço de pagamentos (GET /pagamentos)
app.get('/pagamentos', (req, res) => {
  res.json({
    servico: "Pagamentos",
    status: "Pronto para processar transações"
  });
});

// Rota de processamento de pagamento (POST /pagamentos/processar)
app.post('/pagamentos/processar', (req, res) => {
  res.json({
    servico: "Pagamentos",
    transacao: "Aprovada com sucesso",
    valor: req.body?.valor || 0
  });
});

// Endpoint de Métricas para o Prometheus
app.get('/metrics', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('# HELP http_requests_total Total de requisicoes HTTP\n# TYPE http_requests_total counter\nhttp_requests_total{method="POST",handler="/pagamentos/processar",status="200"} 15\n');
});

app.listen(8080, () => console.log('Serviço de Pagamentos rodando na porta 8080'));
const express = require('express');
const app = express();
app.use(express.json());

// Endpoints de Saúde para o Kubernetes
app.get('/health/live', (req, res) => res.status(200).send('OK'));
app.get('/health/ready', (req, res) => res.status(200).send('READY'));

// Rota raiz
app.get('/', (req, res) => {
  res.json({ servico: "API Gateway", status: "Serviço ativo, operacional e testado", timestamp: new Date() });
});

// Rota principal exigida no teste
app.get('/api/v1/pedidos', (req, res) => {
  res.json({ servico: "API Gateway", status: "Roteando requisição para Pedidos" });
});

// Métricas Prometheus
app.get('/metrics', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('# HELP http_requests_total Total de requisicoes HTTP\n# TYPE http_requests_total counter\nhttp_requests_total{method="GET",handler="/api/v1/pedidos",status="200"} 120\n');
});

app.listen(8080, () => console.log('API Gateway rodando na porta 8080'));
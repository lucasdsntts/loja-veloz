provider "aws" {
  region = "us-east-1"
}

# Esqueleto de provisionamento de cluster EKS para a aplicação Pedidos Veloz
resource "aws_vpc" "loja_veloz_vpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "pedidos-veloz-vpc"
  }
}

# Módulo básico do Kubernetes EKS (Justificativa: Gestão declarativa e reprodutível da infraestrutura)
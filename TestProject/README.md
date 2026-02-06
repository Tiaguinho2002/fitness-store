# Testes Básicos

Este é um projeto de testes super simples para você aprender xUnit e FluentAssertions.

## Como rodar:

```bash
cd TestProject
dotnet test
```

## O que está sendo testado:

`BasicUserTest.cs` - Um teste unitário simples que:

1. Cria um objeto `User`
2. Valida que a propriedade `Email` está correta
3. Usa `FluentAssertions` para assert com sintaxe `.Should()`

## Estrutura:

- **Arrange** - Prepara os dados de teste
- **Act** - Executa a ação a ser testada
- **Assert** - Valida o resultado

## Para adicionar mais testes:

1. Crie um novo arquivo `.cs` em `TestProject/`
2. Adicione a classe com métodos anotados com `[Fact]`
3. Rode `dotnet test`


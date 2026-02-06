# Fitness Store

<!-- Shields Exemplo, existem N diferentes shield em https://shields.io/ -->
![GitHub last commit](https://img.shields.io/github/last-commit/seu-usuario/seu-repositorio)
![GitHub language count](https://img.shields.io/github/languages/count/seu-usuario/seu-repositorio)
![Github repo size](https://img.shields.io/github/repo-size/seu-usuario/seu-repositorio)
![Github stars](https://img.shields.io/github/stars/seu-usuario/seu-repositorio?style=social)

![Capa do Projeto](https://github.com/user-attachments/assets/0eae2176-134d-4907-8f34-89cba5d73254)

> Projeto de E-commerce de Suplementos.

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter as seguintes dependências instaladas:

- Node.js: Essencial para o front-end React. Se não tiver, você pode baixar o NodeJs aqui.

    https://nodejs.org/en/download

- .NET SDK: Necessário para o backend ASP.NET Core. Baixe o SDK aqui 

    https://dotnet.microsoft.com/pt-br/download

## Como executar o projeto

Siga as etapas abaixo para executar o projeto em sua máquina local:

Execute os seguintes comandos a partir da pasta raiz do projeto:

<!-- Aqui é tudo exemplo, só trocar -->

### Clone este repositório

```bash
git clone https://github.com/Tiaguinho2002/Fitness-Store.git](https://github.com/Tiaguinho2002/Fitness-Store.git)
```

Este link pode ser encontrado no botão verde acima `Code`.

### Instale as dependências
Navegue até a pasta de cada parte do projeto e instale as dependências necessárias.

### Backend
```bash
cd BACKEND
dotnet restore
```

### Frontend
```bash
cd FRONTEND
npm install
```

### Defina as variáveis de ambiente

No backend, configure o seu Access Token do Mercado Pago e a URL base no arquivo appsettings.json ou appsettings.Development.json.

### Execute o Projeto

```bash
npm run dev
```

## Estrutura de Pastas

A estrutura de pastas do projeto é organizada da seguinte maneira:

```text
/
|-- BACKEND/
|   |-- Controllers/
|   |-- Models/
|   |-- appsettings.json
|   |-- ...
|-- FRONTEND/
|   |-- src/
|   |-- public/
|   |-- node_modules/
|   |-- ...
|-- .gitignore
|-- package-lock.json
|-- package.json
|-- README.md
```

<!-- Outra forma de descrever é em texto corrido -->

### Disposição e estilos

* `FRONTEND/`: Contém a aplicação React, responsável pela interface do usuário, lógica de navegação e exibição dos produtos.

* `BACKEND/`: Contém a API em ASP.NET Core que lida com a comunicação com a API do Mercado Pago e a lógica de pagamento.

## Como contribuir

Se você deseja contribuir para este projeto, siga as etapas abaixo:

1. Faça um fork deste repositório.
2. Crie um branch: `git checkout -b <nome_branch>`.
3. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
4. Envie para o branch original: `git push origin <nome_do_projeto> / <local>`
5. Criar a solicitação de pull.

Como alternativa, consulte a documentação do GitHub sobre [como criar uma solicitação de pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## Membros do Projeto (Opcional)

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/tiaguinho2002">
        <img src="https://github.com/tiaguinho2002.png" width="100px">
        <br>
        <sub>
          <b>Tiago</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## Licença

Este projeto está sob licença. Consulte [LICENSE](LICENSE.md) para obter mais informações.

## Voltar ao topo

[⬆ Voltar ao topo](# Fitness Store)



# Atende Fácil

## Objetivo do Projeto

O "Atende Fácil" é uma aplicação desktop (baseada em Electron) desenvolvida com AngularJS e Cordova, projetada para ajudar usuários a gerenciar e acessar rapidamente frases prontas. É ideal para quem precisa responder frequentemente com mensagens padronizadas, como em atendimento ao cliente, suporte técnico ou qualquer situação que exija agilidade na comunicação com textos pré-definidos.

## Funcionalidades

-   **Gerenciamento de Categorias:** Organize suas frases em categorias personalizadas para fácil acesso.
    -   Adicionar novas categorias.
    -   Visualizar categorias existentes.
    -   (Implementação futura: editar e excluir categorias)
-   **Gerenciamento de Frases:** Dentro de cada categoria, adicione e gerencie suas frases.
    -   Adicionar novas frases.
    -   Editar frases existentes.
    -   Excluir frases.
    -   Copiar frases para a área de transferência com um clique.
-   **Configurações:**
    -   Opção para apagar todos os dados do aplicativo.
    -   (Em desenvolvimento: configurações de tema)
    -   Informações sobre o aplicativo.
-   **Importação e Exportação de Dados:** Faça backup dos seus dados (categorias e frases) em um arquivo JSON e importe-os para outro dispositivo ou após uma reinstalação.
-   **Navegação Intuitiva:** Navegação entre as telas de Categorias e Configurações via barra superior e menu lateral (sidebar).
-   **Armazenamento Local:** Todos os dados são armazenados localmente no dispositivo do usuário.

## Tecnologias Utilizadas

-   **Frontend:**
    -   AngularJS 1.8.2
    -   Bootstrap 5.x (CSS e JS)
-   **Plataforma:**
    -   Cordova 12.x (para empacotar como aplicativo desktop/Electron)
    -   Electron (como plataforma alvo do Cordova)
-   **Armazenamento:**
    -   `localStorage` do navegador (através do serviço `localDatabase`)

## Estrutura do Projeto

-   `www/`: Contém todo o código frontend (HTML, CSS, JS) e assets (imagens, fontes).
-   `platforms/`: Contém o código específico das plataformas (neste caso, `electron`). Gerado pelo Cordova.
-   `typings/`: Arquivos de tipagem (se aplicável).
-   `res/`: Recursos da aplicação.
-   `config.xml`: Arquivo de configuração principal do Cordova.
-   `package.json`: Arquivo de configuração do Node.js/npm e Electron.

## Como Configurar e Executar

Para clonar e executar este projeto, você precisará ter o Node.js e o Cordova instalados em sua máquina.

```bash
# Clone este repositório
git clone [URL_DO_SEU_REPOSITORIO]
# Navegue até o diretório do projeto
cd atendeFacil
# Instale as dependências do Node.js
npm install
# Adicione a plataforma Electron ao Cordova
cordova platform add electron
```

### Executar o Aplicativo (Modo Desenvolvimento)

Use o comando `run` do Cordova para preparar e executar o aplicativo Electron:

```bash
cordova run electron
```

### Construir o Aplicativo (Produção)

Use o comando `build` do Cordova para gerar os executáveis para distribuição. Por padrão, ele constrói para o seu sistema operacional atual.

```bash
cordova build electron
```

Os arquivos de build serão encontrados na pasta `platforms/electron/build`.
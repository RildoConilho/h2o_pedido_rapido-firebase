<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>H2O Pedido Rápido</title>

    <meta name="description" content="Peça sua água da Distribuidora H2O de forma rápida com o app H2O Pedido Rápido. Adicione à sua tela inicial!">

    <link rel="manifest" href="manifest.json">

    <link rel="apple-touch-icon" href="icones/apple-icon-180.png">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="H2O Água">


    <meta property="og:title" content="Distribuidora H2O: Peça sua água pelo app!">
    <meta property="og:description" content="A forma mais prática de pedir água da Distribuidora H2O! Baixe nosso app direto na sua tela inicial e faça seu pedido com poucos cliques.">
    <meta property="og:image" content="URL_DA_SUA_IMAGEM_DE_COMPARTILHAMENTO_AQUI">
    <meta property="og:url" content="https://h2opediraguafacil.netlify.app/">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="H2O Pedido Rápido">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Distribuidora H2O: Peça sua água pelo app!">
    <meta name="twitter:description" content="A forma mais prática de pedir água da Distribuidora H2O! Baixe nosso app direto na sua tela inicial e faça seu pedido com poucos cliques.">
    <meta name="twitter:image" content="URL_DA_SUA_IMAGEM_DE_COMPARTILHAMENTO_AQUI">
    <meta name="theme-color" content="#00BFFF">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container-principal">
        <p id="saudacaoCliente"></p>

        <div id="dicaInstalarIOS" style="display: none;">
            <button id="fecharDicaIOS" title="Fechar dica">&times;</button>
            <p>
                <strong>Dica para iPhone/iPad:</strong> Sabia que pode adicionar o H2O Pedido Rápido à sua Tela de Início para acesso super fácil?
                <a href="#instrucoes-ios-detalhadas" id="linkInstrucoesIOS">Clique aqui para ver como!</a>
            </p>
        </div>

        <h1>Distribuidora de Água H2O</h1>
        <p class="slogan">Peça a sua água de forma rápida!</p>

        <button id="btnMostrarOpcoesQuantidade" class="btn-pedir-agua" style="margin-top: 10px; background-color: var(--cor-primaria);">
            Selecionar Quantidade
        </button>

        <div id="opcoesQuantidade" style="display: none;">
            <h2>Selecione a Quantidade</h2>
            <div class="opcoes-lista">
                <label>
                    <input type="radio" name="quantidadeAgua" value="1 galão de 20L"> 1 Galão de 20L
                </label><br>
                <label>
                    <input type="radio" name="quantidadeAgua" value="2 galões de 20L"> 2 Galões de 20L
                </label><br>
                <label>
                    <input type="radio" name="quantidadeAgua" value="outra quantidade: "> Outra quantidade: <input type="text" id="outraQuantidade" placeholder="Ex: 3 galões">
                </label>
            </div>
            
            <label for="nomeCliente" class="input-label">Seu Nome:</label>
            <input type="text" id="nomeCliente" placeholder="Seu nome completo" required class="text-input"><br>
            
            <label for="telefoneCliente" class="input-label">Seu Telefone (WhatsApp):</label>
            <input type="tel" id="telefoneCliente" placeholder="(XX) XXXXX-XXXX" required class="text-input">

            <label for="observacoes" id="observacoes-label">Observações (opcional):</label>
            <textarea id="observacoes" placeholder="Ex: Deixar na portaria, Pagamento no PIX, etc."></textarea>
            
            <div id="errorMessage" class="error-message" style="display: none;"></div>

            <button id="btnConfirmarPedido" class="btn-pedir-agua" style="margin-top: 20px; background-color: var(--cor-botao-confirmar);">
                <i class="fas fa-check-circle"></i> Confirmar Pedido
            </button>
            <button id="btnFecharOpcoesQuantidade" class="btn-instalar-pwa" style="background-color: var(--cor-texto-secundario); margin-top:10px;">
                Fechar
            </button>
        </div>

        <div id="feedbackMessage">
            <p id="feedbackText"></p> 
            <button id="btnNovoPedido" class="btn-instalar-pwa" style="background-color: var(--cor-primaria); margin-top:10px; display: none;">
                Fazer Outro Pedido
            </button>
        </div>

        <button id="btnInstalarApp" class="btn-instalar-pwa" style="display: none;">
            Instalar Aplicativo
        </button>

        <div id="instrucoes-ios-detalhadas">
            <h2>Como Adicionar o "H2O Pedido Rápido" à Tela de Início (iPhone/iPad)</h2>
            <p>Siga estes passos para ter acesso rápido ao nosso app:</p>
            <ol>
                <li>Abra o <strong>Safari</strong>.</li>
                <li>Acesse este site.</li>
                <li>Toque no ícone de <strong>Compartilhamento</strong> (o quadrado com a seta para cima).</li>
                <li>Selecione <strong>"Adicionar à Tela de Início"</strong>.</li>
                <li>Confirme em <strong>"Adicionar"</strong>.</li>
            </ol>
            <button id="fecharInstrucoesIOSDetalhadas" class="btn-instalar-pwa" style="background-color: var(--cor-texto-secundario); margin-top:15px;">Fechar Instruções</button>
        </div>

        <div class="info-contato">
            <p><strong>Contato H2O:</strong></p>
            <p>Telefone: <a href="tel:+5517996512353">(17) 99651-2353</a></p>
        </div>
    </div>

    <a href="sair.html" id="fabSair" title="Voltar ao Início"><i class="fas fa-home"></i></a>

    <script src="https://www.gstatic.com/firebasejs/9.6.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore-compat.js"></script>
    <script src="firebase-config.js"></script>
    <script src="script.js"></script>
</body>
</html>
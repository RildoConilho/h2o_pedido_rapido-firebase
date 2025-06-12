// --- Início: Script para registrar o Service Worker (essencial para PWA) ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('ServiceWorker: Registrado com sucesso! Escopo:', registration.scope);
            })
            .catch(error => {
                console.log('ServiceWorker: Falha no registro:', error);
            });
    });
}
// --- Fim: Script para registrar o Service Worker ---

// --- Início: SCRIPT PARA SAUDAÇÃO DINÂMICA ---
function exibirSaudacaoDinamica() {
    const elementoSaudacao = document.getElementById('saudacaoCliente');
    if (elementoSaudacao) {
        const agora = new Date();
        const horaAtual = agora.getHours();
        let textoSaudacao = '';
        if (horaAtual >= 5 && horaAtual < 12) { textoSaudacao = 'Bom dia!'; }
        else if (horaAtual >= 12 && horaAtual < 18) { textoSaudacao = 'Boa tarde!'; }
        else { textoSaudacao = 'Boa noite!'; }
        elementoSaudacao.textContent = textoSaudacao;
    }
}
// --- Fim: SCRIPT PARA SAUDAÇÃO DINÂMICA ---

// --- Início: LÓGICA PARA O BOTÃO DE INSTALAÇÃO DA PWA (Android/Desktop Chrome) ---
let deferredPrompt;
const btnInstalarApp = document.getElementById('btnInstalarApp');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (btnInstalarApp) {
        btnInstalarApp.style.display = 'block';
        console.log('`beforeinstallprompt` disparado. Botão de instalação PWA agora visível.');
    }
});

if (btnInstalarApp) {
    btnInstalarApp.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`Resposta do utilizador ao prompt de instalação PWA: ${outcome}`);
            deferredPrompt = null;
            btnInstalarApp.style.display = 'none';
        } else {
            console.log('O evento beforeinstallprompt não foi disparado ou já foi usado.');
        }
    });
}

window.addEventListener('appinstalled', () => {
    console.log('PWA foi instalada com sucesso (evento appinstalled)!');
    if (btnInstalarApp) btnInstalarApp.style.display = 'none';
    deferredPrompt = null;
});
// --- Fim: LÓGICA PARA O BOTÃO DE INSTALAÇÃO DA PWA ---

// --- Início: LÓGICA PARA DICA DE INSTALAÇÃO NO IOS ---
const dicaIOSContainer = document.getElementById('dicaInstalarIOS');
const linkInstrucoesIOS = document.getElementById('linkInstrucoesIOS');
const btnFecharDicaIOS = document.getElementById('fecharDicaIOS');
const secaoInstrucoesDetalhadas = document.getElementById('instrucoes-ios-detalhadas');
const btnFecharInstrucoesDetalhadas = document.getElementById('fecharInstrucoesIOSDetalhadas');

function mostrarDicaParaIOS() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    const dicaJaDispensada = localStorage.getItem('dicaIOSDispensadaPermanente');

    if (isIOS && !isInStandaloneMode && !dicaJaDispensada && dicaIOSContainer) {
        const pwaInstallButtonVisible = btnInstalarApp && getComputedStyle(btnInstalarApp).display !== 'none';
        if(!pwaInstallButtonVisible) {
            dicaIOSContainer.style.display = 'block';
        }
    }
}

if (dicaIOSContainer && btnFecharDicaIOS) {
    btnFecharDicaIOS.addEventListener('click', () => {
        dicaIOSContainer.style.display = 'none';
        localStorage.setItem('dicaIOSDispensadaPermanente', 'true');
    });
}

if (linkInstrucoesIOS && secaoInstrucoesDetalhadas && btnFecharInstrucoesDetalhadas) {
    linkInstrucoesIOS.addEventListener('click', (e) => {
        e.preventDefault();
        secaoInstrucoesDetalhadas.style.display = 'block';
        secaoInstrucoesDetalhadas.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if(dicaIOSContainer) dicaIOSContainer.style.display = 'none';
    });

    btnFecharInstrucoesDetalhadas.addEventListener('click', () => {
        secaoInstrucoesDetalhadas.style.display = 'none';
    });
}
// --- Fim: LÓGICA PARA DICA DE INSTALAÇÃO NO IOS ---

// --- Início: SCRIPT PARA FLUXO DE SELEÇÃO DE QUANTIDADE E PEDIDO (COM FIREBASE) ---
const btnMostrarOpcoesQuantidade = document.getElementById('btnMostrarOpcoesQuantidade');
const opcoesQuantidadeContainer = document.getElementById('opcoesQuantidade');
const btnConfirmarPedido = document.getElementById('btnConfirmarPedido'); // Renomeado
const btnFecharOpcoesQuantidade = document.getElementById('btnFecharOpcoesQuantidade');
const feedbackMessage = document.getElementById('feedbackMessage');
const feedbackText = document.getElementById('feedbackText');
const btnNovoPedido = document.getElementById('btnNovoPedido'); // Novo botão
const observacoesInput = document.getElementById('observacoes');
const outraQuantidadeInput = document.getElementById('outraQuantidade');
const nomeClienteInput = document.getElementById('nomeCliente'); // Novo
const telefoneClienteInput = document.getElementById('telefoneCliente'); // Novo
const errorMessage = document.getElementById('errorMessage');

// Função para exibir mensagem de erro
function showErrorMessage(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000); // Esconde a mensagem após 5 segundos
}

// Adiciona um listener para limpar a mensagem de erro quando o campo "Outra quantidade" é focado
outraQuantidadeInput.addEventListener('focus', () => {
    errorMessage.style.display = 'none';
});

// Adiciona um listener para limpar a mensagem de erro quando qualquer radio button é clicado
document.querySelectorAll('input[name="quantidadeAgua"]').forEach(radio => {
    radio.addEventListener('change', () => {
        errorMessage.style.display = 'none';
    });
});

// Listener para limpar erro ao digitar nome/telefone
nomeClienteInput.addEventListener('input', () => { errorMessage.style.display = 'none'; });
telefoneClienteInput.addEventListener('input', () => { errorMessage.style.display = 'none'; });


if (btnMostrarOpcoesQuantidade && opcoesQuantidadeContainer && btnConfirmarPedido && btnFecharOpcoesQuantidade && feedbackMessage && feedbackText && btnNovoPedido && observacoesInput && outraQuantidadeInput && nomeClienteInput && telefoneClienteInput && errorMessage) {
    btnMostrarOpcoesQuantidade.addEventListener('click', () => {
        opcoesQuantidadeContainer.style.display = 'block';
        btnMostrarOpcoesQuantidade.style.display = 'none';
        feedbackMessage.style.display = 'none';
        btnNovoPedido.style.display = 'none';
        errorMessage.style.display = 'none'; // Garante que a mensagem de erro esteja oculta
        opcoesQuantidadeContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    btnFecharOpcoesQuantidade.addEventListener('click', () => {
        opcoesQuantidadeContainer.style.display = 'none';
        btnMostrarOpcoesQuantidade.style.display = 'block';
        feedbackMessage.style.display = 'none';
        btnNovoPedido.style.display = 'none';
        errorMessage.style.display = 'none'; // Garante que a mensagem de erro esteja oculta

        // Limpa os campos do formulário
        observacoesInput.value = '';
        outraQuantidadeInput.value = '';
        nomeClienteInput.value = '';
        telefoneClienteInput.value = '';
        document.querySelectorAll('input[name="quantidadeAgua"]').forEach(radio => radio.checked = false);
    });

    btnNovoPedido.addEventListener('click', () => {
        // Redireciona para o início do fluxo de pedido
        opcoesQuantidadeContainer.style.display = 'none';
        btnMostrarOpcoesQuantidade.style.display = 'block';
        feedbackMessage.style.display = 'none';
        btnNovoPedido.style.display = 'none';
        errorMessage.style.display = 'none'; 

        // Limpa os campos para um novo pedido
        observacoesInput.value = '';
        outraQuantidadeInput.value = '';
        nomeClienteInput.value = '';
        telefoneClienteInput.value = '';
        document.querySelectorAll('input[name="quantidadeAgua"]').forEach(radio => radio.checked = false);
        document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });


    btnConfirmarPedido.addEventListener('click', async () => { // Adicionado 'async'
        let quantidadeSelecionada = '';
        const radios = document.querySelectorAll('input[name="quantidadeAgua"]');
        let radioSelecionado = false;
        errorMessage.style.display = 'none'; // Oculta qualquer erro anterior

        for (const radio of radios) {
            if (radio.checked) {
                if (radio.value === 'outra quantidade: ') {
                    const valorDigitado = outraQuantidadeInput.value.trim();
                    const numero = parseFloat(valorDigitado.replace(',', '.'));
                    if (isNaN(numero) || numero <= 0) {
                        showErrorMessage('Por favor, digite uma quantidade numérica válida (ex: 3, 1.5).');
                        return;
                    }
                    quantidadeSelecionada = `${numero} ${numero === 1 ? 'galão' : 'galões'}`;
                } else {
                    quantidadeSelecionada = radio.value;
                }
                radioSelecionado = true;
                break;
            }
        }

        const nomeCliente = nomeClienteInput.value.trim();
        const telefoneCliente = telefoneClienteInput.value.trim();
        const observacao = observacoesInput.value.trim();

        // Validações adicionais para nome e telefone
        if (!radioSelecionado || quantidadeSelecionada.trim() === '') {
            showErrorMessage('Por favor, selecione uma quantidade ou digite outra.');
            return;
        }
        if (nomeCliente.length < 3) { // Exemplo: Nome precisa ter pelo menos 3 caracteres
            showErrorMessage('Por favor, digite seu nome completo (mínimo 3 caracteres).');
            return;
        }
        if (telefoneCliente.length < 8) { // Exemplo: Telefone precisa ter pelo menos 8 dígitos
            showErrorMessage('Por favor, digite um telefone válido (ex: 17999998888).');
            return;
        }

        // Desabilita o botão e mostra spinner
        btnConfirmarPedido.disabled = true;
        btnConfirmarPedido.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        try {
            // Referência ao banco de dados Firestore
            const db = firebase.firestore();

            // Adiciona um novo documento à coleção 'pedidos'
            await db.collection('pedidos').add({
                nomeCliente: nomeCliente,
                telefoneCliente: telefoneCliente,
                quantidade: quantidadeSelecionada,
                observacoes: observacao,
                dataHora: firebase.firestore.FieldValue.serverTimestamp(), // Adiciona timestamp do servidor
                status: 'pendente' // Status inicial do pedido
            });

            opcoesQuantidadeContainer.style.display = 'none';
            feedbackText.textContent = 'Seu pedido foi enviado com sucesso! Aguarde nosso contato.';
            feedbackMessage.style.display = 'flex';
            btnNovoPedido.style.display = 'block'; // Mostra o botão de fazer outro pedido
            feedbackMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Limpa os campos para o próximo pedido
            observacoesInput.value = '';
            outraQuantidadeInput.value = '';
            nomeClienteInput.value = '';
            telefoneClienteInput.value = '';
            document.querySelectorAll('input[name="quantidadeAgua"]').forEach(radio => radio.checked = false);

        } catch (error) {
            console.error("Erro ao enviar pedido para o Firebase:", error);
            showErrorMessage('Erro ao enviar o pedido. Por favor, tente novamente.');
            feedbackMessage.style.display = 'none'; // Oculta a mensagem de feedback de sucesso
            btnNovoPedido.style.display = 'none'; // Oculta o botão de novo pedido
        } finally {
            btnConfirmarPedido.disabled = false; // Reabilita o botão
            btnConfirmarPedido.innerHTML = '<i class="fas fa-check-circle"></i> Confirmar Pedido'; // Restaura o texto original
        }
    });
}
// --- Fim: SCRIPT PARA FLUXO DE SELEÇÃO DE QUANTIDADE E PEDIDO (COM FIREBASE) ---

// --- Início: LÓGICA PARA FAB SAIR/INÍCIO (APENAS PARA IOS STANDALONE) ---
const fabSair = document.getElementById('fabSair');

function toggleFabSair() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;

    if (isIOS && isInStandaloneMode && fabSair) {
        fabSair.style.display = 'flex'; // Exibe o FAB
    } else if (fabSair) {
        fabSair.style.display = 'none'; // Garante que esteja oculto em outros casos
    }
}

// Chama a saudação, verificação da dica do iOS e o FAB após o carregamento da página
window.addEventListener('load', () => {
    exibirSaudacaoDinamica();
    mostrarDicaParaIOS();
    toggleFabSair(); // Verifica e exibe o FAB se for iOS em standalone
});

// Opcional: Reavaliar a visibilidade do FAB em caso de rotação de tela ou redimensionamento
window.addEventListener('resize', toggleFabSair);
window.addEventListener('orientationchange', toggleFabSair);
// --- Fim: LÓGICA PARA FAB SAIR/INÍCIO (APENAS PARA IOS STANDALONE) ---
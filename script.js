// Configuração do WhatsApp da Escolinha
const telefoneWhatsApp = "5535991764266";
const mensagemPadrao = encodeURIComponent("Olá, Tio Marquinhos! Vi o site da escolinha e gostaria de agendar uma aula experimental para o meu filho(a).");
const urlWhatsApp = `https://wa.me/${telefoneWhatsApp}?text=${mensagemPadrao}`;

// Atribuir dinamicamente o link do WhatsApp para todos os botões de ação do site
document.addEventListener("DOMContentLoaded", function() {
    const botoesWhatsApp = document.querySelectorAll('.btn-whatsapp-action, #nav-whatsapp');
    
    botoesWhatsApp.forEach(function(botao) {
        botao.setAttribute('href', urlWhatsApp);
        botao.setAttribute('target', '_blank');
        botao.setAttribute('rel', 'noopener noreferrer');
    });
});
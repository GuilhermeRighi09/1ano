document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('timeline-track');
    
    // ATENÇÃO: Confirme se são 20 fotos mesmo. Se for outro número, basta alterar aqui.
    const totalFotos = 20; 

    // 1. Gerar as fotos na Linha do Tempo buscando da pasta 'fotos'
    for (let i = 1; i <= totalFotos; i++) {
        const item = document.createElement('div');
        item.classList.add('timeline-item');
        
        item.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-photo">
                <!-- O caminho agora aponta diretamente para a pasta 'fotos' -->
                <img src="fotos/${i}.jpeg" alt="Nossa memória ${i}" loading="lazy">
            </div>
        `;
        
        track.appendChild(item);
    }

    // 2. Animação de Surgimento (Fade-in e deslizar para cima) ao rolar a página
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Dispara quando 15% do elemento aparece na tela
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Anima apenas uma vez para cada foto/texto
            }
        });
    }, observerOptions);

    // Observa as fotos da linha do tempo
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => observer.observe(item));

    // Observa os blocos de texto
    const textBlocks = document.querySelectorAll('.story-block.reveal');
    textBlocks.forEach(block => observer.observe(block));
});
import { processTouch } from './engine.js';

let activeSettings = null;
let lastTouch = { x: 0, time: 0 };

// Esta função é chamada pelo botão "Injetar" do seu index.html
export function activateEngine(settings) {
    activeSettings = settings;
    console.log("Engine Maki Style: Ativada e Sincronizada!");
}

// Monitora o movimento do toque no Chrome
window.addEventListener('pointermove', (e) => {
    // Só funciona se você clicar em "Injetar" no painel
    if (!activeSettings || !activeSettings.aimbot) return;

    const now = performance.now();
    const dt = now - lastTouch.time;
    
    if (dt > 0) {
        const dx = e.movementX || (e.clientX - lastTouch.x);
        // Calcula a velocidade para a Curva de Bézier
        const velocity = Math.abs(dx) / dt;

        // Sincroniza com a taxa de atualização do seu Motorola G54
        requestAnimationFrame(() => {
            const move = processTouch(dx, velocity, activeSettings);
            
            // O resultado 'move' é a sensibilidade limpa e sem tremer
            // pronta para ser usada no auxílio
        });
    }

    lastTouch = { x: e.clientX, time: now };
}, { passive: true });

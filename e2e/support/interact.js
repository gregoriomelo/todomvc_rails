export async function enableVisualInteractions(page) {
  await page.addInitScript(() => {
    const style = document.createElement('style');
    style.id = '__demonstra_styles';
    style.textContent = `
      .__demonstra_highlight {
        outline: 3px solid #ef4444 !important;
        outline-offset: 3px !important;
        box-shadow: 0 0 14px rgba(239, 68, 68, 0.7) !important;
        transition: outline 0.15s ease-in-out, box-shadow 0.15s ease-in-out !important;
      }
      .__demonstra_ripple {
        position: fixed !important;
        border-radius: 50% !important;
        background: rgba(239, 68, 68, 0.35) !important;
        border: 2px solid #ef4444 !important;
        box-shadow: 0 0 16px rgba(239, 68, 68, 0.8) !important;
        pointer-events: none !important;
        z-index: 2147483647 !important;
        transform: translate(-50%, -50%) scale(0.3);
        opacity: 1;
        transition: transform 0.45s cubic-bezier(0.1, 0.8, 0.2, 1), opacity 0.45s ease-out;
      }
      .__demonstra_cursor {
        position: fixed !important;
        width: 22px !important;
        height: 22px !important;
        border-radius: 50% !important;
        background: rgba(239, 68, 68, 0.9) !important;
        border: 2px solid #ffffff !important;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4) !important;
        pointer-events: none !important;
        z-index: 2147483647 !important;
        transform: translate(-50%, -50%);
        transition: transform 0.05s linear;
        display: none;
      }
    `;
    (document.head || document.documentElement).appendChild(style);

    const cursor = document.createElement('div');
    cursor.className = '__demonstra_cursor';
    (document.body || document.documentElement).appendChild(cursor);

    function triggerRipple(x, y) {
      cursor.style.display = 'block';
      cursor.style.left = x + 'px';
      cursor.style.top = y + 'px';

      const ripple = document.createElement('div');
      ripple.className = '__demonstra_ripple';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.width = '44px';
      ripple.style.height = '44px';
      (document.body || document.documentElement).appendChild(ripple);

      requestAnimationFrame(() => {
        ripple.style.transform = 'translate(-50%, -50%) scale(1.8)';
        ripple.style.opacity = '0';
      });

      setTimeout(() => ripple.remove(), 500);
    }

    document.addEventListener('pointerdown', (e) => {
      triggerRipple(e.clientX, e.clientY);

      let el = e.target;
      while (el && el !== document.body && el !== document.documentElement) {
        if (el.tagName === 'BUTTON' || el.tagName === 'A' || el.tagName === 'INPUT' || el.getAttribute('role') === 'button') {
          break;
        }
        if (el.parentElement && (el.parentElement.tagName === 'BUTTON' || el.parentElement.tagName === 'A')) {
          el = el.parentElement;
          break;
        }
        el = el.parentElement;
      }
      if (!el || el === document.body || el === document.documentElement) {
        el = e.target;
      }

      if (el && el !== document.body && el !== document.documentElement) {
        el.classList.add('__demonstra_highlight');
        setTimeout(() => el.classList.remove('__demonstra_highlight'), 700);
      }
    }, true);

    document.addEventListener('pointermove', (e) => {
      cursor.style.display = 'block';
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    }, true);
  });
}

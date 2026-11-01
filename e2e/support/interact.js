export async function enableVisualInteractions(page) {
  await page.addInitScript(() => {
    function inject() {
      if (document.getElementById('__demonstra_styles')) return;
      const s = document.createElement('style');
      s.id = '__demonstra_styles';
      s.textContent = `
        .__demonstra_highlight {
          outline: 4px solid #ef4444 !important;
          outline-offset: 3px !important;
          box-shadow: 0 0 16px rgba(239, 68, 68, 0.8) !important;
        }
        .__demonstra_cursor {
          position: fixed !important;
          width: 20px !important;
          height: 20px !important;
          border-radius: 50% !important;
          background: #ef4444 !important;
          border: 3px solid #ffffff !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4) !important;
          pointer-events: none !important;
          z-index: 2147483647 !important;
          transform: translate(-50%, -50%);
          display: none;
        }
        .__demonstra_ripple {
          position: fixed !important;
          border-radius: 50% !important;
          background: rgba(239, 68, 68, 0.35) !important;
          border: 3px solid #ef4444 !important;
          box-shadow: 0 0 14px rgba(239, 68, 68, 0.8) !important;
          pointer-events: none !important;
          z-index: 2147483646 !important;
          transform: translate(-50%, -50%) scale(0.3);
          animation: __demonstra_ripple_anim 0.5s ease-out forwards;
        }
        @keyframes __demonstra_ripple_anim {
          0% { transform: translate(-50%, -50%) scale(0.3); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
        }
      `;
      const target = document.head || document.body || document.documentElement;
      if (target) {
        target.appendChild(s);
      }
    }

    let cursor = null;
    function getCursor() {
      inject();
      if (!cursor && (document.body || document.documentElement)) {
        cursor = document.createElement('div');
        cursor.className = '__demonstra_cursor';
        (document.body || document.documentElement).appendChild(cursor);
      }
      return cursor;
    }

    function onPointer(e) {
      const c = getCursor();
      if (c) {
        c.style.display = 'block';
        c.style.left = e.clientX + 'px';
        c.style.top = e.clientY + 'px';
      }
    }

    function onClick(e) {
      inject();
      onPointer(e);

      const targetParent = document.body || document.documentElement;
      if (targetParent) {
        const ripple = document.createElement('div');
        ripple.className = '__demonstra_ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        ripple.style.width = '36px';
        ripple.style.height = '36px';
        targetParent.appendChild(ripple);
        setTimeout(() => ripple.remove(), 550);
      }

      let el = e.target;
      while (el && el !== document.body && el !== document.documentElement) {
        if (el.tagName === 'BUTTON' || el.tagName === 'A' || el.tagName === 'INPUT' || el.getAttribute('role') === 'button' || el.classList.contains('toggle')) {
          break;
        }
        el = el.parentElement;
      }
      if (!el || el === document.body || el === document.documentElement) el = e.target;
      if (el && el !== document.body && el !== document.documentElement) {
        el.classList.add('__demonstra_highlight');
        setTimeout(() => el.classList.remove('__demonstra_highlight'), 750);
      }
    }

    window.addEventListener('DOMContentLoaded', inject);
    window.addEventListener('pointermove', onPointer, true);
    window.addEventListener('pointerdown', onClick, true);
  });
}

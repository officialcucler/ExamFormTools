// Simple client-side include loader for header/footer components
(async function () {
  const load = async (selector, url) => {
    const container = document.querySelector(selector);
    if (!container) return;
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) return;
      const text = await res.text();
      container.innerHTML = text;
    } catch (err) {
      // fail silently
    }
  };

  await Promise.all([
    load('#site-header', 'components/header.html'),
    load('#site-footer', 'components/footer.html')
  ]);

  window.__componentsLoaded = true;
  document.dispatchEvent(new CustomEvent('components:loaded'));
})();

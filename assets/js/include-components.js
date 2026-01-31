// Simple client-side include loader for header/footer components
(function () {
  const load = async (selector, url) => {
    const container = document.querySelector(selector);
    console.log('Loading', selector, 'container:', container);
    if (!container) return;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const html = await response.text();
        container.innerHTML = html;
      }
    } catch (error) {
      console.error('Error loading component:', url, error);
    }
  };

  const loadComponents = async () => {
    await Promise.all([
      load('#site-header', '../components/header.html'),
      load('#site-footer', '../components/footer.html'),
      load('#share', '../components/share.html'),
      load('#move-to-top', '../components/move-to-top.html')
    ]);

    window.__componentsLoaded = true;
    document.dispatchEvent(new CustomEvent('components:loaded'));
  };

  loadComponents();
})();

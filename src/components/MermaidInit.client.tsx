import mermaid from "mermaid";

export default function MermaidInit() {
  // run once when this module is hydrated by Astro
  // If multiple instances are mounted, guard to avoid re-initializing.
  if ((globalThis as any).__MERMAID_INITIALIZED) return null;
  (globalThis as any).__MERMAID_INITIALIZED = true;

  // default config — adjust as needed
  mermaid.initialize({
    startOnLoad: false,
    theme: "default",
    flowchart: { useMaxWidth: true },
    securityLevel: "loose", // allow more HTML in labels; change if you need stricter sanitization
  });

// render any existing mermaid blocks on the page


function renderAll() {
  try {
    const nodes = Array.from(
      document.querySelectorAll('pre code.language-mermaid, code.language-mermaid')
    ) as HTMLElement[];

    // quick debug log
    console.log('Mermaid renderAll found:', nodes.length);

    nodes.forEach((code) => {
      const parentPre = code.closest('pre');
      let raw = (code as HTMLElement).innerText || code.textContent || '';
      raw = raw.replace(/^```mermaid\s*/i, '').replace(/\s*```$/i, '').trim();
      const unescaped = raw
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
      const container = document.createElement('div');
      container.className = 'mermaid';
      container.textContent = unescaped;
      if (parentPre) parentPre.replaceWith(container);
      else code.replaceWith(container);
    });

    console.log('Containers before run:', document.querySelectorAll('.mermaid').length);

    // run mermaid after replacements
    mermaid.run();
    console.log('mermaid.run() completed');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Mermaid render error:', err);
  }
}



	

  // If content can change after load (e.g. client-side routing), observe mutations
  const observer = new MutationObserver(() => {

	renderAll();
	setTimeout(renderAll, 250);

  });

  // start observing the document body for added mermaid blocks
  if (typeof document !== "undefined") {
    // render immediately
    renderAll();
    setTimeout(renderAll, 200);


    // observe additions to the body so future injected diagrams are rendered
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // cleanup when the page gets unloaded
    if (typeof window !== "undefined") {
      window.addEventListener(
        "beforeunload",
        () => {
          observer.disconnect();
        },
        { once: true }
      );
    }
  }

  return null;
}


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
  // Supports:
  // - <div class="mermaid">...</div>
  // - ```mermaid fenced code -> usually rendered as <pre><code class="language-mermaid">...</code></pre>
  function renderAll() {
    try {
      // 1) convert <code class="language-mermaid"> inside <pre> into .mermaid divs so mermaid.run() picks them up
      const codeBlocks = Array.from(
        document.querySelectorAll("pre code.language-mermaid")
      ) as HTMLCodeElement[];
      codeBlocks.forEach((code) => {
        const parentPre = code.parentElement;
        if (!parentPre) return;
        const text = code.textContent || "";
        // create container
        const container = document.createElement("div");
        container.className = "mermaid";
        container.textContent = text;
        parentPre.replaceWith(container);
      });

      // 2) run mermaid to find .mermaid containers
      mermaid.run();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Mermaid render error:", err);
    }
  }

  // If content can change after load (e.g. client-side routing), observe mutations
  const observer = new MutationObserver(() => {
    renderAll();
  });

  // start observing the document body for added mermaid blocks
  if (typeof document !== "undefined") {
    // render immediately
    renderAll();

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


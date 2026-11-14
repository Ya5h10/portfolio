import { useEffect, useRef, useState } from "react";
import { ExternalLink, Gamepad2, Keyboard } from "lucide-react";

/**
 * Original Doom (shareware Episode 1) via jacobenget/doom.wasm.
 * Shareware IWAD is embedded in the WASM module (freely redistributable).
 * Desktop/keyboard oriented — iframe + window key listeners + focus bridge.
 */
export default function DoomEmbed() {
  const [started, setStarted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const focusGame = () => {
    const frame = iframeRef.current;
    if (!frame) return;
    try {
      frame.setAttribute("tabindex", "0");
      frame.focus({ preventScroll: true });
      frame.contentWindow?.focus();
      frame.contentWindow?.postMessage({ type: "doom-focus" }, "*");
      const canvas = frame.contentDocument?.getElementById("DoomGame") as
        | HTMLCanvasElement
        | null;
      if (canvas) {
        canvas.tabIndex = 0;
        canvas.focus({ preventScroll: true });
        try {
          canvas.setPointerCapture?.(1);
        } catch {
          /* ignore */
        }
      }
    } catch {
      frame.focus();
      frame.contentWindow?.postMessage({ type: "doom-focus" }, "*");
    }
  };

  useEffect(() => {
    if (!started) return;
    const t = window.setTimeout(focusGame, 400);
    const t2 = window.setTimeout(focusGame, 1200);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
  }, [started]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-xl">
          <p className="text-sm leading-7 text-slate-600">
            Classic Doom shareware via WebAssembly (
            <code className="text-xs">doom.wasm</code>). Episode 1 IWAD is the
            id Software–authorized shareware build embedded in the engine — no
            commercial WAD shipped. After Start, click the game once, then use
            the keyboard.
          </p>
        </div>
        <a
          href="https://github.com/jacobenget/doom.wasm"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-700 hover:underline"
        >
          Engine source
          <ExternalLink size={14} />
        </a>
      </div>

      {!started ? (
        <div className="flex min-h-[320px] flex-col items-center justify-center gap-5 rounded-2xl border border-dashed border-slate-300 bg-slate-950 px-6 py-16 text-center text-white sm:min-h-[420px]">
          <Gamepad2 size={36} className="text-sky-300" />
          <div>
            <p className="font-display text-xl font-bold">Load Doom (shareware)</p>
            <p className="mt-2 max-w-md text-sm leading-7 text-slate-300">
              ~4.4MB WASM. Click Start, then click inside the game. Keys: WASD /
              arrows, Ctrl fire, Space use, Enter to start from the menu.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="rounded-xl bg-linear-to-r from-sky-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 active:scale-[0.98]"
          >
            Start Doom
          </button>
          <p className="inline-flex items-center gap-2 text-xs text-slate-400">
            <Keyboard size={14} /> Desktop keyboard required for full control
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-xl">
          <iframe
            ref={iframeRef}
            title="Doom shareware (WebAssembly)"
            src="/games/doom/doom.html"
            className="aspect-4/3 h-[min(70vh,560px)] w-full bg-black"
            allow="autoplay; fullscreen; gamepad"
            tabIndex={0}
            onLoad={focusGame}
            onClick={focusGame}
          />
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 bg-slate-950 px-4 py-3 text-xs text-slate-400">
            <span>
              Click the game for focus · WASD/arrows · Ctrl fire · Space use ·
              Enter
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={focusGame}
                className="rounded-lg border border-sky-700/60 bg-sky-950/40 px-3 py-1.5 text-sky-200 hover:bg-sky-900/40"
              >
                Focus keyboard
              </button>
              <button
                type="button"
                onClick={() => setStarted(false)}
                className="rounded-lg border border-slate-700 px-3 py-1.5 text-slate-200 hover:bg-slate-900"
              >
                Unload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

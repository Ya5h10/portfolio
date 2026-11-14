import { useEffect, useRef, useState } from "react";
import { ExternalLink, Gamepad2, Keyboard, Mouse } from "lucide-react";

/**
 * Original Doom (shareware Episode 1) via jacobenget/doom.wasm.
 * Keyboard + pointer-lock mouse look (emulated turn) + mouse fire.
 * Esc / Exit returns to the portfolio.
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
      canvas?.focus({ preventScroll: true });
    } catch {
      frame.focus();
      frame.contentWindow?.postMessage({ type: "doom-focus" }, "*");
    }
  };

  const exitGame = () => {
    const frame = iframeRef.current;
    frame?.contentWindow?.postMessage({ type: "doom-exit" }, "*");
    setStarted(false);
  };

  useEffect(() => {
    if (!started) return;
    const t = window.setTimeout(focusGame, 400);
    const t2 = window.setTimeout(focusGame, 1200);

    const onMessage = (ev: MessageEvent) => {
      if (ev.data?.type === "doom-exit") {
        setStarted(false);
      }
    };
    window.addEventListener("message", onMessage);

    const forward = (type: "keydown" | "keyup") => (e: KeyboardEvent) => {
      const frame = iframeRef.current;
      const win = frame?.contentWindow;
      if (!win) return;
      const target = e.target as Node | null;
      if (target && frame?.contains(target)) return;

      if (e.key === "Escape" || e.code === "Escape") {
        e.preventDefault();
        exitGame();
        return;
      }

      win.postMessage(
        {
          type: "doom-key",
          eventType: type,
          key: e.key,
          code: e.code,
          repeat: e.repeat,
        },
        "*",
      );
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key) ||
        ["KeyW", "KeyA", "KeyS", "KeyD", "ControlLeft", "ControlRight"].includes(
          e.code,
        )
      ) {
        e.preventDefault();
      }
    };
    const onDown = forward("keydown");
    const onUp = forward("keyup");
    window.addEventListener("keydown", onDown, true);
    window.addEventListener("keyup", onUp, true);

    return () => {
      window.clearTimeout(t);
      window.clearTimeout(t2);
      window.removeEventListener("message", onMessage);
      window.removeEventListener("keydown", onDown, true);
      window.removeEventListener("keyup", onUp, true);
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
            commercial WAD shipped. Mouse look + fire with pointer lock; Esc
            exits back to the portfolio.
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
              ~4.4MB WASM. After Start: click the game to capture the mouse.
              Move to look, LMB fire, WASD move, Space use. Esc or Exit returns
              here.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="rounded-xl bg-linear-to-r from-sky-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 active:scale-[0.98]"
          >
            Start Doom
          </button>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            <span className="inline-flex items-center gap-2">
              <Mouse size={14} /> Mouse look + LMB fire
            </span>
            <span className="inline-flex items-center gap-2">
              <Keyboard size={14} /> WASD · Space use · Esc exit
            </span>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-xl">
          <iframe
            ref={iframeRef}
            title="Doom shareware (WebAssembly)"
            src="/games/doom/doom.html"
            className="aspect-4/3 h-[min(70vh,560px)] w-full bg-black"
            allow="autoplay; fullscreen; gamepad; pointer-lock"
            tabIndex={0}
            onLoad={focusGame}
            onClick={focusGame}
          />
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 bg-slate-950 px-4 py-3 text-xs text-slate-400">
            <span>
              Mouse look · LMB fire · RMB/Space use · WASD/arrows ·{" "}
              <strong className="font-semibold text-sky-300">Esc exits</strong>
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={focusGame}
                className="rounded-lg border border-sky-700/60 bg-sky-950/40 px-3 py-1.5 text-sky-200 hover:bg-sky-900/40"
              >
                Recapture mouse
              </button>
              <button
                type="button"
                onClick={exitGame}
                className="rounded-lg border border-rose-700/50 bg-rose-950/40 px-3 py-1.5 text-rose-100 hover:bg-rose-900/40"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

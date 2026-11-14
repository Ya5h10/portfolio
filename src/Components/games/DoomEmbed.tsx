import { useState } from "react";
import { ExternalLink, Gamepad2, Keyboard } from "lucide-react";

/**
 * Original Doom (shareware Episode 1) via jacobenget/doom.wasm.
 * The WASM module embeds the freely redistributable DOOM1.WAD shareware.
 * Engine: GPL-2.0 doomgeneric-based wasm. Desktop/keyboard oriented.
 */
export default function DoomEmbed() {
  const [started, setStarted] = useState(false);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-xl">
          <p className="text-sm leading-7 text-slate-600">
            Classic Doom shareware running in-browser via WebAssembly (
            <code className="text-xs">doom.wasm</code>). Episode 1 IWAD is the
            id Software–authorized shareware build embedded in the engine —
            no commercial WAD shipped. Best on desktop with a keyboard.
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
              ~4.4MB WASM download. Click below, then click the game canvas and
              use classic Doom keys (arrows / WASD, Ctrl fire, Space use).
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
            <Keyboard size={14} /> Desktop-leaning — mobile touch is limited
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-xl">
          <iframe
            title="Doom shareware (WebAssembly)"
            src="/games/doom/doom.html"
            className="aspect-4/3 h-[min(70vh,560px)] w-full bg-black"
            allow="autoplay; fullscreen; gamepad"
          />
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 bg-slate-950 px-4 py-3 text-xs text-slate-400">
            <span>Click inside the frame to capture keyboard focus.</span>
            <button
              type="button"
              onClick={() => setStarted(false)}
              className="rounded-lg border border-slate-700 px-3 py-1.5 text-slate-200 hover:bg-slate-900"
            >
              Unload
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

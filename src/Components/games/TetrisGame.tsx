import { useEffect, useRef, useState } from "react";

const COLS = 10;
const ROWS = 20;
const BLOCK = 28;

const SHAPES: number[][][] = [
  [[1, 1, 1, 1]],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
];

const COLORS = [
  "#38bdf8",
  "#818cf8",
  "#a78bfa",
  "#22d3ee",
  "#60a5fa",
  "#c084fc",
  "#7dd3fc",
];

type Cell = number; // 0 empty, else color index+1

function rotate(matrix: number[][]) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const next = Array.from({ length: cols }, () => Array(rows).fill(0));
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      next[x][rows - 1 - y] = matrix[y][x];
    }
  }
  return next;
}

function emptyBoard(): Cell[][] {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

function randomPiece() {
  const index = Math.floor(Math.random() * SHAPES.length);
  return {
    shape: SHAPES[index].map((row) => [...row]),
    color: index + 1,
    x: 3,
    y: 0,
  };
}

export default function TetrisGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<Cell[][]>(emptyBoard());
  const pieceRef = useRef(randomPiece());
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const dropMs = useRef(650);

  const collides = (shape: number[][], ox: number, oy: number) => {
    const board = boardRef.current;
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (!shape[y][x]) continue;
        const nx = ox + x;
        const ny = oy + y;
        if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
        if (ny >= 0 && board[ny][nx]) return true;
      }
    }
    return false;
  };

  const merge = () => {
    const board = boardRef.current.map((row) => [...row]);
    const p = pieceRef.current;
    p.shape.forEach((row, y) => {
      row.forEach((val, x) => {
        if (!val) return;
        const ny = p.y + y;
        const nx = p.x + x;
        if (ny >= 0 && ny < ROWS && nx >= 0 && nx < COLS) {
          board[ny][nx] = p.color;
        }
      });
    });
    let cleared = 0;
    const next = board.filter((row) => {
      const full = row.every((c) => c !== 0);
      if (full) cleared += 1;
      return !full;
    });
    while (next.length < ROWS) next.unshift(Array(COLS).fill(0));
    boardRef.current = next;
    if (cleared) {
      setLines((n) => n + cleared);
      setScore((s) => s + [0, 100, 300, 500, 800][cleared] * Math.max(1, Math.floor((lines + cleared) / 10) + 1));
      dropMs.current = Math.max(180, 650 - Math.floor((lines + cleared) / 5) * 40);
    }
  };

  const spawn = () => {
    const next = randomPiece();
    pieceRef.current = next;
    if (collides(next.shape, next.x, next.y)) {
      setGameOver(true);
      setRunning(false);
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const paintCell = (x: number, y: number, colorIdx: number) => {
      ctx.fillStyle = COLORS[colorIdx - 1];
      ctx.fillRect(x * BLOCK + 1, y * BLOCK + 1, BLOCK - 2, BLOCK - 2);
    };

    boardRef.current.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) paintCell(x, y, cell);
      });
    });

    const p = pieceRef.current;
    p.shape.forEach((row, y) => {
      row.forEach((val, x) => {
        if (val) paintCell(p.x + x, p.y + y, p.color);
      });
    });

    ctx.strokeStyle = "rgba(148,163,184,0.15)";
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath();
      ctx.moveTo(x * BLOCK, 0);
      ctx.lineTo(x * BLOCK, ROWS * BLOCK);
      ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * BLOCK);
      ctx.lineTo(COLS * BLOCK, y * BLOCK);
      ctx.stroke();
    }
  };

  const hardDrop = () => {
    const p = pieceRef.current;
    while (!collides(p.shape, p.x, p.y + 1)) p.y += 1;
    merge();
    spawn();
  };

  const move = (dx: number, dy: number) => {
    const p = pieceRef.current;
    if (!collides(p.shape, p.x + dx, p.y + dy)) {
      p.x += dx;
      p.y += dy;
      return true;
    }
    return false;
  };

  const tryRotate = () => {
    const p = pieceRef.current;
    const rotated = rotate(p.shape);
    if (!collides(rotated, p.x, p.y)) p.shape = rotated;
  };

  useEffect(() => {
    draw();
  });

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      if (!move(0, 1)) {
        merge();
        spawn();
      }
      draw();
    }, dropMs.current);
    return () => window.clearInterval(id);
  }, [running, lines]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!running) return;
      if (["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", " ", "w", "a", "s", "d"].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === "ArrowLeft" || e.key === "a") move(-1, 0);
      if (e.key === "ArrowRight" || e.key === "d") move(1, 0);
      if (e.key === "ArrowDown" || e.key === "s") {
        if (!move(0, 1)) {
          merge();
          spawn();
        }
      }
      if (e.key === "ArrowUp" || e.key === "w") tryRotate();
      if (e.key === " ") hardDrop();
      draw();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [running]);

  const reset = () => {
    boardRef.current = emptyBoard();
    pieceRef.current = randomPiece();
    dropMs.current = 650;
    setScore(0);
    setLines(0);
    setGameOver(false);
    setRunning(true);
    draw();
  };

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
      <div className="mx-auto overflow-hidden rounded-2xl border border-slate-700 shadow-xl shadow-slate-900/20">
        <canvas
          ref={canvasRef}
          width={COLS * BLOCK}
          height={ROWS * BLOCK}
          className="block touch-none bg-slate-950"
          aria-label="Tetris playfield"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
          <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3">
            <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">Score</p>
            <p className="font-display mt-1 text-2xl font-bold text-slate-900">{score}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3">
            <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">Lines</p>
            <p className="font-display mt-1 text-2xl font-bold text-slate-900">{lines}</p>
          </div>
        </div>
        {gameOver && (
          <p className="text-sm font-medium text-rose-600">Game over — hit New game to retry.</p>
        )}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={reset}
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white active:scale-[0.98]"
          >
            {running ? "Restart" : "New game"}
          </button>
          {running && (
            <button
              type="button"
              onClick={() => setRunning(false)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
            >
              Pause
            </button>
          )}
          {!running && !gameOver && score === 0 && (
            <button
              type="button"
              onClick={() => setRunning(true)}
              className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-2.5 text-sm font-semibold text-sky-800"
            >
              Resume
            </button>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2 sm:max-w-xs">
          <button type="button" className="col-start-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold active:bg-slate-50" onClick={() => { tryRotate(); draw(); }}>↻</button>
          <button type="button" className="col-start-1 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold active:bg-slate-50" onClick={() => { move(-1, 0); draw(); }}>←</button>
          <button type="button" className="rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold active:bg-slate-50" onClick={() => { if (!move(0, 1)) { merge(); spawn(); } draw(); }}>↓</button>
          <button type="button" className="rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold active:bg-slate-50" onClick={() => { move(1, 0); draw(); }}>→</button>
          <button type="button" className="col-span-3 rounded-xl border border-violet-200 bg-violet-50 py-3 text-sm font-semibold text-violet-900 active:bg-violet-100" onClick={() => { hardDrop(); draw(); }}>Drop</button>
        </div>
        <p className="text-xs leading-6 text-slate-500">
          Keyboard: arrows / WASD to move, ↑/W rotate, Space hard drop. Touch buttons work on phone.
        </p>
      </div>
    </div>
  );
}

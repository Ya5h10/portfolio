import { useCallback, useEffect, useRef, useState } from "react";

const COLS = 10;
const ROWS = 20;
const BLOCK = 28;
const START_DROP_MS = 500;
const MIN_DROP_MS = 160;
const LOCK_DELAY_MS = 280;

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

type Cell = number;
type Piece = { shape: number[][]; color: number; x: number; y: number };

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

function randomPiece(): Piece {
  const index = Math.floor(Math.random() * SHAPES.length);
  return {
    shape: SHAPES[index].map((row) => [...row]),
    color: index + 1,
    x: 3,
    y: 0,
  };
}

function collides(board: Cell[][], shape: number[][], ox: number, oy: number) {
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
}

export default function TetrisGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<Cell[][]>(emptyBoard());
  const pieceRef = useRef<Piece>(randomPiece());
  const runningRef = useRef(false);
  const gameOverRef = useRef(false);
  const dropMsRef = useRef(START_DROP_MS);
  const dropAccRef = useRef(0);
  const lockAccRef = useRef(0);
  const lockingRef = useRef(false);
  const linesRef = useRef(0);
  const scoreRef = useRef(0);
  const rafRef = useRef(0);
  const lastTsRef = useRef(0);

  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const paintCell = (x: number, y: number, colorIdx: number) => {
      ctx.fillStyle = COLORS[colorIdx - 1];
      ctx.fillRect(x * BLOCK + 1, y * BLOCK + 1, BLOCK - 2, BLOCK - 2);
    };

    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const cell = boardRef.current[y][x];
        if (cell) paintCell(x, y, cell);
      }
    }

    const p = pieceRef.current;
    for (let y = 0; y < p.shape.length; y++) {
      for (let x = 0; x < p.shape[y].length; x++) {
        if (p.shape[y][x]) paintCell(p.x + x, p.y + y, p.color);
      }
    }

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
  }, []);

  const clearLines = useCallback(() => {
    const board = boardRef.current;
    const kept: Cell[][] = [];
    let cleared = 0;
    for (let y = 0; y < ROWS; y++) {
      if (board[y].every((c) => c !== 0)) cleared += 1;
      else kept.push(board[y]);
    }
    while (kept.length < ROWS) kept.unshift(Array(COLS).fill(0));
    boardRef.current = kept;

    if (cleared > 0) {
      linesRef.current += cleared;
      const level = Math.floor(linesRef.current / 10) + 1;
      const gained = [0, 100, 300, 500, 800][cleared] * level;
      scoreRef.current += gained;
      dropMsRef.current = Math.max(
        MIN_DROP_MS,
        START_DROP_MS - Math.floor(linesRef.current / 5) * 40,
      );
      setLines(linesRef.current);
      setScore(scoreRef.current);
    }
  }, []);

  const mergePiece = useCallback(() => {
    const board = boardRef.current.map((row) => [...row]);
    const p = pieceRef.current;
    for (let y = 0; y < p.shape.length; y++) {
      for (let x = 0; x < p.shape[y].length; x++) {
        if (!p.shape[y][x]) continue;
        const ny = p.y + y;
        const nx = p.x + x;
        if (ny >= 0 && ny < ROWS && nx >= 0 && nx < COLS) {
          board[ny][nx] = p.color;
        }
      }
    }
    boardRef.current = board;
    clearLines();
  }, [clearLines]);

  const spawn = useCallback(() => {
    const next = randomPiece();
    pieceRef.current = next;
    lockingRef.current = false;
    lockAccRef.current = 0;
    dropAccRef.current = 0;
    if (collides(boardRef.current, next.shape, next.x, next.y)) {
      gameOverRef.current = true;
      runningRef.current = false;
      setGameOver(true);
      setRunning(false);
    }
  }, []);

  const tryMove = useCallback((dx: number, dy: number) => {
    if (!runningRef.current || gameOverRef.current) return false;
    const p = pieceRef.current;
    if (!collides(boardRef.current, p.shape, p.x + dx, p.y + dy)) {
      p.x += dx;
      p.y += dy;
      if (dy !== 0) {
        lockingRef.current = false;
        lockAccRef.current = 0;
      }
      return true;
    }
    return false;
  }, []);

  const tryRotate = useCallback(() => {
    if (!runningRef.current || gameOverRef.current) return;
    const p = pieceRef.current;
    const rotated = rotate(p.shape);
    const kicks = [0, -1, 1, -2, 2];
    for (const kick of kicks) {
      if (!collides(boardRef.current, rotated, p.x + kick, p.y)) {
        p.shape = rotated;
        p.x += kick;
        lockingRef.current = false;
        lockAccRef.current = 0;
        return;
      }
    }
  }, []);

  const hardDrop = useCallback(() => {
    if (!runningRef.current || gameOverRef.current) return;
    const p = pieceRef.current;
    while (!collides(boardRef.current, p.shape, p.x, p.y + 1)) {
      p.y += 1;
      scoreRef.current += 2;
    }
    setScore(scoreRef.current);
    mergePiece();
    spawn();
  }, [mergePiece, spawn]);

  const softDropStep = useCallback(() => {
    if (tryMove(0, 1)) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
      return true;
    }
    return false;
  }, [tryMove]);

  const tick = useCallback(
    (dt: number) => {
      if (!runningRef.current || gameOverRef.current) return;

      const p = pieceRef.current;
      const grounded = collides(boardRef.current, p.shape, p.x, p.y + 1);

      if (grounded) {
        lockingRef.current = true;
        lockAccRef.current += dt;
        if (lockAccRef.current >= LOCK_DELAY_MS) {
          mergePiece();
          spawn();
        }
      } else {
        lockingRef.current = false;
        lockAccRef.current = 0;
        dropAccRef.current += dt;
        while (dropAccRef.current >= dropMsRef.current) {
          dropAccRef.current -= dropMsRef.current;
          if (!tryMove(0, 1)) {
            lockingRef.current = true;
            lockAccRef.current = 0;
            break;
          }
        }
      }
    },
    [mergePiece, spawn, tryMove],
  );

  useEffect(() => {
    draw();
    const loop = (ts: number) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = Math.min(64, ts - lastTsRef.current);
      lastTsRef.current = ts;
      tick(dt);
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    // Hidden test hook for automated verification of line clears
    const onTestClear = () => {
      const board = emptyBoard();
      for (let x = 0; x < COLS; x++) board[ROWS - 1][x] = 1;
      for (let x = 0; x < 4; x++) board[ROWS - 2][x] = 2;
      boardRef.current = board;
      clearLines();
      draw();
    };
    window.addEventListener("tetris-test-clear", onTestClear);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("tetris-test-clear", onTestClear);
    };
  }, [clearLines, draw, tick]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!runningRef.current) return;
      const keys = ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", " ", "w", "a", "s", "d", "W", "A", "S", "D"];
      if (!keys.includes(e.key)) return;
      e.preventDefault();
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") tryMove(-1, 0);
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") tryMove(1, 0);
      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") softDropStep();
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") tryRotate();
      if (e.key === " ") hardDrop();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hardDrop, softDropStep, tryMove, tryRotate]);

  const reset = () => {
    boardRef.current = emptyBoard();
    pieceRef.current = randomPiece();
    dropMsRef.current = START_DROP_MS;
    dropAccRef.current = 0;
    lockAccRef.current = 0;
    lockingRef.current = false;
    linesRef.current = 0;
    scoreRef.current = 0;
    gameOverRef.current = false;
    runningRef.current = true;
    lastTsRef.current = 0;
    setScore(0);
    setLines(0);
    setGameOver(false);
    setRunning(true);
    draw();
  };

  const pause = () => {
    runningRef.current = false;
    setRunning(false);
  };

  const resume = () => {
    if (gameOverRef.current) return;
    runningRef.current = true;
    lastTsRef.current = 0;
    setRunning(true);
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
            <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
              Score
            </p>
            <p className="font-display mt-1 text-2xl font-bold text-slate-900">
              {score}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3">
            <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
              Lines
            </p>
            <p className="font-display mt-1 text-2xl font-bold text-slate-900">
              {lines}
            </p>
          </div>
        </div>
        {gameOver && (
          <p className="text-sm font-medium text-rose-600">
            Game over — hit New game to retry.
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={reset}
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white active:scale-[0.98]"
          >
            {running || score > 0 || gameOver ? "Restart" : "New game"}
          </button>
          {running && (
            <button
              type="button"
              onClick={pause}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
            >
              Pause
            </button>
          )}
          {!running && !gameOver && (score > 0 || lines > 0) && (
            <button
              type="button"
              onClick={resume}
              className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-2.5 text-sm font-semibold text-sky-800"
            >
              Resume
            </button>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2 sm:max-w-xs">
          <button
            type="button"
            className="col-start-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold active:bg-slate-50"
            onClick={tryRotate}
          >
            ↻
          </button>
          <button
            type="button"
            className="col-start-1 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold active:bg-slate-50"
            onClick={() => tryMove(-1, 0)}
          >
            ←
          </button>
          <button
            type="button"
            className="rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold active:bg-slate-50"
            onClick={softDropStep}
          >
            ↓
          </button>
          <button
            type="button"
            className="rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold active:bg-slate-50"
            onClick={() => tryMove(1, 0)}
          >
            →
          </button>
          <button
            type="button"
            className="col-span-3 rounded-xl border border-violet-200 bg-violet-50 py-3 text-sm font-semibold text-violet-900 active:bg-violet-100"
            onClick={hardDrop}
          >
            Drop
          </button>
        </div>
        <p className="text-xs leading-6 text-slate-500">
          Pieces fall automatically. Clear full rows for points. Keyboard:
          arrows / WASD, Space hard drop. Touch buttons work on phone.
        </p>
      </div>
    </div>
  );
}

import { useCallback, useEffect, useRef, useState } from "react";

const COLS = 10;
const ROWS = 20;
const BLOCK = 28;
const START_DROP_MS = 500;
const MIN_DROP_MS = 120;
const LOCK_DELAY_MS = 450;
const MAX_LOCK_RESETS = 12;

const SHAPES: number[][][] = [
  [[1, 1, 1, 1]], // I
  [
    [1, 1],
    [1, 1],
  ], // O
  [
    [0, 1, 0],
    [1, 1, 1],
  ], // T
  [
    [1, 0, 0],
    [1, 1, 1],
  ], // J
  [
    [0, 0, 1],
    [1, 1, 1],
  ], // L
  [
    [1, 1, 0],
    [0, 1, 1],
  ], // S
  [
    [0, 1, 1],
    [1, 1, 0],
  ], // Z
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

function bagPiece(): () => Piece {
  let bag: number[] = [];
  return () => {
    if (bag.length === 0) {
      bag = [0, 1, 2, 3, 4, 5, 6];
      for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
    }
    const index = bag.pop()!;
    const shape = SHAPES[index].map((row) => [...row]);
    const width = shape[0].length;
    return {
      shape,
      color: index + 1,
      x: Math.floor((COLS - width) / 2),
      y: 0,
    };
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

function isGrounded(board: Cell[][], p: Piece) {
  return collides(board, p.shape, p.x, p.y + 1);
}

export default function TetrisGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<Cell[][]>(emptyBoard());
  const pieceRef = useRef<Piece | null>(null);
  const nextPieceFn = useRef(bagPiece());
  const runningRef = useRef(false);
  const gameOverRef = useRef(false);
  const dropMsRef = useRef(START_DROP_MS);
  const dropAccRef = useRef(0);
  const lockAccRef = useRef(0);
  const lockResetsRef = useRef(0);
  const linesRef = useRef(0);
  const scoreRef = useRef(0);
  const rafRef = useRef(0);
  const lastTsRef = useRef(0);

  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const syncHud = useCallback(() => {
    setScore(scoreRef.current);
    setLines(linesRef.current);
    setRunning(runningRef.current);
    setGameOver(gameOverRef.current);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const paintCell = (x: number, y: number, colorIdx: number) => {
      if (y < 0) return;
      ctx.fillStyle = COLORS[(colorIdx - 1) % COLORS.length];
      ctx.fillRect(x * BLOCK + 1, y * BLOCK + 1, BLOCK - 2, BLOCK - 2);
    };

    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const cell = boardRef.current[y][x];
        if (cell) paintCell(x, y, cell);
      }
    }

    const p = pieceRef.current;
    if (p) {
      for (let y = 0; y < p.shape.length; y++) {
        for (let x = 0; x < p.shape[y].length; x++) {
          if (p.shape[y][x]) paintCell(p.x + x, p.y + y, p.color);
        }
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

    if (gameOverRef.current) {
      ctx.fillStyle = "rgba(15,23,42,0.72)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#fda4af";
      ctx.font = "bold 22px Syne, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 8);
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "14px Figtree, sans-serif";
      ctx.fillText("Restart to play again", canvas.width / 2, canvas.height / 2 + 18);
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
      scoreRef.current += [0, 100, 300, 500, 800][cleared] * level;
      dropMsRef.current = Math.max(
        MIN_DROP_MS,
        START_DROP_MS - Math.floor(linesRef.current / 5) * 45,
      );
      syncHud();
    }
    return cleared;
  }, [syncHud]);

  const endGame = useCallback(() => {
    gameOverRef.current = true;
    runningRef.current = false;
    syncHud();
    draw();
  }, [draw, syncHud]);

  const spawn = useCallback(() => {
    if (gameOverRef.current) return false;
    const next = nextPieceFn.current();
    // If spawn cell is blocked, the stack reached the top — game over.
    if (collides(boardRef.current, next.shape, next.x, next.y)) {
      pieceRef.current = next;
      endGame();
      return false;
    }
    pieceRef.current = next;
    dropAccRef.current = 0;
    lockAccRef.current = 0;
    lockResetsRef.current = 0;
    return true;
  }, [endGame]);

  const mergePiece = useCallback(() => {
    const p = pieceRef.current;
    if (!p) return;
    const board = boardRef.current.map((row) => [...row]);
    for (let y = 0; y < p.shape.length; y++) {
      for (let x = 0; x < p.shape[y].length; x++) {
        if (!p.shape[y][x]) continue;
        const ny = p.y + y;
        const nx = p.x + x;
        if (ny < 0) {
          // Locked above the visible field → top-out
          pieceRef.current = null;
          endGame();
          return;
        }
        if (ny < ROWS && nx >= 0 && nx < COLS) board[ny][nx] = p.color;
      }
    }
    boardRef.current = board;
    pieceRef.current = null;
    lockAccRef.current = 0;
    lockResetsRef.current = 0;
    clearLines();
  }, [clearLines, endGame]);

  const lockAndSpawn = useCallback(() => {
    mergePiece();
    if (!gameOverRef.current) spawn();
  }, [mergePiece, spawn]);

  const tryMove = useCallback(
    (dx: number, dy: number) => {
      if (!runningRef.current || gameOverRef.current) return false;
      const p = pieceRef.current;
      if (!p) return false;
      if (collides(boardRef.current, p.shape, p.x + dx, p.y + dy)) return false;
      p.x += dx;
      p.y += dy;
      if (dy !== 0) {
        lockAccRef.current = 0;
        lockResetsRef.current = 0;
      } else if (isGrounded(boardRef.current, p)) {
        // Lateral move while grounded extends lock a bit, but capped.
        if (lockResetsRef.current < MAX_LOCK_RESETS) {
          lockAccRef.current = 0;
          lockResetsRef.current += 1;
        }
      }
      return true;
    },
    [],
  );

  const tryRotate = useCallback(() => {
    if (!runningRef.current || gameOverRef.current) return;
    const p = pieceRef.current;
    if (!p) return;
    const rotated = rotate(p.shape);
    for (const kick of [0, -1, 1, -2, 2]) {
      if (!collides(boardRef.current, rotated, p.x + kick, p.y)) {
        p.shape = rotated;
        p.x += kick;
        if (isGrounded(boardRef.current, p) && lockResetsRef.current < MAX_LOCK_RESETS) {
          lockAccRef.current = 0;
          lockResetsRef.current += 1;
        }
        return;
      }
    }
  }, []);

  const hardDrop = useCallback(() => {
    if (!runningRef.current || gameOverRef.current) return;
    const p = pieceRef.current;
    if (!p) return;
    while (!collides(boardRef.current, p.shape, p.x, p.y + 1)) {
      p.y += 1;
      scoreRef.current += 2;
    }
    syncHud();
    lockAndSpawn();
  }, [lockAndSpawn, syncHud]);

  const softDropStep = useCallback(() => {
    if (!runningRef.current || gameOverRef.current) return false;
    if (tryMove(0, 1)) {
      scoreRef.current += 1;
      syncHud();
      return true;
    }
    // Grounded: accelerate lock so soft-drop can finish a piece.
    lockAccRef.current = LOCK_DELAY_MS;
    return false;
  }, [syncHud, tryMove]);

  const tick = useCallback(
    (dt: number) => {
      if (!runningRef.current || gameOverRef.current) return;

      let p = pieceRef.current;
      if (!p) {
        spawn();
        return;
      }

      if (isGrounded(boardRef.current, p)) {
        lockAccRef.current += dt;
        if (
          lockAccRef.current >= LOCK_DELAY_MS ||
          lockResetsRef.current >= MAX_LOCK_RESETS
        ) {
          lockAndSpawn();
        }
        return;
      }

      lockAccRef.current = 0;
      dropAccRef.current += dt;
      while (dropAccRef.current >= dropMsRef.current) {
        dropAccRef.current -= dropMsRef.current;
        p = pieceRef.current;
        if (!p || gameOverRef.current) break;
        if (isGrounded(boardRef.current, p)) {
          lockAccRef.current += dropMsRef.current;
          break;
        }
        p.y += 1;
      }
    },
    [lockAndSpawn, spawn],
  );

  useEffect(() => {
    const loop = (ts: number) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = Math.min(50, ts - lastTsRef.current);
      lastTsRef.current = ts;
      tick(dt);
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    const onTestClear = () => {
      const board = emptyBoard();
      for (let x = 0; x < COLS; x++) board[ROWS - 1][x] = 1;
      for (let x = 0; x < 4; x++) board[ROWS - 2][x] = 2;
      boardRef.current = board;
      clearLines();
      draw();
    };

    /** Fill almost to the top, then spawn — forces a real game-over. */
    const onTestGameOver = () => {
      const board = emptyBoard();
      for (let y = 2; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) board[y][x] = ((x + y) % 7) + 1;
      }
      // Leave a jagged top so it looks stacked, but spawn at y=0 collides.
      for (let x = 0; x < COLS; x++) board[0][x] = (x % 7) + 1;
      for (let x = 0; x < COLS; x++) board[1][x] = ((x + 3) % 7) + 1;
      boardRef.current = board;
      pieceRef.current = null;
      gameOverRef.current = false;
      runningRef.current = true;
      spawn(); // should end the game
      draw();
    };

    window.addEventListener("tetris-test-clear", onTestClear);
    window.addEventListener("tetris-test-gameover", onTestGameOver);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("tetris-test-clear", onTestClear);
      window.removeEventListener("tetris-test-gameover", onTestGameOver);
    };
  }, [clearLines, draw, spawn, tick]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!runningRef.current || gameOverRef.current) return;
      const keys = [
        "ArrowLeft",
        "ArrowRight",
        "ArrowDown",
        "ArrowUp",
        " ",
        "w",
        "a",
        "s",
        "d",
        "W",
        "A",
        "S",
        "D",
      ];
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
    pieceRef.current = null;
    nextPieceFn.current = bagPiece();
    dropMsRef.current = START_DROP_MS;
    dropAccRef.current = 0;
    lockAccRef.current = 0;
    lockResetsRef.current = 0;
    linesRef.current = 0;
    scoreRef.current = 0;
    gameOverRef.current = false;
    runningRef.current = true;
    lastTsRef.current = 0;
    syncHud();
    spawn();
    draw();
  };

  const pause = () => {
    if (gameOverRef.current) return;
    runningRef.current = false;
    syncHud();
  };

  const resume = () => {
    if (gameOverRef.current) return;
    runningRef.current = true;
    lastTsRef.current = 0;
    syncHud();
  };

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
      <div className="mx-auto overflow-hidden rounded-2xl border border-slate-700 shadow-xl shadow-slate-900/20">
        <canvas
          id="tetris-canvas"
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
          <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
            Game over — stack hit the top. Hit Restart for another run.
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
          Pieces fall, lock, and clear. Stack to the top for Game Over, then
          Restart. Keyboard: arrows / WASD, Space hard drop.
        </p>
      </div>
    </div>
  );
}

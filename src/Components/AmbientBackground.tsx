export default function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#fbfdff]" />
      <div
        className="blob blob-a top-[-12%] left-[-8%] h-[42vmin] w-[42vmin] opacity-70"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #93c5fd 0%, #bfdbfe 45%, transparent 70%)",
        }}
      />
      <div
        className="blob blob-b top-[18%] right-[-10%] h-[48vmin] w-[48vmin] opacity-55"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, #c4b5fd 0%, #ddd6fe 40%, transparent 72%)",
        }}
      />
      <div
        className="blob blob-c bottom-[-8%] left-[22%] h-[40vmin] w-[40vmin] opacity-50"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #7dd3fc 0%, #e0e7ff 50%, transparent 75%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.28) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        }}
      />
    </div>
  );
}

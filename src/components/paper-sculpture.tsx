"use client";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { RotateCcw } from "lucide-react";
export default function PaperSculpture() {
  const [form, setForm] = useState(0);
  const sculptureRef = useRef<HTMLDivElement>(null);
  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    sculptureRef.current?.style.setProperty(
      "--tilt-x",
      `${((event.clientY - rect.top) / rect.height - 0.5) * -30}deg`,
    );
    sculptureRef.current?.style.setProperty(
      "--tilt-y",
      `${((event.clientX - rect.left) / rect.width - 0.5) * 36}deg`,
    );
  }
  function resetTilt() {
    sculptureRef.current?.style.setProperty("--tilt-x", "0deg");
    sculptureRef.current?.style.setProperty("--tilt-y", "0deg");
  }
  return (
    <div
      className={`sculpture-panel form-${form}`}
      onPointerMove={tilt}
      onPointerLeave={resetTilt}
    >
      <div className="sculpture-caption">
        <span className="eyebrow">Objects in motion</span>
        <span className="eyebrow">0{form + 1} / 03</span>
      </div>
      <div className="sculpture-scene" aria-hidden="true">
        <div className="sculpture-shadow" />
        <div ref={sculptureRef} className="paper-object">
          <div className="kinetic-spin">
            {Array.from({ length: 26 }, (_, index) => (
              <span
                className="paper-leaf"
                key={index}
                style={{ "--leaf": index } as CSSProperties}
              />
            ))}
          </div>
        </div>
        <div className="art-cross art-cross-top">+</div>
        <div className="art-cross art-cross-bottom">+</div>
      </div>
      <div className="sculpture-bottom">
        <span>Go on. Break the loop.</span>
        <button
          className="reshape-button"
          type="button"
          onClick={() => setForm((form + 1) % 3)}
          aria-label="Change the kinetic sculpture"
        >
          <RotateCcw size={17} /> Remix
        </button>
      </div>
      <span className="sr-only" role="status">
        Kinetic sculpture form {form + 1} of 3
      </span>
    </div>
  );
}

/**
 * One animation frame loop for every scroll-driven element on a page. All layout
 * reads run before any style writes, which avoids forced reflows between scenes.
 */
export interface ScrollTickerTask {
  /** Reads layout. Returns true while the task still needs another frame. */
  readonly read: (deltaSeconds: number) => boolean;
  readonly write: () => void;
}

const tasks = new Set<ScrollTickerTask>();
let frame: number | null = null;
let lastTime = 0;
let listening = false;

function tick(time: number): void {
  frame = null;
  // A long gap means the tab slept, so damping must not treat it as one huge step
  const delta =
    lastTime === 0 ? 1 / 60 : Math.min((time - lastTime) / 1000, 0.1);
  lastTime = time;
  let again = false;
  for (const task of tasks) {
    if (task.read(delta)) again = true;
  }
  for (const task of tasks) task.write();
  if (again) {
    frame = window.requestAnimationFrame(tick);
  } else {
    lastTime = 0;
  }
}

function wake(): void {
  if (frame === null) frame = window.requestAnimationFrame(tick);
}

export function addScrollTask(task: ScrollTickerTask): () => void {
  tasks.add(task);
  if (!listening) {
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake);
    listening = true;
  }
  wake();
  return () => {
    tasks.delete(task);
    if (tasks.size === 0) {
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
      listening = false;
    }
  };
}

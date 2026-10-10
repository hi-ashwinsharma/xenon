import type { ToastItem, ToastOptions, ToastTone } from "./toast.types";

let counter = 0;

function createToastId(): string {
  counter += 1;
  return `x-toast-${Date.now()}-${counter}`;
}

export type ToastSubscriber = (toasts: ToastItem[]) => void;

class ToastStore {
  private toasts: ToastItem[] = [];
  private listeners: Set<ToastSubscriber> = new Set();
  private maxToasts = 5;

  public subscribe = (listener: ToastSubscriber): (() => void) => {
    this.listeners.add(listener);
    listener([...this.toasts]);
    return () => {
      this.listeners.delete(listener);
    };
  };

  public getToasts = (): ToastItem[] => {
    return [...this.toasts];
  };

  public setMaxToasts = (max: number): void => {
    this.maxToasts = max;
  };

  private notify = (): void => {
    const snapshot = [...this.toasts];
    for (const listener of this.listeners) {
      listener(snapshot);
    }
  };

  public show = (options: ToastOptions | string): string => {
    const id = createToastId();
    const item: ToastItem =
      typeof options === "string"
        ? { id, title: options, tone: "neutral", durationMs: 4000 }
        : {
            id,
            durationMs: 4000,
            tone: "neutral",
            ...options,
          };

    // Add to stack, limit to maxToasts
    this.toasts = [...this.toasts, item];
    if (this.toasts.length > this.maxToasts) {
      this.toasts = this.toasts.slice(this.toasts.length - this.maxToasts);
    }

    this.notify();
    return id;
  };

  public success = (title: string, options?: Partial<ToastOptions>): string => {
    return this.show({
      title,
      tone: "success",
      ...options,
    });
  };

  public error = (title: string, options?: Partial<ToastOptions>): string => {
    return this.show({
      title,
      tone: "danger",
      ...options,
    });
  };

  public info = (title: string, options?: Partial<ToastOptions>): string => {
    return this.show({
      title,
      tone: "info",
      ...options,
    });
  };

  public warning = (title: string, options?: Partial<ToastOptions>): string => {
    return this.show({
      title,
      tone: "warning",
      ...options,
    });
  };

  public dismiss = (id: string): void => {
    const existing = this.toasts.find((t) => t.id === id);
    if (existing) {
      existing.onDismiss?.();
      this.toasts = this.toasts.filter((t) => t.id !== id);
      this.notify();
    }
  };

  public clear = (): void => {
    this.toasts = [];
    this.notify();
  };
}

export const toast = new ToastStore();

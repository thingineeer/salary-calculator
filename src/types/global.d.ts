export {};

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

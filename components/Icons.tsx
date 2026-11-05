type P = { size?: number };
const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  "aria-hidden": true as const,
});

export const SearchIcon = ({ size = 20 }: P) => (
  <svg {...base(size)}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
);
export const BagIcon = ({ size = 20 }: P) => (
  <svg {...base(size)}><path d="M5 8h14l-1 13H6L5 8z" /><path d="M9 8V6a3 3 0 016 0v2" /></svg>
);
export const MenuIcon = ({ size = 22 }: P) => (
  <svg {...base(size)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const CloseIcon = ({ size = 22 }: P) => (
  <svg {...base(size)}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const TruckIcon = ({ size = 28 }: P) => (
  <svg {...base(size)} strokeWidth={1.4}><path d="M2 7h11v9H2zM13 10h4l3 3v3h-7" /><circle cx="6" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>
);
export const ShieldIcon = ({ size = 28 }: P) => (
  <svg {...base(size)} strokeWidth={1.4}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></svg>
);
export const HangerIcon = ({ size = 28 }: P) => (
  <svg {...base(size)} strokeWidth={1.4}><path d="M12 7a2 2 0 112-2M12 7v2L3 16h18l-9-7" /></svg>
);
export const CalendarIcon = ({ size = 18 }: P) => (
  <svg {...base(size)}><rect x="3.5" y="5" width="17" height="15.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg>
);
export const ChatIcon = ({ size = 18 }: P) => (
  <svg {...base(size)}><path d="M4 20l1.3-3.8A8 8 0 1112 20a8 8 0 01-3.9-1L4 20z" /></svg>
);
export const PinIcon = ({ size = 18 }: P) => (
  <svg {...base(size)}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
export const LockIcon = ({ size = 16 }: P) => (
  <svg {...base(size)}><rect x="5" y="11" width="14" height="10" /><path d="M8 11V8a4 4 0 018 0v3" /></svg>
);
export const SwapIcon = ({ size = 18 }: P) => (
  <svg {...base(size)}><path d="M4 12a8 8 0 0114-5M20 12a8 8 0 01-14 5M18 3v4h-4M6 21v-4h4" /></svg>
);
export const ArrowLeft = ({ size = 18 }: P) => (
  <svg {...base(size)}><path d="M15 6l-6 6 6 6" /></svg>
);
export const ArrowRight = ({ size = 18 }: P) => (
  <svg {...base(size)}><path d="M9 6l6 6-6 6" /></svg>
);
export const ClockIcon = ({ size = 18 }: P) => (
  <svg {...base(size)}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
);
export const InstagramIcon = ({ size = 18 }: P) => (
  <svg {...base(size)}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" /></svg>
);

import styles from "./theme.module.css";

const WC_GLOBAL_STYLES = `
@font-face {
  font-family: 'Clash Display';
  src: url('/fonts/webinar-claude/ClashDisplay-Variable.ttf') format('truetype');
  font-weight: 200 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Satoshi';
  src: url('/fonts/webinar-claude/Satoshi-Variable.ttf') format('truetype');
  font-weight: 300 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Satoshi';
  src: url('/fonts/webinar-claude/Satoshi-VariableItalic.ttf') format('truetype');
  font-weight: 300 900;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'Playfair Display';
  src: url('/fonts/webinar-claude/PlayfairDisplay-Variable.ttf') format('truetype');
  font-weight: 400 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Playfair Display';
  src: url('/fonts/webinar-claude/PlayfairDisplay-Italic-Variable.ttf') format('truetype');
  font-weight: 400 900;
  font-style: italic;
  font-display: swap;
}
@keyframes badge-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}
@keyframes btn-pulse {
  0%   { box-shadow: 0 4px 20px rgba(235,122,46,.35), 0 0 0 0 rgba(235,122,46,0.45); }
  70%  { box-shadow: 0 4px 20px rgba(235,122,46,.35), 0 0 0 14px rgba(235,122,46,0); }
  100% { box-shadow: 0 4px 20px rgba(235,122,46,.35), 0 0 0 0 rgba(235,122,46,0); }
}
@keyframes btn-pulse-lime {
  0%   { box-shadow: 0 4px 20px rgba(181,240,58,.40), 0 0 0 0 rgba(181,240,58,0.50); }
  70%  { box-shadow: 0 4px 20px rgba(181,240,58,.40), 0 0 0 14px rgba(181,240,58,0); }
  100% { box-shadow: 0 4px 20px rgba(181,240,58,.40), 0 0 0 0 rgba(181,240,58,0); }
}
@keyframes reveal-in {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
`;

type Theme = "default" | "bootcamp";

export default function WcThemeProvider({
  children,
  theme = "default",
}: {
  children: React.ReactNode;
  theme?: Theme;
}) {
  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: WC_GLOBAL_STYLES }} />
      <div className={styles.page} data-theme={theme}>{children}</div>
    </>
  );
}

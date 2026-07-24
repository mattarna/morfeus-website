/** Il segno Morfeus (le 3 lame), riusato in nav e badge. */
export function PlaygroundMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1000 476"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M272.687 475.431H39.6926C13.2842 319.502 0 160.771 0 0H229.433C229.433 161.011 243.877 319.782 272.687 475.431Z" />
      <path d="M661.455 475.431H384.888C304.862 331.666 262.289 169.094 262.289 0H491.721C491.721 175.416 551.5 341.669 661.415 475.431H661.455Z" />
      <path d="M1000 245.798V475.231C737.917 475.231 524.769 262.043 524.769 0H754.202C754.202 135.523 864.477 245.798 1000 245.798Z" />
    </svg>
  );
}

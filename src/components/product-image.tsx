interface ProductImageProps {
  name: string;
  className?: string;
}

/**
 * Placeholder component for product images.
 * Replace the inner content with <Image> from next/image
 * once real product photos are added to /public/images/.
 */
export function ProductImage({ name, className = "" }: ProductImageProps) {
  return (
    <div
      className={`bg-surface-alt rounded-lg flex items-center justify-center text-text-muted text-sm ${className}`}
      role="img"
      aria-label={name}
    >
      <div className="text-center p-4">
        <svg
          className="w-12 h-12 mx-auto mb-2 text-border"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        <span className="block text-xs">{name}</span>
      </div>
    </div>
  );
}

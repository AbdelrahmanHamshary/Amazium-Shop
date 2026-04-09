import { Star } from 'lucide-react';

export default function StarRating({ rating, size = 16, interactive, onChange }: {
  rating: number;
  size?: number;
  interactive?: boolean;
  onChange?: (r: number) => void;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = rating >= star - 0.5 && rating < star;
        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => onChange?.(star)}
            className={interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}
          >
            <Star
              size={size}
              className={`${filled ? 'text-amazon-star fill-amazon-star' : half ? 'text-amazon-star fill-amazon-star/50' : 'text-gray-300'} transition-colors`}
            />
          </button>
        );
      })}
    </div>
  );
}

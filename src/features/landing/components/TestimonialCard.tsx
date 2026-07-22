import { FC, ReactElement } from "react";
import { Star } from "lucide-react";

export interface TestimonialItem {
  name: string;
  role: string;
  initials: string;
  quote: string;
}

interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

export const TestimonialCard: FC<TestimonialCardProps> = ({
  testimonial,
}): ReactElement => {
  return (
    <div className="border border-muted bg-chart-1/5 p-6 rounded-2xl flex flex-col justify-between">
      <div>
        <div className="flex gap-0.5 text-amber-400 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="h-4 w-4 fill-current" />
          ))}
        </div>

        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-3 pt-6 border-t border-muted mt-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-background font-bold text-xs select-none">
          {testimonial.initials}
        </div>
        <div>
          <p className="text-xs font-bold text-foreground">
            {testimonial.name}
          </p>
          <p className="text-xxxs text-muted-foreground font-medium">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
};

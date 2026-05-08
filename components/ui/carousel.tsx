"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";

import { cn } from "@/lib/utils";

type CarouselApi = UseEmblaCarouselType[1];

type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
  opts?: Parameters<typeof useEmblaCarousel>[0];
  orientation?: "horizontal" | "vertical";
};

const CarouselContext = React.createContext<{
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: CarouselApi;
  scrollPrev: () => void;
  scrollNext: () => void;
} | null>(null);

export function Carousel({
                           opts,
                           className,
                           children,
                           ...props
                         }: CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel({
    ...opts,
  });

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return (
      <CarouselContext.Provider value={{ carouselRef, api, scrollPrev, scrollNext }}>
        <div className={cn("relative", className)} {...props}>
          {children}
        </div>
      </CarouselContext.Provider>
  );
}

export function CarouselContent({
                                  className,
                                  ...props
                                }: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(CarouselContext);

  return (
      <div className="overflow-hidden">
        <div
            ref={context?.carouselRef}
            className={cn("flex -ml-4", className)}
            {...props}
        />
      </div>
  );
}

export function CarouselItem({
                               className,
                               ...props
                             }: React.HTMLAttributes<HTMLDivElement>) {
  return (
      <div className={cn("min-w-0 shrink-0 grow-0 pl-4", className)} {...props} />
  );
}

export function CarouselPrevious({
                                   className,
                                   ...props
                                 }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(CarouselContext);

  return (
      <button
          onClick={context?.scrollPrev}
          className={cn(
              "absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2",
              className
          )}
          {...props}
      >
        ◀
      </button>
  );
}

export function CarouselNext({
                               className,
                               ...props
                             }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(CarouselContext);

  return (
      <button
          onClick={context?.scrollNext}
          className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2",
              className
          )}
          {...props}
      >
        ▶
      </button>
  );
}
"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";

import { Product } from "@/services/product/productService";
import CustomButton from "@/components/shared/custom-button";
import ProductCard from "@/components/shared/ProductCard/ProductCard";

// ─── Skeleton Card ─────────────────────────────
function ProductSkeleton() {
    return (
        <div className="bg-white rounded-2xl p-3 animate-pulse flex flex-col gap-3">
            <div className="w-full h-[160px] bg-gray-200 rounded-xl" />
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
            <div className="h-10 w-full bg-gray-200 rounded-xl mt-2" />
        </div>
    );
}

// ─── Countdown ─────────────────────────────
const Countdown: React.FC<{ initialSeconds: number }> = ({
                                                             initialSeconds,
                                                         }) => {
    const [totalSeconds, setTotalSeconds] = React.useState(initialSeconds);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setTotalSeconds((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    return (
        <div className="flex flex-row-reverse justify-center items-center gap-2">
            {[h, m, s].map((t, i) => (
                <React.Fragment key={i}>
                    <div className="w-[50px] h-[50px] bg-white border flex items-center justify-center rounded-lg font-bold text-lg tabular-nums">
                        {String(t).padStart(2, "0")}
                    </div>
                    {i !== 2 && <span className="font-bold text-lg">:</span>}
                </React.Fragment>
            ))}
        </div>
    );
};

// ─── Props ─────────────────────────────
interface Props {
    products: Product[];
    offerTitle: string;
    offerSubtitle: string;
    countdownTime: {
        hours: number;
        minutes: number;
        seconds: number;
    };
    loading?: boolean; // 👈 NEW
}

// ─── Component ─────────────────────────────
const SpecialOfferSection: React.FC<Props> = ({
                                                  products,
                                                  offerTitle,
                                                  offerSubtitle,
                                                  countdownTime,
                                                  loading = false,
                                              }) => {
    const initialSeconds = useRef(
        countdownTime.hours * 3600 +
        countdownTime.minutes * 60 +
        countdownTime.seconds
    ).current;

    return (
        <section className="w-full bg-[#E4F1E8] rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-6">

            {/* LEFT */}
            <div className="w-full md:w-[20%] shrink-0 flex flex-col justify-center gap-4">
                <div className="text-[#51A46B] text-[14px] md:text-[16px] font-semibold">
                    {offerTitle}
                </div>

                <div className="flex gap-2">
                    <span className="text-lg md:text-xl font-bold">
                        {offerSubtitle}
                    </span>
                    <span className="text-lg md:text-xl text-[#51A46B] font-bold">
                        کلم
                    </span>
                </div>

                <Countdown initialSeconds={initialSeconds} />

                <CustomButton
                    label="مشاهده همه"
                    variant="greenOutline"
                    href="/products"
                />
            </div>

            {/* SWIPER */}
            <div className="flex-1 overflow-hidden min-w-0">
                <Swiper
                    spaceBetween={16}
                    slidesPerView={1.1}
                    breakpoints={{
                        768: { slidesPerView: 2.2 },
                        1024: { slidesPerView: 3.5 },
                    }}
                    className="w-full"
                >
                    {loading
                        ? Array.from({ length: 4 }).map((_, i) => (
                            <SwiperSlide key={i}>
                                <ProductSkeleton />
                            </SwiperSlide>
                        ))
                        : products.map((product) => (
                            <SwiperSlide key={product.id}>
                                <div className="py-2">
                                    <ProductCard
                                        id={product.id}
                                        imageUrl={product.imageUrl}
                                        productName={product.productName}
                                        unit={product.unit}
                                        price={product.price}
                                        addToCartHandler={() =>
                                            console.log(product.id)
                                        }
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </section>
    );
};

export default SpecialOfferSection;
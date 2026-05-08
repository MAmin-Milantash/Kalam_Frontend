"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import ProductCard from "@/components/shared/ProductCard/ProductCard";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Category {
    id: number;
    title: string;
    description: string;
    image: string;
    bgColor?: string;
    borderColor?: string;
}

export interface Product {
    id: string;
    imageUrl: string;
    productName: string;
    unit: string;
    price: number;
    categoryId?: number;
}

// ─── Sample Categories ───────────────────────────────────────────────────────

const sampleCategories: Category[] = [
    {
        id: 1,
        title: "میوه",
        description: "میوه‌هایی که هر روزتان را رنگارنگ می‌کنند.",
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCKYey1jZCIVi3Y_BVPBt6ddOE44oECyb35g&s",
        bgColor: "#FDE5B7",
        borderColor: "#F5B129",
    },
    {
        id: 2,
        title: "سبزیجات",
        description: "سبزیجات سبز، سفره‌ی شما را پرطراوت می‌کند.",
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn4eZKtFtNq6ixwslUcizt995kdw-rNONwLA&s",
        bgColor: "#D6E0D6",
        borderColor: "#8BA78B",
    },
    {
        id: 3,
        title: "صیفی جات",
        description: "صیفی‌جات تازه، راز آشپزی سالم و خوشمزه شما هستند.",
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-AjgmBYW3FVZeItYsRg4RjvrJYv78PgtjQQ&s",
        bgColor: "#EFDCE1",
        borderColor: "#BF7387",
    },
];

// ─── Sample Products ──────────────────────────────────────────────────────────

const IMAGE_FRUIT =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpvsLi4TWju6HLe8u2kfmk7kfRyLR1kVFR5g&s";

const IMAGE_VEGETABLE =
    "https://118mashaghel.com/Media/ContentPics/46.jpg";

const IMAGE_TOMATO =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj09c6T7Vo74LR48Kc8RPMSV2f3XuVQD0z_Q&s";

export const allProducts: Product[] = [
    // ─────────────────────────────
    // 🍓 CATEGORY 1 - FRUITS (20 items)
    // ─────────────────────────────
    ...Array.from({ length: 20 }).map((_, i) => ({
        id: `1-${i + 1}`,
        categoryId: 1,
        imageUrl: IMAGE_FRUIT,
        productName: [
            "توت فرنگی",
            "آناناس",
            "آووکادو",
            "گیلاس",
            "موز",
            "سیب",
            "انگور",
            "هلو",
            "خرمالو",
            "لیمو",
            "پرتقال",
            "بلوبری",
            "تمشک",
            "انبه",
            "طالبی",
            "هندوانه",
            "خربزه",
            "کیوی",
            "نارنگی",
            "گلابی",
        ][i],
        unit: "هر کیلو",
        price: 30000 + i * 5000,
    })),

    // ─────────────────────────────
    // 🥬 CATEGORY 2 - VEGETABLES (20 items)
    // ─────────────────────────────
    ...Array.from({ length: 20 }).map((_, i) => ({
        id: `2-${i + 1}`,
        categoryId: 2,
        imageUrl: IMAGE_VEGETABLE,
        productName: [
            "کاهو",
            "ریحان",
            "جعفری",
            "گشنیز",
            "اسفناج",
            "تره",
            "شوید",
            "نعناع",
            "پیازچه",
            "هویج",
            "سیب زمینی",
            "کلم",
            "بروکلی",
            "گل کلم",
            "چغندر",
            "سیر",
            "پیاز",
            "کدو",
            "لوبیا سبز",
            "کرفس",
        ][i],
        unit: "هر بسته",
        price: 12000 + i * 1500,
    })),

    // ─────────────────────────────
    // 🍅 CATEGORY 3 - VEGETABLE FRUITS (20 items)
    // ─────────────────────────────
    ...Array.from({ length: 20 }).map((_, i) => ({
        id: `3-${i + 1}`,
        categoryId: 3,
        imageUrl: IMAGE_TOMATO,
        productName: [
            "گوجه فرنگی",
            "خیار",
            "بادمجان",
            "فلفل دلمه",
            "کدو سبز",
            "کدو حلوایی",
            "ذرت",
            "گوجه گیلاسی",
            "پیاز سفید",
            "سیب زمینی",
            "فلفل قرمز",
            "کدو دلمه",
            "کلم قمری",
            "هندوانه",
            "خربزه",
            "طالبی",
            "کدو خورشتی",
            "قارچ",
            "تره فرنگی",
            "شلغم",
        ][i],
        unit: "هر کیلو",
        price: 15000 + i * 1800,
    })),
];
// ─── Services ─────────────────────────────────────────────────────────────────

export const categoryService = {
    async getAllCategories(): Promise<Category[]> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(sampleCategories), 300);
        });
    },
};

const PAGE_SIZE = 12;

export const productService = {
    async getProductsByCategoryId(
        categoryId: number,
        page: number = 1
    ): Promise<{ items: Product[]; hasMore: boolean }> {
        return new Promise((resolve) => {
            const filtered = allProducts.filter(
                (p) => p.categoryId === categoryId
            );

            const start = (page - 1) * PAGE_SIZE;

            const items = filtered.slice(
                start,
                start + PAGE_SIZE
            );

            const hasMore =
                start + PAGE_SIZE < filtered.length;

            setTimeout(
                () => resolve({ items, hasMore }),
                300
            );
        });
    },
};

// ─── Skeleton Card ────────────────────────────────────────────────────────────

function SkeletonCard() {
    return (
        <div
            className="
                bg-white
                border
                border-[#E9E8E3]
                rounded-[14px]
                p-2
                sm:p-4
                animate-pulse
                w-full
                min-w-0
            "
        >
            <div className="w-full aspect-square bg-gray-100 rounded-[10px]" />

            <div className="mt-3 h-3 bg-gray-100 rounded w-[70%]" />

            <div className="mt-2 h-3 bg-gray-100 rounded w-[40%]" />

            <div className="mt-4 h-5 bg-gray-100 rounded w-[60%]" />
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProductListByCategory() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategoryId, setActiveCategoryId] =
        useState<number | null>(null);

    const cache = useRef<
        Record<
            number,
            {
                page: number;
                items: Product[];
                hasMore: boolean;
            }
        >
    >({});

    const [displayedProducts, setDisplayedProducts] =
        useState<Product[]>([]);

    const [hasMore, setHasMore] = useState(false);

    const [loadingProducts, setLoadingProducts] =
        useState(false);

    const [loadingMore, setLoadingMore] =
        useState(false);

    const [catLoading, setCatLoading] =
        useState(true);

    // ─── Load Categories ─────────────────────────────────────────────────────

    useEffect(() => {
        categoryService
            .getAllCategories()
            .then((cats) => {
                setCategories(cats);

                if (cats.length > 0) {
                    setActiveCategoryId(cats[0].id);
                }

                setCatLoading(false);
            });
    }, []);

    // ─── Load Products ───────────────────────────────────────────────────────

    useEffect(() => {
        if (activeCategoryId === null) return;

        if (cache.current[activeCategoryId]) {
            const cached =
                cache.current[activeCategoryId];

            setDisplayedProducts(cached.items);
            setHasMore(cached.hasMore);

            return;
        }

        setLoadingProducts(true);

        productService
            .getProductsByCategoryId(
                activeCategoryId,
                1
            )
            .then(({ items, hasMore }) => {
                cache.current[activeCategoryId] = {
                    page: 1,
                    items,
                    hasMore,
                };

                setDisplayedProducts(items);
                setHasMore(hasMore);
                setLoadingProducts(false);
            });
    }, [activeCategoryId]);

    // ─── Load More ───────────────────────────────────────────────────────────

    const handleLoadMore = useCallback(async () => {
        if (
            !activeCategoryId ||
            loadingMore ||
            !hasMore
        )
            return;

        setLoadingMore(true);

        const current =
            cache.current[activeCategoryId];

        const nextPage =
            (current?.page ?? 1) + 1;

        const {
            items,
            hasMore: moreLeft,
        } = await productService.getProductsByCategoryId(
            activeCategoryId,
            nextPage
        );

        const merged = [
            ...(current?.items ?? []),
            ...items,
        ];

        cache.current[activeCategoryId] = {
            page: nextPage,
            items: merged,
            hasMore: moreLeft,
        };

        setDisplayedProducts(merged);
        setHasMore(moreLeft);
        setLoadingMore(false);
    }, [activeCategoryId, loadingMore, hasMore]);

    // ─── UI ──────────────────────────────────────────────────────────────────

    return (
        <section
            className="
                w-full
                max-w-6xl
                mx-auto
                px-[8px]
                sm:px-4
                py-8
                overflow-x-hidden
            "
            dir="rtl"
        >
            <h2
                className="
                    text-center
                    text-[20px]
                    sm:text-2xl
                    font-bold
                    text-gray-800
                    mb-6
                "
            >
                محصولات
            </h2>

            {/* Categories */}

            {catLoading ? (
                <div className="flex justify-center gap-2 mb-8">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="
                                h-8
                                w-20
                                bg-gray-100
                                rounded-full
                                animate-pulse
                            "
                        />
                    ))}
                </div>
            ) : (
                <div
                    className="
                        flex
                        justify-center
                        gap-2
                        mb-8
                        flex-wrap
                    "
                >
                    {categories.map((cat) => {
                        const isActive =
                            cat.id === activeCategoryId;

                        return (
                            <button
                                key={cat.id}
                                onClick={() =>
                                    setActiveCategoryId(cat.id)
                                }
                                className="
                                    px-4
                                    sm:px-5
                                    py-2
                                    rounded-full
                                    text-[12px]
                                    sm:text-sm
                                    font-medium
                                    transition-all
                                    duration-200
                                    border
                                "
                                style={{
                                    backgroundColor:
                                        isActive
                                            ? cat.borderColor ??
                                            "#22C55E"
                                            : "transparent",

                                    borderColor:
                                        isActive
                                            ? cat.borderColor ??
                                            "#22C55E"
                                            : "#E9E8E3",

                                    color: isActive
                                        ? "#fff"
                                        : "#4B5563",
                                }}
                            >
                                {cat.title}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Products */}

            {loadingProducts ? (
                <div
                    className="
                        grid
                        grid-cols-2
                        lg:grid-cols-4
                        gap-x-[5px]
                        gap-y-[7px]
                        w-full
                    "
                >
                    {Array.from({ length: 12 }).map(
                        (_, i) => (
                            <SkeletonCard key={i} />
                        )
                    )}
                </div>
            ) : displayedProducts.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                    محصولی یافت نشد
                </div>
            ) : (
                <div
                    className="
                        grid
                        grid-cols-2
                        lg:grid-cols-4
                        gap-x-[5px]
                        gap-y-[7px]
                        w-full
                    "
                >
                    {displayedProducts.map(
                        (product) => (
                            <div
                                key={product.id}
                                className="
                                    w-full
                                    min-w-0
                                    scale-[0.95]
                                    sm:scale-100
                                "
                            >
                                <ProductCard
                                    id={product.id}
                                    imageUrl={
                                        product.imageUrl
                                    }
                                    productName={
                                        product.productName
                                    }
                                    unit={product.unit}
                                    price={product.price}
                                    addToCartHandler={() => {
                                        console.log(
                                            "add to cart:",
                                            product.id
                                        );
                                    }}
                                />
                            </div>
                        )
                    )}
                </div>
            )}

            {/* Load More */}

            {hasMore && !loadingProducts && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className="
                            px-6
                            sm:px-8
                            py-2.5
                            rounded-full
                            border
                            border-[#22C55E]
                            text-[#22C55E]
                            text-[13px]
                            sm:text-sm
                            font-medium
                            hover:bg-green-50
                            transition-colors
                            disabled:opacity-50
                        "
                    >
                        {loadingMore
                            ? "در حال بارگذاری..."
                            : "نمایش بیشتر ..."}
                    </button>
                </div>
            )}
        </section>
    );
}
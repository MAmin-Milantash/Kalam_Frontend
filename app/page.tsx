import CategoryCard from "@/components/shared/CategoryCard/CategoryCard";
import Banner from "@/components/shared/banner/Banner";
import { productService, Product } from "@/services/product/productService";
import { Category, categoryService } from "@/services/category/categoryService";
import SpecialOfferSection from "@/components/shared/SpecialOfferSection/SpecialOfferSection";
import ProductListByCategory from "@/components/shared/productListBycategory/productListBycategory";

export default async function Page() {
    const initialCountdownTime = {
        hours: 8,
        minutes: 30,
        seconds: 54,
    };

    // Fetch both simultaneously
    const [products, categories]: [Product[], Category[]] = await Promise.all([
        productService.getAllProducts(),
        categoryService.getAllCategories(),
    ]);

    return (
        <main className="flex flex-col gap-8">
            <Banner />

            <div className="flex flex-col gap-4 text-right my-10">
                <h2 className="font-semibold text-[24px] text-center">
                    همه‌چیز برای آشپزی، مهمانی و زندگی روزمره‌
                </h2>

                <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                    {categories.map((item) => (
                        <CategoryCard
                            key={item.id}
                            id={item.id}
                            description={item.description}
                            image={item.image}
                            title={item.title}
                            bgColor={item.bgColor}
                            borderColor={item.borderColor}
                        />
                    ))}
                </div>
            </div>

            <SpecialOfferSection
                products={products}
                offerTitle="فروش ویژه"
                offerSubtitle="ویژه‌های امروز"
                countdownTime={initialCountdownTime}
            />

            <ProductListByCategory />
        </main>
    );
}
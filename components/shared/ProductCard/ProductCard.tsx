"use client";
import {Plus, ShoppingCart} from "lucide-react";
import CustomButton from "@/components/shared/custom-button";

type ProductCardProps = {
    id: string;
    imageUrl: string;
    productName: string;
    unit: string;
    price: number;
    addToCartHandler: () => void;
};

export default function ProductCard({
                                        id,
                                        imageUrl,
                                        productName,
                                        unit,
                                        price,
                                        addToCartHandler,
                                    }: ProductCardProps) {
    return (
        <div className="bg-white flex flex-col items-start justify-start
                       max-w-[280px] min-h-[280px] box-border border border-[#E9E8E3]
                       rounded-[20px]   p-[24px_24px_12px_24px] gap-[10px] relative"
             style={{opacity: 1, transform: 'rotate(0deg)'}}>
            <div className="md:w-[210px] w-[110px]  flex items-center justify-center overflow-hidden rounded-[10px] mx-auto"
                 style={{opacity: 1, transform: 'rotate(0deg)'}}>
                <img
                    src={imageUrl}
                    alt={productName}
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="w-full h-[1px] bg-[#E9E8E3] my-2" style={{opacity: 1}}></div>

            <div className="w-full flex items-center justify-between gap-2">
                <span className="md:text-base text-sm font-medium text-gray-800">{productName}</span>
                <div
                    className="flex items-center justify-center min-w-[60px] h-[30px] box-border
                               border border-[#E9E8E3]  rounded-[10px]
                               py-[6px] px-[12px] gap-[10px]" style={{opacity: 1, transform: 'rotate(0deg)'}}>
                    <span className="text-xs font-normal text-gray-600">{unit}</span>
                </div>
            </div>

            <div className="w-full h-[1px] bg-[#E9E8E3] my-2" style={{opacity: 1}}></div>

            <div className="w-full flex items-center justify-between mt-auto">
                <span className="md:text-xl text-sm font-bold text-gray-900">
                    {`${price.toLocaleString('fa-IR')} تومان`}
                </span>

                <CustomButton
                    label="افزودن"
                    variant="greenOutline"
                    icon={<Plus size={18} />}
                    onClick={addToCartHandler}
                    href={"product/" + id}
                    hideLabelOnMobile
                />
            </div>
        </div>
    );
}

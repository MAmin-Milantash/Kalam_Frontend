export interface Product {
    id: string;
    imageUrl: string;
    productName: string;
    unit: string;
    price: number;
}

export const specialOfferService = {
    async getRecommendedProducts(): Promise<Product[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        id: '1',
                        productName: "موز سبز",
                        unit: 'کیلو',
                        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQSnxjyviA44CJKHiXZrNb8AqKnJPj9jwIsg&s",
                        price: 12500
                    },
                    {
                        id: '2',
                        productName: "سیب قرمز",
                        unit: 'کیلو',
                        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCVGiAaTzQU-OZgmLf4j27ojfRdi03JM0Wxg&s",
                        price: 12500
                    },
                    {
                        id: '3',
                        productName: "گوجه فرنگی",
                        unit: 'کیلو',
                        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLV2r4Fv0RoxWhBEVMCksWsaXlold1dPoqYg&s",
                        price: 12500
                    },
                    {
                        id: '4',
                        productName: "خیار تازه",
                        unit: 'کیلو',
                        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoo-xwcJj_Uas6RQ_Aaa5pL4eE8mrhXXeNkQ&s",
                        price: 12500
                    },
                ]);
            }, 300);
        });
    },
};

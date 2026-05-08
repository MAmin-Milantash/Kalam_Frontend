import type { NextConfig } from "next";

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "encrypted-tbn0.gstatic.com",
            },
        ],
    },
};

export default nextConfig;

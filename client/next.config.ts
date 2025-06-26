// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//     /* config options here */
//     images: {
//         domains: ['localhost'],
//     },
// };

// export default nextConfig;
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '5080',
                pathname: '/uploads/**',
            },
        ],
    },
    // eslint: {
    //     ignoreDuringBuilds: true,
    // },
    // typescript: {
    //     ignoreBuildErrors: true,
    // },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "storage.googleapis.com",
                pathname: '/photo2code_codes/**'
            },
        ],
    }
};

export default nextConfig;

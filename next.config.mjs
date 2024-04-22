import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const BackendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const imagesBackend = new URL(BackendBaseUrl);

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
    trailingSlash: true,
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: imagesBackend.protocol.substring(0, imagesBackend.protocol.length - 1),
                hostname: imagesBackend.hostname,
                port: imagesBackend.port,
                pathname: '/media/**',
            },
            {
                protocol: 'http',
                hostname: imagesBackend.hostname,
                port: imagesBackend.port,
                pathname: '/media/**',
            },
        ],
    },
    env: {
        NEXT_PUBLIC_BACKEND_BASE_URL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    }
});

export default nextConfig;

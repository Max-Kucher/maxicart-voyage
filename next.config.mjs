import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const BackendBaseUrl = process.env?.BACKEND_BASE_URL?.length ? process.env.BACKEND_BASE_URL : 'http://80.89.230.106:81';
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
        ],
    },
});

export default nextConfig;

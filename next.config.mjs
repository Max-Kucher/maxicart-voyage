import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
    trailingSlash: true,
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '80.89.230.106',
                port: '8100',
                pathname: '/media/**',
            },
        ],
    },
});

export default nextConfig;

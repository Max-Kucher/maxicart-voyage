import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
    trailingSlash: true,
});

export default nextConfig;

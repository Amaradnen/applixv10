export default function sitemap() {
    const baseUrl = 'https://applix.digital';

    // Static routes
    const routes = [
        '',
        '/services',
        '/digital-products',
        '/saas-automation',
        '/academy',
        '/hub',
        '/templates',
        '/pricing',
        '/contact',
        '/cart',
        '/checkout',
        '/case-studies',
        '/blog',
        '/legal/privacy',
        '/legal/terms',
        '/legal/refund',
        '/legal/shipping',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}

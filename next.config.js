const path = require('path')

const ContentSecurityPolicy = require('./csp')
const redirects = require('./redirects')
const { withPayload } = require('@payloadcms/next-payload')

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'localhost',
      'picsum.photos',
      'fastly.picsum.photos',
      'images.unsplash.com',
      process.env.NEXT_PUBLIC_SERVER_URL,
    ]
      .filter(Boolean)
      .map(url => url.replace(/https?:\/\//, '')),
  },
  redirects,
  async headers() {
    const headers = []

    if (!process.env.NEXT_PUBLIC_IS_LIVE) {
      headers.push({
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
        source: '/:path*',
      })
    }

    headers.push({
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: ContentSecurityPolicy,
        },
      ],
    })

    return headers
  },
}

module.exports = async () => {
  return withPayload(nextConfig, {
    configPath: path.resolve(__dirname, './src/payload/payload.config.ts'),
    payloadPath: path.resolve(__dirname, './src/payload/payloadClient.ts'),
    adminRoute: '/admin',
  })
}

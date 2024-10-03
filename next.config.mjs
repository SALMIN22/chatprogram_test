/** @type {import('next').NextConfig} */
const nextConfig = {
  // React의 엄격 모드를 활성화합니다.
  // 이는 개발 중에 잠재적인 문제를 식별하는 데 도움이 됩니다.
  reactStrictMode: true,

  // 실험적 기능을 설정합니다.
  experimental: {
    // Next.js 13의 새로운 'app' 디렉토리 구조를 사용합니다.
    // 이를 통해 새로운 라우팅 시스템과 레이아웃 기능을 사용할 수 있습니다.
    appDir: true,
  },

  // URL 재작성 규칙을 정의합니다.
  async rewrites() {
    return [
      {
        // '/api/'로 시작하는 모든 요청에 대해
        source: '/api/:path*',
        // 동일한 경로로 요청을 전달합니다.
        // 이는 API 라우트가 정상적으로 작동하도록 보장합니다.
        destination: '/api/:path*',
      },
    ]
  },
}

// 설정을 내보냅니다.
export default nextConfig

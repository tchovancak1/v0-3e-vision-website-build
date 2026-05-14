/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/portfolio/vlastne-produkty",
        destination: "/#meracia-technika",
        permanent: true,
      },
    ]
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

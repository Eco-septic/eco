importScripts(
  `https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js`,
);

const { registerRoute } = workbox.routing;
const { StaleWhileRevalidate, NetworkOnly } = workbox.strategies;
const { ExpirationPlugin } = workbox.expiration;

registerRoute(
  ({ url }) => url.pathname.startsWith("/admin/"),
  new NetworkOnly(),
);

registerRoute(
  ({ request }) =>
    ["script", "style", "image", "document"].includes(request.destination),

  new StaleWhileRevalidate({
    cacheName: "image-cache",
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 12 * 60 * 60,
      }),
    ],
  }),
);

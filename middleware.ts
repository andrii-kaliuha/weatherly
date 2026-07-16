export const config = {
  matcher: "/",
};

const BOT_UA_REGEX = /bot|facebookexternalhit|telegrambot|twitterbot|linkedinbot|whatsapp|slackbot|discordbot/i;

export default async function middleware(request: Request) {
  const userAgent = request.headers.get("user-agent") || "";

  if (!BOT_UA_REGEX.test(userAgent)) {
    return new Response(null, {
      headers: {
        "x-middleware-next": "1",
      },
    });
  }

  const url = new URL(request.url);
  const lang = url.searchParams.get("lang") === "en" ? "en" : "uk";
  const theme = url.searchParams.get("theme") === "light" ? "light" : "dark";

  const indexUrl = new URL("/index.html", request.url);
  const response = await fetch(indexUrl);
  const html = await response.text();

  const ogImageUrl = `${url.origin}/api/og?lang=${lang}&theme=${theme}`;

  const title = lang === "uk" ? "Weatherly — погода будь-де" : "Weatherly";
  const description =
    lang === "uk" ?
      "Перевір поточну погоду, погодинний прогноз, якість повітря та більше."
    : "Check current weather, hourly forecasts, air quality, and more with Weatherly.";

  let injected = html
    .replace(/<meta\s+property=["']og:image["']\s+content=["'].*?["']\s*\/?>/is, `<meta property="og:image" content="${ogImageUrl}" />`)
    .replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/is, `<meta property="og:title" content="${title}" />`)
    .replace(
      /<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/is,
      `<meta property="og:description" content="${description}" />`,
    )
    .replace(/<meta\s+name=["']twitter:image["']\s+content=["'].*?["']\s*\/?>/is, `<meta name="twitter:image" content="${ogImageUrl}" />`)
    .replace(/<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/is, `<meta name="twitter:title" content="${title}" />`)
    .replace(
      /<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/is,
      `<meta name="twitter:description" content="${description}" />`,
    );

  return new Response(injected, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

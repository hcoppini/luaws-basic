// Vercel Edge Middleware: Dynamic Subdomain-to-Folder Router
export default function middleware(req) {
  const url = new URL(req.url);
  const hostname = req.headers.get('host') || '';

  // Only rewrite if we are on one of our configured custom domains with an actual subdomain
  const match = hostname.match(/^([^.]+)\.(preview\.luaws\.pl|luaws\.pl|smagiel\.pl)$/);
  
  if (match) {
    const subdomain = match[1].toLowerCase();
    
    // Ignore common subdomains or www
    if (subdomain !== 'www' && subdomain !== 'api') {
      if (!url.pathname.startsWith(`/${subdomain}`)) {
        url.pathname = `/${subdomain}${url.pathname}`;
        return new Response(null, {
          headers: {
            'x-middleware-rewrite': url.toString()
          }
        });
      }
    }
  }
}

// DEBUG MIDDLEWARE
export default function middleware(req) {
  return new Response("Hello from Middleware! Host: " + req.headers.get('host'), { 
    status: 200,
    headers: { 'Content-Type': 'text/plain' }
  });
}

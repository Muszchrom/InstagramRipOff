const dev = true

let sources = {
  host: 'https://api.EXAMPLE.com',
  imageNames: 'https://api.EXAMPLE.com/images/images/',
  imageFile: 'https://api.EXAMPLE.com/images/one/',
  login: 'https://api.EXAMPLE.com/auth/login',
  logout: 'https://api.EXAMPLE.com/auth/logout',
  verifyToken: 'https://api.EXAMPLE.com/auth/verify-token',
  clusters: 'https://api.EXAMPLE.com/images/clusters/',
}

if (dev) {
  sources = {
    host: 'http://localhost:5000',
    imageNames: 'http://localhost:5000/images/images/',
    imageFile: 'http://localhost:5000/images/one/',
    login: 'http://localhost:5000/auth/login',
    logout: 'http://localhost:5000/auth/logout',
    verifyToken: 'http://localhost:5000/auth/verify-token',
    clusters: 'http://localhost:5000/images/clusters/',
  }
}

export default sources

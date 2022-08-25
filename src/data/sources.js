const dev = true

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

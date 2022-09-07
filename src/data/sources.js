const dev = true

let sources = {
  host: 'https://api.karolserverlublinv1.com',
  imageNames: 'https://api.karolserverlublinv1.com/images/images/',
  imageFile: 'https://api.karolserverlublinv1.com/images/one/',
  login: 'https://api.karolserverlublinv1.com/auth/login',
  logout: 'https://api.karolserverlublinv1.com/auth/logout',
  verifyToken: 'https://api.karolserverlublinv1.com/auth/verify-token',
  clusters: 'https://api.karolserverlublinv1.com/images/clusters/',
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

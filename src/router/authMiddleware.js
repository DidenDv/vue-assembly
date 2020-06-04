function authMiddleware(to, from, next) {
  const isAuthenticated = true; // TODO Check auth
  if (to.name !== 'Auth' && !isAuthenticated) {
    return next({ name: 'Auth' });
  }

  if (to.name === 'Auth' && isAuthenticated) {
    return next({ path: '/' });
  }

  return next();
}

export default authMiddleware;

export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  PREMIUM: 'premium',
};

export const hasRole = (user, role) => {
  return user && user.roles && user.roles.includes(role);
};

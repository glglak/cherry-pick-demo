// User roles management

const roles = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest'
};

// Role permissions mapping
const permissions = {
  [roles.ADMIN]: ['read', 'write', 'delete', 'manage_users'],
  [roles.USER]: ['read', 'write'],
  [roles.GUEST]: ['read']
};

// Check if user has permission
function hasPermission(userRole, permission) {
  if (!roles[userRole]) {
    return false;
  }
  
  return permissions[userRole].includes(permission);
}

// Get all permissions for a role
function getRolePermissions(role) {
  return permissions[role] || [];
}

module.exports = {
  roles,
  permissions,
  hasPermission,
  getRolePermissions
};

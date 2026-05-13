// backend/src/services/auth.service.js
const authRepository = require('../repositories/auth.repository');
const bcrypt = require('bcrypt'); // Necesitarás instalarlo: npm install bcrypt

class AuthService {
  async login(username, password) {
    const user = await authRepository.findUserByUsername(username);
    
    if (!user) {
      // Lógica de "Crear si no existe" solo si la DB está vacía
      const userCount = await authRepository.countUsers();
      if (userCount === 0) {
        return { isFirstUser: true };
      }
      throw new Error('Usuario no encontrado');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Contraseña incorrecta');

    return { user };
  }

  async registerMaster(userData) {
    const userCount = await authRepository.countUsers();
    if (userCount > 0) throw new Error('El usuario master ya existe');

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const adminRolId = await authRepository.getAdminRoleId();

    return await authRepository.createUser({
      ...userData,
      password: hashedPassword,
      rol_id: adminRolId
    });
  }
}

module.exports = new AuthService();
const authService = require('../services/auth.service');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    
    if (result.isFirstUser) {
      return res.status(200).json({ firstRun: true, message: "No hay usuarios. Crea el Master." });
    }
    
    res.json({ message: "Login exitoso", user: result.user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const registerMaster = async (req, res) => {
  try {
    const user = await authService.registerMaster(req.body);
    res.status(201).json({ message: "Usuario Master creado", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Exportación clara y sencilla
module.exports = {
  login,
  registerMaster
};

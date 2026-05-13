const CategoriaRepository = require('../repositories/categoria.repository');

exports.getCategorias = async (req, res) => {
    try {
        const categorias = await CategoriaRepository.getAll();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createCategoria = async (req, res) => {
    try {
        const nueva = await CategoriaRepository.create(req.body);
        res.status(201).json(nueva);
    } catch (error) {
        res.status(400).json({ error: "El nombre de la categoría ya existe o es inválido" });
    }
};

// importar el modelo

const getProducts = async (req, res) => {
    try {
        // Aquí iría la lógica para obtener todos los productos de la base de datos
        res.json({ message: "Todos los productos obtenidos con éxito."});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        // Aquí iría la lógica para obtener un producto específico por su id
        res.json({ message: `Producto ${id} obtenido con éxito.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { body } = req;
        // Aquí iría la lógica para crear un nuevo producto con la información en `body`
        res.status(201).json({ message: "Producto creado con éxito.", product: body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        // Aquí iría la lógica para eliminar un producto por su id
        res.json({ message: `Producto ${id} eliminado con éxito.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const productsController = { getProducts, getProduct, createProduct, deleteProduct };
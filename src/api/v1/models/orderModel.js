import pool from "../../../../config/database/connection.js"


// Creación de la orden y luego crear el detalle
const createOrderDB = async (orderData) => {
  const { id_user, total_price, products } = orderData

  // Validación de total_price
  if (total_price <= 0) {
    throw new Error('El monto total debe ser mayor que cero.')
  }

  // Validación de products
  if (!Array.isArray(products) || products.length === 0) {
    throw new Error('La orden debe contener al menos un producto.')
  }
  products.forEach(product => {
    if (product.product_quantity <= 0) {
      throw new Error('La cantidad de cada producto debe ser mayor que cero.')
    }
  })

  try {
    await pool.query('BEGIN')
    // Creamos la orden y obtenemos el id_order generado
    const createOrder = await pool.query('INSERT INTO orders (id_user, total_price) VALUES ($1, $2) RETURNING id_order, purchase_date', [id_user, total_price]);
    const { id_order, purchase_date } = createOrder.rows[0];

    // Con el id_order obtenido, se inserta cada producto en order_details
    for (const product of products) {
      const { id_product, product_quantity } = product
      await pool.query('INSERT INTO orders_details (id_order, id_product, product_quantity) VALUES ($1, $2, $3)', [id_order, id_product, product_quantity])
    }
    await pool.query('COMMIT')
    return { id_order, id_user, total_price, products, purchase_date }
  } catch (error) {
    await pool.query('ROLLBACK') // Si no se crean los detalles, que deshaga todo
    throw error
  }
}




const getUserOrders = async (id) => {
  const { rows } = await pool.query('SELECT * FROM orders WHERE id_user = $1', [id])
  return rows[0]
}

export const orderModel = { createOrderDB, getUserOrders }


/*
::getOrder()

::getOrders()

request
id_user

response
[{
  "id_order": 1234,
  "id_user": 1,
  "total_price": 30000,
  "id_product": 1,
  "product_quantity": 1,
  "purchase_date": "2024-02-14T18:00:00.000Z"
}]
*/

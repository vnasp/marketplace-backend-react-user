import { orderModel } from "../models/orderModel.js"

const createOrder = async (req, res) => {
  try {
    const id_user = req.auth.id_user
    const orderData = { ...req.body, id_user }
    const order = await orderModel.createOrderDB(orderData)
    res.status(201).json(order)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getPurchasesByUser = async (req, res) => {
  try {
    const id_user = req.auth.id_user
    const orders = await orderModel.getPurchases(id_user)
    if (!orders) {
      return res.status(404).json({ message: 'Órden no encontrada' })
    }
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getSellsByUser = async (req, res) => {
  try {
    const id_user = req.auth.id_user
    const orders = await orderModel.getSells(id_user)
    if (!orders) {
      return res.status(404).json({ message: 'Órden no encontrada' })
    }
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const ordersController = { createOrder, getPurchasesByUser, getSellsByUser }
import PaymentMethod from './paymentmethods.entity'

export default interface Sales {
  id: number //RELAÇÃO COM PRODUCT ID // RELAÇÃO COM CASHIER SALES

  totalPaid: number
  paymentMethod: PaymentMethod

  userId: number

  createdAt: Date

  products: Map<number, number>
}

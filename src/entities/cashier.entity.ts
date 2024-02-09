export default interface Cashier {
  id: number

  initialValue: number
  finalValue: number

  userId: number //RELAÇÂO COM USERS ID
  sales: number //RELAÇÂO COM SALES ID
  createdAt: Date
}

export type PayInfo = {
   orderId: string,
   orderName: string,
   amount: string
};

export type executePaymentRequest = {
   id: number,
   paymentKey: String,
   orderId: String,
   amount: String
};
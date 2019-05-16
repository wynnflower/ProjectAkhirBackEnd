const router = require('express').Router()
const {getAllTransaction,getTransactionByUser,getWaitPayment,getOnProcess,
getPaymentAccept,getPaymentReject,getonDelivery,getDelivered,checkout} =require('./../controller').transactionController

router.get('/getalltransaction',getAllTransaction)
router.get('/gettransactionbyuser',getTransactionByUser)
router.get('/getwaitingpayment',getWaitPayment)
router.get('/getonprocess',getOnProcess)
router.get('/getpaymentaccept',getPaymentAccept)
router.get('/getpaymentreject',getPaymentReject)
router.get('/getondelivery',getonDelivery)
router.get('/getdelivered',getDelivered)
router.post('/checkout',checkout)


module.exports=router
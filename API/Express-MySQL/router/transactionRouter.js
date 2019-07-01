const router = require('express').Router()
const upload=require('../helpers/uploaderTrans')
const {getAllTransaction,getTransactionByUser,getWaitPayment,getOnProcess,
getPaymentAccept,getPaymentReject,getonDelivery,getDelivered,checkout,
getDetailTransaction,uploadTransaction,acceptPayment,rejectPayment,
onDelivery,delivered,sendInvoice,checkAlamat} =require('./../controller').transactionController

router.get('/getalltransaction',getAllTransaction)
router.get('/gettransactionbyuser',getTransactionByUser)
router.get('/getwaitingpayment',getWaitPayment)
router.get('/getonprocess',getOnProcess)
router.get('/getpaymentaccept',getPaymentAccept)
router.get('/getpaymentreject',getPaymentReject)
router.get('/getondelivery',getonDelivery)
router.get('/getdelivered',getDelivered)
router.post('/checkout',checkout)
router.get('/checkalamat',checkAlamat)
router.get('/getdetailtrans',getDetailTransaction)

//ganti status transaksi
router.put('/uploadtrans',upload.single('imagetrs'),uploadTransaction)
router.put('/accepttrans',acceptPayment)
router.put('/rejecttrans',rejectPayment)
router.put('/ondelivery',onDelivery)
router.put('/delivered',delivered)
router.post('/sendinvoice',sendInvoice)


module.exports=router
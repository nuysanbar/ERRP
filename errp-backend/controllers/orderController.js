// 'use strict';
const Product=require("../data/Product");
const User=require('../data/User');
const Order=require('../data/order');
var ypco = require('yenepaysdk');

var sellerCode,
    successUrlReturn = "http://localhost:3000/Home/PaymentSuccessReturnUrl", //"YOUR_SUCCESS_URL",
    ipnUrlReturn = "http://localhost:3000/Home/IPNDestination", //"YOUR_IPN_URL",
    cancelUrlReturn = "http://localhost:3000/Home/CheckoutExpress", //"YOUR_CANCEL_URL",
    failureUrlReturn = "http://localhost:3000/Home/CheckoutExpress", //"YOUR_FAILURE_URL",
    pdtToken,
    useSandbox = true,
    currency = "ETB";

exports.CheckoutExpress =(req, res)=> {
  const {barcode,retailer,merchantCode,pdToken,ItemName,UnitPrice,DeliveryFee,Discount,Tax1,Tax2,HandlingFee,Quantity}=req.body;
  if(!barcode || !retailer || !merchantCode || !pdToken || !ItemName || !UnitPrice || !DeliveryFee || !Discount || !Tax1 || !Tax2 || !Quantity){
    return res.status(400).json({"message":"unfulfilled data"})}
  var status="unpaid", currency="ETB";
  sellerCode=merchantCode;
  const merchantOrderId = merchantCode+Date.now(); //"YOUR_UNIQUE_ID_FOR_THIS_ORDER";  //can also be set null
  try{
    Order.create({
        "orderId":merchantOrderId,
        "pdtToken":pdToken,
        "retailerUserName":retailer,
        "costumerUserName":req.username,
        "barcode":barcode,
        "ItemName":ItemName,
        "UnitPrice":UnitPrice,
        "DeliveryFee":DeliveryFee,
        "Tax":Tax1,
        "Quantity":Quantity,
        "status":status,
        "currency":currency,
        "TransactionId":merchantOrderId+barcode,
        "TotalAmount":(parseFloat(UnitPrice)*parseFloat(Quantity))+parseFloat(DeliveryFee)+parseFloat(Tax1)
     }).then((result,err)=>{
      if(err)return res.sendStatus(500)
      console.log(result)
     })
  }catch(err){
    return res.status(500).json({"message":"server problem"})
  }
  var expiresAfter = 2880; //"NUMBER_OF_MINUTES_BEFORE_THE_ORDER_EXPIRES"; //setting null means it never expires
  var checkoutOptions = ypco.checkoutOptions(sellerCode, merchantOrderId, ypco.checkoutType.Express, useSandbox, expiresAfter, successUrlReturn, cancelUrlReturn, ipnUrlReturn, failureUrlReturn, currency);
  var checkoutItem = req.body;
  var url = ypco.checkout.GetCheckoutUrlForExpress(checkoutOptions, checkoutItem);
  res.json({"url":url});
};
exports.CheckoutCart = function(req, res) {
  var merchantOrderId = 'ab-cd'; //"YOUR_UNIQUE_ID_FOR_THIS_ORDER";  //can also be set null
  var expiresAfter = 2880; //"NUMBER_OF_MINUTES_BEFORE_THE_ORDER_EXPIRES"; //setting null means it never expires
  var checkoutOptions = ypco.checkoutOptions(sellerCode, merchantOrderId, ypco.checkoutType.Cart, useSandbox, expiresAfter, successUrlReturn, cancelUrlReturn, ipnUrlReturn, failureUrlReturn);
  var data = req.body;
  var checkoutItems = data.Items;

  //set order level fees like discount, handling fee, tax and delivery fee here
  var totalItemsDeliveryFee = 100;
  var totalItemsDiscount = 50;
  var totalItemsHandlingFee = 30;
  var totalPrice = 0;
  checkoutItems.forEach(function(element) {
    totalPrice += element.UnitPrice * element.Quantity;
  });
  var totalItemsTax1 = 0.15*totalPrice;
  var totalItemsTax2 = 0; //0.02*totalPrice; 
  ///////////////////////////////////////////////////////////////

  checkoutOptions.SetOrderFees(totalItemsDeliveryFee, totalItemsDiscount, totalItemsHandlingFee, totalItemsTax1, totalItemsTax2);
  var url = ypco.checkout.GetCheckoutUrlForCart(checkoutOptions, checkoutItems);
  res.json({ "redirectUrl" : url });
};

exports.IPNDestination = function(req, res) {
  var ipnModel = req.body;
  ypco.checkout.IsIPNAuthentic(ipnModel, useSandbox).then((ipnStatus) => {
    //This means the payment is completed
    //You can now mark the order as "Paid" or "Completed" here and start the delivery process
    res.json({"IPN Status": ipnStatus});
    console.log("IPN message is sent called")
  })
  .catch((err) => {
    res.json({ "Error" : err });
  });
};

exports.PaymentSuccessReturnUrl =async (req, res)=>{
  var params = req.query;
  const order=await Order.findOne({'orderId':params.MerchantOrderId}).exec();
  pdtToken=order.pdtToken;
  const product= await Product.findOne({"barcode":order.barcode}).exec();
  const costumer= await User.findOne({"username":order.costumerUserName},{"password":false,"favoredBy":false,"favoredNumber":false,"refreshToken":false}).exec();
  const retailer =await User.findOne({'username':order.retailerUserName},{"password":false,"favoredBy":false,"favoredNumber":false,"refreshToken":false}).exec();
  var pdtRequestModel = new ypco.pdtRequestModel(pdtToken, params.TransactionId, params.MerchantOrderId, useSandbox);
  console.log('success url called');
  ypco.checkout.RequestPDT(pdtRequestModel).then((pdtJson) => {
    if(pdtJson.result == 'SUCCESS') // or `pdtJson.Status == 'Paid'`
    {
      console.log("success url called - Paid");
      order.status=pdtJson.Status;
      order.TransactionId=pdtJson.TransactionId;
      order.save()
      console.log("after save order Value")
      console.log(order, product,costumer,retailer)
      //This means the payment is completed. 
      //You can extract more information of the transaction from the pdtResponse
      //You can now mark the order as "Paid" or "Completed" here and start the delivery process
      res.json({order,product,costumer,retailer})
    }
    // res.redirect('/');
  })
  .catch((err) => {
    //This means the pdt request has failed.
	  //possible reasons are 
      //1. the TransactionId is not valid
      //2. the PDT_Key is incorrect
    res.redirect('/');
  });
};

exports.PaymentCancelReturnUrl = function(req, res) {
  var params = req.query;
  var pdtRequestModel = new ypco.pdtRequestModel(pdtToken, params.TransactionId, params.MerchantOrderId, useSandbox);
  ypco.checkout.RequestPDT(pdtRequestModel).then((pdtJson) => {
    if(pdtJson.Status = 'Canceled')
    {
      //This means the payment is canceled. 
      //You can extract more information of the transaction from the pdtResponse
      //You can now mark the order as "Canceled" here.
    }
    res.json({"result":pdtJson.result});
  })
  .catch((err) => {
    //This means the pdt request has failed.
	  //possible reasons are 
      //1. the TransactionId is not valid
      //2. the PDT_Key is incorrect

     res.json({"result": "Failed"});
  });
};

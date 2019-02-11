var application = require("application");
var app = require("application");
var frameModule  = require("ui/frame");
var topmost = require("ui/frame").topmost;
var utils = require("utils/utils");
var frame = require("ui/frame")

exports.pageLoaded = function() {

};


exports.onAlertButtonTapped = function (args) {
	console.log("onAlertButtonTapped");
	//var eghl = EGHL.getInstance();
    var alert0 = new android.app.AlertDialog.Builder(application.android.currentContext);
    alert0.setMessage("Testing");
    alert0.show();
}

exports.onEGHLButtonTapped = function (args) {
	console.log("onEGHLButtonTapped");

    var eghl = new com.eghl.sdk.EGHL.getInstance();
    console.log(eghl);

    var cnasit = eghl.generateId("CNASIT");
   console.log(cnasit);

   var pp=new com.eghl.sdk.params.PaymentParams();
   console.log(pp);

   var  params = new com.eghl.sdk.params.PaymentParams.Builder();
   params.setMerchantReturnUrl("https://test2pay.ghl.com/IPGSG/Payment.aspx") ;
   params.setServiceId("OM2");
   params.setAmount("10.00") ;
   params.setPaymentDesc("eGHL Payment testing") ;
   params.setCustName("Jeff") ;
   params.setCustEmail("jeff.phang@ghl.com") ;
   params.setCustPhone("60123456789");
   params.setMerchantName("GHL ePayment Testing") 
   params.setPaymentId(cnasit) ;
   params.setOrderNumber(cnasit) ;
   params.setCurrencyCode("MYR") ;
   params.setLanguageCode("EN") ;
   params.setPageTimeout("500") ;
   params.setTransactionType("SALE") ;
   params.setPaymentMethod("ANY");
   console.log(params);

   var paymentParams = params.build();
    console.log(paymentParams);

    console.log("========================================");
  

    let Activity2 =application.foregroundActivity;

  
    var utilsAd = require("utils/utils").ad;
    var context = utilsAd.getApplicationContext();


    var superProto = android.app.Activity.prototype;
    var Activity = android.app.Activity.extend("com.tns.NativeScriptActivity", {
        onCreate: function(savedInstanceState) {
            if(!this._callbacks) {
                frame.setActivityCallbacks(this);
            }
            this._callbacks.onCreate(this, savedInstanceState, superProto.onCreate);
        },

    });

    eghl.executePayment(paymentParams, Activity2);
  }
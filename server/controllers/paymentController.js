const Payment = require('../models/payment');
const ssl = require('sslcommerz');
/**
 * pay.
 * @param {Object} req for getting all payment content.
 * @param {Object} res
 */
const proceed_to_pay = (req, res) => {
    let {
        session_name,
        doctor_id,
        session_date,
        session_time,
        per_session_length,
        name,
        email,
        phone,
        user_id,
        paymentMethod,
        _id
    } = req.body;

    const data = {
        // GENERAL MENDATORY FIELDS
        store_id: 'atlas641c8449bb034', //"testbox",
        store_passwd: 'atlas641c8449bb034@ssl', //"qwerty",
        total_amount: "103",
        currency: "BDT",
        tran_id: 'atlas_' + _id + '_' + Date.now(),
        success_url: "http://localhost:4000/api/payment/success",
        fail_url: "http://localhost:4000/api/payment/fail",
        cancel_url: "http://localhost:4000/api/payment/cancel",
        // PRODUCT INFORMATION
        product_name: session_name,
        product_category: "counselling",
        product_profile: "non-physical-goods",
        // vat: "5",
        // discount_amount: "5",
        // convenience_fee: "3",

        // CUSTOMER INFORMATION
        cus_name: name,
        cus_email: email,
        cus_add1: "Dhaka",
        //cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: phone,
        //cus_fax: "01711111111",

        // SHIPPING METHOD
        shipping_method: "NO",
        //ship_name: "Store Test",
        //ship_add1: "Dhaka",
        //ship_add2: "Dhaka",
        //ship_city: "Dhaka",
        //ship_state: "Dhaka",
        //ship_postcode: "1000",
        //ship_country: "Bangladesh",


        // META DATA 
        // value_a: "ref001",
        // value_b: "ref002",
        // value_c: "ref003",
        // value_d: "ref004",


        // EMI 
        // emi_option: "0",
        // emi_max_inst_option: "9",
        // emi_selected_inst: "9",
    };

    const sslcommer = new ssl.SslCommerzPayment('atlas641c8449bb034', 'atlas641c8449bb034@ssl', false) //true for live default false for sandbox
    sslcommer.init(data).then(data => {
        res.json({ url: data.GatewayPageURL })
    });



};

const payment_success = (req, res) => {
    console.log(req.body)
    res.redirect('http://localhost:3000/appointment');
}


const payment_fail = (req, res) => {
    console.log(req.body)
    res.redirect('http://localhost:3000/appointment');
}


const payment_cancel = (req, res) => {
    console.log(req.body)
    res.redirect('http://localhost:3000/appointment');
}

module.exports = {
    proceed_to_pay,
    payment_success,
    payment_fail,
    payment_cancel,
};

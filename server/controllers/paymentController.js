const Payment = require('../models/payment');
const ssl = require('sslcommerz');
/**
 * pay.
 * @param {Object} req for getting all payment content.
 * @param {Object} res
 */
const proceed_to_pay = (req, res) => {
    let sessionDetails = req.body;
    const data = {
        store_id: "testbox",
        store_passwd: "qwerty",
        total_amount: "103",
        currency: "BDT",
        tran_id: "SSLCZ_TEST_62e25df8d342c",
        success_url: "http://localhost:3030/success",
        fail_url: "http://localhost:3030/fail",
        cancel_url: "http://localhost:3030/cancel",
        emi_option: "1",
        emi_max_inst_option: "9",
        emi_selected_inst: "9",
        cus_name: "Test Customer",
        cus_email: "test@test.com",
        cus_add1: "Dhaka",
        cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: "01711111111",
        cus_fax: "01711111111",
        shipping_method: "NO",
        ship_name: "Store Test",
        ship_add1: "Dhaka",
        ship_add2: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: "1000",
        ship_country: "Bangladesh",
        value_a: "ref001",
        value_b: "ref002",
        value_c: "ref003",
        value_d: "ref004",
        product_name: "DHK TO BRS AC A1",
        product_category: "clothes",
        product_profile: "general",
        vat: "5",
        discount_amount: "5",
        convenience_fee: "3"
    };

    const sslcommer = new ssl.SslCommerzPayment('testbox', 'qwerty', false) //true for live default false for sandbox
    sslcommer.init(data).then(data => {
        res.json({ url: data.GatewayPageURL })
    });
};


module.exports = {
    proceed_to_pay,
};

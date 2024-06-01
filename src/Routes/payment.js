
import express from "express";
import axios from "axios";

const router = express.Router();

const PAYPAL_CLIENT_ID = 'AXZ0TM0-QXCqjJ6WJ4Bc4saWvXmmDCSnP8AgXBCJP9xC61xSAA8RHc8fT2sL5cwLaJLLYih877ATibgY';
const PAYPAL_CLIENT_SECRET = 'EFwZ_f4Qqu2EZFydKz-Ucbk5SbqBAxmF4yqZooPTdaxcHkV4l_ueGR3RMlDmyGYIP8mSTel6pTltU6J1';
const SANDBOX_URL = 'https://api.sandbox.paypal.com';

router.post("/create-payment", async (req, res) => {
  try {
    const response = await axios.post(`${SANDBOX_URL}/v1/payments/payment`, {
      intent: 'sale',
      payer: {
        payment_method: "paypal"
      },
      transactions: [
        {
          amount: {
            total: '5.99',
            currency: 'USD'
          }
        }
      ],
      redirect_urls: {
        return_url: 'https://example.com',
        cancel_url: 'https://example.com',
      }
    }, {
      auth: {
        username: PAYPAL_CLIENT_ID,
        password: PAYPAL_CLIENT_SECRET
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.json({
      id: response.data.id
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

router.post("/execute-payment", async (req, res) => {
  const { paymentID, payerID } = req.body;

  try {
    const response = await axios.post(`${SANDBOX_URL}/v1/payments/payment/${paymentID}/execute`, {
      payer_id: payerID,
      transactions: [
        {
          amount: {
            total: '10.99',
            currency: 'USD'
          }
        }
      ]
    }, {
      auth: {
        username: PAYPAL_CLIENT_ID,
        password: PAYPAL_CLIENT_SECRET
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.json({
      status: 'success'
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

});

export default router
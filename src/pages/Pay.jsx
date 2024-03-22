import StripeCheckout from 'react-stripe-checkout';
import { useState, useEffect } from 'react';
import axios from 'axios';



// const KEY = "";

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);


  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
        try {
          const res = await axios.post(
            "http://localhost:8080/api/checkout/payment", 
            {
              tokenId: stripeToken.id,
              amount:2000,
            }
          );
          console.log(res.data)
        } catch (error) {
          console.log(error)
        }
    };
    stripeToken && makeRequest
  }, [stripeToken]);


  return (
    <div 
      style={{
        height: "100vh",
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* {stripeToken ? (<span>Please wait while we process your transaction</span>) : ( */}
        <StripeCheckout
          name='Ayomi.'
          image="https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png"
          billingAddress
          shippingAddress
          description='Your total is $20'
          amount={2000}
          token={onToken}
          stripeKey={process.env.STRIPE_KEY}
        >
          <button style={{
            border: "none",
            width: 120,
            borderRadius: 5,
            padding: "20px",
            backgroundColor: "black",
            color: "white",
            fontWeight: '600',
            cursor: "pointer",
          }}>
            PAY NOW
          </button>
        </StripeCheckout>
      
    </div>
  )
}

export default Pay
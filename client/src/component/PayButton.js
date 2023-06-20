import axios from 'axios'
import React from 'react'

const PayButton = ({ispro}) => {
    // console.log(props)
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
    const clickHandler=async(e)=>{
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        // const token = localStorage.getItem('token')
        const responce = await axios.get(`http://localhost:4000/order/membership`,{headers:{Authorization:localStorage.getItem('token')}})
        console.log(responce)
        // console.log(responce , '==================>')
        let options = {
            "key":responce.data.key_id,
            "order_id":responce.data.order.id,
            "handler" : async function (responce){
                await axios.post('http://localhost:4000/order/paymentstatus',{
                    order_id : options.order_id ,
                    payment_id:responce.razorpay_payment_id } , {headers:{Authorization:localStorage.getItem('token')}}).then(res=>{
                        localStorage.setItem('isPro',true)
                        return ispro(true)
                    }).catch(err=>console.log(err,'err'))
                    alert('You are Premium user Now')
                }
            }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        e.preventDefault()
        paymentObject.on('payment.failed', async(res)=>{
            console.log(res,'fail payment')
            await axios.post('http://localhost:4000/order/paymentstatusfail',{
                order_id :responce.data.order.id ,
                payment_id:responce.razorpay_payment_id } , {headers:{Authorization:localStorage.getItem('token')}}).then(res=>console.log(res,'res')).catch(err=>console.log(err,'err'))
                alert('Your Payment is Failed!')
                paymentObject.close()
        }
        )
        }
    
  return (
    <div><button className='btn btn-dark p-2 m-2' onClick={clickHandler}>Premium</button></div>
  )
}

export default PayButton
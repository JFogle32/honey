import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CustomerDetails = () => {
    const {customerId} = useParams
    const [customer, updateCustomer] = useState()

    useEffect( //fetches data and updates state
        () => {
        fetch (`http://localhost:8088/customers?_expand=user&_embed=customer&userId=${customerId}`) 
            .then(response => response.json())
            .then ((data) => {
               const singleCustomer = data [0]
               updateCustomer(singleCustomer)
            })
        },
        [customerId]
    )


    return <section className="customer"> 
    <header className="customer_header">{customer?.user?.fullName}</header>
    <div>Address: {customer?.user?.address}</div>
    <div>Phone Number: {customer.phoneNumber}</div>
 
 </section>
}
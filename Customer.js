import {Link} from 'react-router-dom'


export const Customer = ({ id, fullName, address, phoneNumber}) => {
    return <section className="customer">
    <div>
        <Link to={`/customers/${id}`}>Name: {fullName} <br></br> Address: {address} <br></br>Phone Number: {phoneNumber}</Link>
    </div>
  
 </section>}
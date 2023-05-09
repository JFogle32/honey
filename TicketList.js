import { useEffect, useState } from "react"
import "./Tickets.css"
import { useNavigate } from "react-router-dom"

import { Ticket } from "./Ticket"

export const TicketList = ({searchTermState}) => {
    const [tickets, setTickets] = useState([])
    const [employees, setEmployees] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()



const localHoneyUser =localStorage.getItem ("honey_user")
const honeyUserObject = JSON.parse(localHoneyUser)//OBJ with 2 keys -id and staff.

//filters tickets by search terms entered in field box.tolowercase makes it to where it's not case sensitive.
useEffect(
    () => {
        const searchedTickets = tickets.filter(ticket =>{
           return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase())})

        setFiltered(searchedTickets)
        },
    [searchTermState]
)

useEffect(
    () => {
        if (emergency){
            const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
            setFiltered(emergencyTickets)
        }
        else {
            setFiltered(tickets) //allows us to show all tickets when emergency is false. 
        }
    },
    [emergency]
)

const getAllTickets = () => {
    fetch (`http://localhost:8088/serviceTickets?_embed=employeeTickets`)
    .then(response => response.json())
    .then(ticketArray => {
        setTickets (ticketArray)
    })
}





//this UE runs after inital state is set and gets all the info we need from permanent state(the API)
    useEffect(
        () => {
            getAllTickets()
          
            fetch (`http://localhost:8088/employees?_expand=user`)
            .then(response => response.json())
            .then(employeeArray => {
                setEmployees (employeeArray)
            })
            },
        
        
        [] // When this array is empty, you are observing initial component state
    )
useEffect (
    () => {
        if (honeyUserObject.staff){
            // for employees-want to see all tickets
             setFiltered(tickets)
        }
        else {
            //for customers-only want to see own tickets
            const myTickets =tickets.filter(ticket => ticket.userId === honeyUserObject.id)
            setFiltered(myTickets)
        }
    },
    [tickets]
    )
//whole purpose of use effect is to observe state

useEffect(
    () => {
        if (openOnly){
            const openTicketArray =tickets.filter(ticket => { 
        return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
    })
     setFiltered(openTicketArray)
}
else {
    const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)

    setFiltered(myTickets)
}
    },
    [openOnly]
)


//makes a button-- only on staff profile--that when clicked lists emergency tickets.<--emergency only button
//makes a Show all button that shows all tickets on staff profile.
    return <>
    {
        honeyUserObject.staff
        ?<>
        <button onClick={() => {setEmergency(true)}}>Emergency Only</button>
        <button onClick={() => {setEmergency(false)}}>Show All</button>
        </>
        :<>
        <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
         <button onClick={() => updateOpenOnly(true)}>Open Ticket</button>
         <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
         </>
    } 
    
    <h2>List of Tickets</h2>

    <article className="tickets">
            {
                filteredTickets.map(
                    (ticket) =>  <Ticket employees={employees} 
                    getAllTickets={getAllTickets}
                    currentUser={honeyUserObject}
                    ticketObject={ticket} /> 
                )
            }
        </article>
    </>



        }
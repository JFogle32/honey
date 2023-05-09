import { useState } from "react"
import { TicketList } from "./TicketList"
import { TicketSearch } from "./TicketSearch"



export const TicketContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
//sets initial state for search terms and setsearchterms changes info in it. 
return <>
     <TicketSearch setterFunction={setSearchTerms}/>
     <TicketList searchTermState={searchTerms}/>
</>




}
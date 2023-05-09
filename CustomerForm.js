import { useEffect, useState } from "react"

export const CustomerForm = () => {
    // Provide initial state for profile
    const [profile, updateProfile] = useState({
        specialty: "",
        rate: 0,
        userId: 0,
    })

    const localHoneyUser =localStorage.getItem ("honey_user") //gets item out of local storage and then parse it into OBJ
    const honeyUserObject = JSON.parse(localHoneyUser)//OBJ with 2 keys -id and staff.


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
             return fetch(`http://localhost:8088/customers/${profile.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(profile)
             })
                 .then(response => response.json())
                 .then (() => {
                       //Do nothing
                 })
    }



    // TODO: Get employee profile info from API and update state
      useEffect (() =>
          fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
          .then(response => response.json())
          .then((data) => {
                const customerObject = data [0]
                updateProfile(customerObject)
          })
        , [])

    return(
        <form className="profile">
            <h2 className="profile__title">Customer Information</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.address}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.address = evt.target.value
                                updateProfile(copy)
                                //  Update specialty property
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Phone Number:</label>
                    <input type="number"
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.phoneNumber = parseFloat(evt.target.value,2)
                                updateProfile(copy)
                                //  Update rate property
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
    )
}
import { EmployeeViews } from "./EmployeeViews"
import { CustomerViews } from "./CustomerViews"

export const ApplicationViews = () => {
    const localHoneyUser =localStorage.getItem ("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)//OBJ with 2 keys -id and staff.

    if (honeyUserObject.staff){
        //Return employee view
         return <EmployeeViews />
    }
    else{
        //Return customer views
        return <CustomerViews />
    }


}

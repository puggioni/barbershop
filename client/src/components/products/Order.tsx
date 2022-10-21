import { useAppDispatch } from "../../app/hooks"
import { sortByName } from "../slices/productSlice";

const Ordering = ()=>{
    const dispatch=useAppDispatch();

    const handleSort = (event:any) => {
        if (event.target.value) 
        dispatch(sortByName(event.target.value))
    }
    
    return (
    <select className='' onChange={event=>handleSort(event)}>
    <option>ORDERING</option>
    <option value='asc'>A-Z</option>
    <option value='desc'>Z-A</option>
  </select>
  
  )
}



export default Ordering
import { VscArrowLeft } from "react-icons/vsc"
import { useNavigate } from "react-router";


const BarberDetail = ()=>{

let navigate = useNavigate();
    
    
function goBack(): void {
      navigate(-1);
    }


    return(
        <>
            <div className=" bg-slate-200/50  flex  flex-col md:flex-row h-100% w-100%">
            <VscArrowLeft className=" ml-4 mt-3 h-6 w-6 fill-black"
                onClick={goBack}
            />
            </div>
        </>
    )
}

export default BarberDetail
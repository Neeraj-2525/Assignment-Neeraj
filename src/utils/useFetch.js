import { useEffect, useState } from "react";
import { useSelector } from "react-redux";



const useFetch = (endPoint) => {
    const [data, setData] = useState();
    const formData = useSelector("formInpValue");

    useEffect(() => {
        makeApiCall();
    }, [endPoint]);

    const makeApiCall = async () => {
        try {
            if(endPoint=="/upload"){
                const res = await fetch('/api/products/upload', {
                    method: 'POST',
                    body: formData,
                });
                
                setData(res.json())
            }
        } catch (error) {
            console.log("Some error ocurred")
        }

    }

    return { data }
}

export default useFetch;


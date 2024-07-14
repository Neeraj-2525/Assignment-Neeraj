import { useEffect, useState } from "react";



const useFetch = (endPoint) => {
    const [data, setData] = useState();
    const host = import.meta.env.VITE_APP_LOCAL_HOST;

    useEffect(() => {
        makeApiCall();
    }, []);

    async function makeApiCall() {
        try {
            if (endPoint === "/details") {
                const res = await fetch(`${host}/api/products/details`);

                if (!res.ok) {
                    throw new Error(`Error fetching data: ${res.status}`);
                }

                const resJson = await res.json();
                setData(resJson);
            }
        } catch (error) {
            console.log("Some error ocurred guys")
        }

    }

    return { data }
}

export default useFetch;


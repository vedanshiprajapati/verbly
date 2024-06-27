import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Blogcard from "./Blogcard";

export default function Home() {
    const [data, setData] = useState([])
    useEffect(() => {
        fetchdata()
    }, [])
    
     
    const fetchdata = async () => {
        const response = await fetch("https://verbly.vedanshi3012p.workers.dev/api/v1/blog/bulk", {
            method: "GET",
            headers: {
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI4NDUxYmQwLWYxNmQtNGI1ZC05MWIxLWNmODJmMmFlMjBiYiIsInVzZXJuYW1lIjoidmVkYW5zaGkifQ.epmxun3_KY_YJTHvOVKcK6jn2faEpOAU4WvFtPWPBPg"
            }
        })
        const data = await response.json();
        setData(data?.details)

    }
    return (<>
            <div className="flex flex-col items-center mt-16 gap-3">
                {data?.map((item, index) => {
                    return (<Blogcard BlogDetails={item} key={index}/>)
                })}
            </div>
    </>)
}
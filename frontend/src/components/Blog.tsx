import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Avatar, AvatarImage } from "./ui/avatar";
import { createBlog } from "@vedanshi/verbly-common";

export default function Blog() {
    const { id } = useParams();
    const [data, setData] = useState<createBlog>({title: "", content:""})
    useEffect(() => {
        fetchdata()
    }, [])
    
     
    const fetchdata = async () => {
        const response = await fetch(`https://verbly.vedanshi3012p.workers.dev/api/v1/blog/${id}`, {
            method: "GET",
            headers: {
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI4NDUxYmQwLWYxNmQtNGI1ZC05MWIxLWNmODJmMmFlMjBiYiIsInVzZXJuYW1lIjoidmVkYW5zaGkifQ.epmxun3_KY_YJTHvOVKcK6jn2faEpOAU4WvFtPWPBPg"
            }
        })
        const data = await response.json();
         setData(data?.details)

    }
    return (
        <>
            {/* <div className="flex justify-center py-10">
      <Card className="max-w-3xl w-full shadow-lg">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">{data?.title}</h1>
                        <p className="text-base text-gray-700">{data?.content}</p>
          <div className="flex items-center gap-4 pt-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png"/>
            </Avatar>
            <span className="text-gray-600">John doe</span>
          </div>
        </CardContent>
      </Card>
    </div> */}
            <div className="flex justify-center">
                <main className="w-2/3 container mx-auto px-4 py-10">
                    <div className=" p-6">
                    <h2 className="text-3xl font-bold ">{data?.title}</h2>
                    <div className="flex items-center gap-4 mt-4">
                        <Avatar className="w-10 h-10">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        </Avatar>
                        <div className="text-sm ">
                        <p>john doe</p>
                        <p>24 nov 2023</p>
                        </div>
                    </div>
                    <div className="mt-6 ">
                        <p>{data?.content}</p>
                    </div>
                    </div>
                </main>
            </div>
        </>)
}
"use server"

import { getUserFromCookie } from "../../lib/getUser";
import { redirect } from "next/navigation";
import HaikuForm from "../../rootComponents/HaikuForm";

export default async function Page() {
    const user = await getUserFromCookie()
    if (!user) {
        return redirect("/")
    }

    

    return(
        <>
        <h2 className="text-center text-2xl text-gray-600 mb-5"><strong>Create Haiku</strong></h2>
        <HaikuForm action="create"/>
        </>
    )
};

import { useEffect } from "react"

const Reception = () => {

    console.log("RECEPTION COMPONENT RENDERED")

    useEffect(() => {

        console.log("USE EFFECT RUNNING")

    }, [])

    return (
        <div
            style={{
                background: "red",
                color: "white",
                padding: "50px",
                fontSize: "30px"
            }}
        >
            Reception Test
        </div>
    )
}

export default Reception
import { Outlet } from "react-router-dom"
import StationsContext from "./StationsContext"

const StationsContextLayout = ({ stations }) => {
    return (
        <StationsContext.Provider value={stations}>
            <Outlet />
        </StationsContext.Provider>
    )
}

export default StationsContextLayout
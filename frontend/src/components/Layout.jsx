import { Link, Outlet } from 'react-router-dom'

const Layout = () => {

    return (
        <>
            <header>
                {
                    //<Link to='/'>Logo</Link>
                }
                <nav>
                    <Link to='/'>Home</Link>
                    <Link to='/journeys'>Journeys</Link>
                    <Link to='/stations'>Stations</Link>
                </nav>
            </header>
            <Outlet />
            <footer>
                <div>Bikeapp 2023</div>
            </footer>
        </>
    )
}

export default Layout
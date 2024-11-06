import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../pages/Sidebar'

const Rootlayout = () => {
    return (
        <>
            <main className=' flex '>
                <div>
                    <Sidebar />
                </div>
                <div>
                    <Outlet />
                </div>
            </main>
        </>
    )
}

export default Rootlayout
import React from 'react'
import Admin from './Admin'

const Dashboard = () => {
  

  return (
    <>
        <Admin />
    <div className='pl-[200px]'>
          <div className="p-5 flex justify-center items-center h-[100vh]">
              <div className="">
                  <h2 className="text-xl font-semibold tracking-wider">Welcome admin </h2>
                  <h2 className="text-base font-semibold tracking-wider">Feel Free to Manage </h2>
              </div>
          </div>
        </div>
    </>
  )
}

export default Dashboard
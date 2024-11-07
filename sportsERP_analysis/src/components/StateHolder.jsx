import React from 'react'
import StateCard from './StateCard'

export default function StateHolder() {
  return (
    <>
      <div className='bg-secondary d-flex flex-wrap w-auto bg-opacity-25 rounded p-2 gap-2'>
        <StateCard icon='bi-people' icolor='success' value='313' label='Total Users'></StateCard>
        <StateCard icon='bi-box-seam' value='244' label='Total Inventory'></StateCard>
        <StateCard icon='bi-check2-circle' icolor='success' value='225' label='Wokring Inventory'></StateCard>
        <StateCard icon='bi-ui-checks' icolor='info' value='12' label='Allocated Items'></StateCard>
        <StateCard icon='bi-clock-history' icolor='info' value='0' label='Pending Requests'></StateCard>
        <StateCard icon='bi-exclamation-circle' icolor='danger' value='1' label='Overdue Requests'></StateCard>
      </div>
    </>
  )
}

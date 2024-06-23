import React, { Suspense } from 'react'

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const AlwaysSuspend: React.FC = async () => {
    await sleep(3000)
    return (<p>loaded</p>)
}


const ChildSuspend: React.FC = async () => {
  await sleep(5000)
  return (<p>loaded</p>)
}

const SuspenseComponent = () => {
  return (
    <div className="text-center">
        <h1 className="text-2xl">React App!</h1>
        <Suspense fallback={<p>Loading...</p>}>
          <AlwaysSuspend />
          <Suspense fallback={<p>Loading...</p>}>
            <ChildSuspend />
          </Suspense>
        </Suspense>
    </div>
  )
}

export default SuspenseComponent
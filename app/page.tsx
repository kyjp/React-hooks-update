import DeferredValue from "./components/DeferredValue";
import Optimistic from "./components/Optimistic";
import SuspenseComponent from "./components/SuspenseComponent";
import Transition from "./components/Transition";

export default function Home() {
  return (
    <main className="">
      <Optimistic />
      <div className="mt-4">
        <Transition />
      </div>
      <div className="mt-4">
        <SuspenseComponent />
      </div>
      <div className="mt-4">
        <DeferredValue />
      </div>
    </main>
  )
}

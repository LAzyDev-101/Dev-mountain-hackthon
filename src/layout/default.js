import { Outlet, Link } from "react-router-dom";
const defaultLayout = () => (
  <div className="bg-slate-300 h-screen">
    <div className=" bg-stone-800 text-slate-200 flex flex-row justify-center items-center h-10 font-bold font-mono">
      Header default layout naja
    </div>

    <div className="flex flex-row justify-center content-center">
      <div className="basis-1/2 md:basis-1/2 lg:basis-1/3 text-center">
        <Outlet />
      </div>
    </div>
  </div>
);

export default defaultLayout;

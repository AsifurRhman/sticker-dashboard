import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../public/logo-1.png";
import { createElement } from "react";
import { IoIosLogOut } from "react-icons/io";
import { routeLinkGenerators } from "../../utils/routeLinkGenerators";
import { dashboardItems } from "../../constants/router.constants";
const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/auth");
  };
  return (
    <div className="fixed top-0 left-0 w-[326px] min-h-screen flex flex-col justify-between bg-primary py-[50px]">
      <div>
        <img src={logo} alt="logo" className="w-[150px] mx-auto" />
      </div>
      <div className="">
        <ul className="mt-[24px] max-h-[650px] overflow-y-auto space-y-1 xl:space-y-2 px-6">
          {routeLinkGenerators(dashboardItems).map(({ name, icon, path }, indx) => (
            <li key={indx}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "bg-white text-primary" +
                      " w-full px-10 py-4 flex items-center justify-start gap-5 text-lg transition-all rounded-lg"
                    : "text-white hover:text-primary text-[20px] hover:bg-white" +
                      " w-full px-10 py-4 flex items-center justify-start gap-5 text-lg transition-all rounded-lg"
                }
              >
                <div>{createElement(icon, { size: "20" })}</div>
                <span> {name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="">
        <button
          onClick={handleLogOut}
          className="bg-white w-full px-14 py-4 flex items-center justify-start gap-6 text-lg outline-none font-medium text-[#EE1D23]"
        >
          <IoIosLogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

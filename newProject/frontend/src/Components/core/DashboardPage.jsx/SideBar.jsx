import { useSelector } from "react-redux";
import { VscSettingsGear } from "react-icons/vsc"; // ✅ CORRECT
import { sidebarLinks } from "../../../data/dashboard-links.js"
import SideBarLink from "./SideBarLink.jsx"
import { Loader2 } from "lucide-react";

const SideBar = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { user, loading: profileLoading } = useSelector((state) => state.profile);

  // get the data from the backned


  if (profileLoading || authLoading ) {
    return (
      <div className='text-3xl mx-auto font-bold text-gray-500'>
        <Loader2 className='animate-spin' />
      </div>
    );
  }

  const filteredLinks = sidebarLinks.filter((link) => {
    if (!link.type) return true;
    return link.type === user?.role;
  });

  console.log("USER:", user);
  console.log("role:", user?.role);

  return (
    <div className='flex min-w-[222px] flex-col border-r-[1px] border-black bg-black py-10 h-[calc(100vh-3.5rem)]'>

      {/* Links */}
      <div className='flex flex-col'>
        {filteredLinks.map((link) => (
          <SideBarLink key={link.id} link={link} />
        ))}
      </div>

      {/* Divider */}
      <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-gray-600' />

      {/* Settings */}
      <div className='flex flex-col'>
        <SideBarLink
          link={{ name: "Settings", path: "/dashboard/settings" }}
          icon={VscSettingsGear}
        />
      </div>
    </div>
  );
};

export default SideBar
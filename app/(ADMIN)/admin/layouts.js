// app/admin-dashboard/layout.js
import ClientNavbar from "@/components/ClientNavbar";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminDashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50/30 text-slate-900 antialiased font-sans">
      {/* Global Client Interface Navbar Layer */}
      <ClientNavbar />
      
      <div className="flex">
        {/* Core Administrative Left Sideboard navigation */}
        <AdminSidebar />
        
        {/* Main Content Render Sandbox */}
        <main className="flex-1 p-8 bg-white/20 min-h-[calc(100vh-66px)]">
          <div className="max-w-6xl mx-auto">
            
            {/* Header Description blocks */}
            <div className="mb-6">
              <h1 className="text-3xl font-black tracking-tighter text-slate-950 uppercase">
                Control Matrix
              </h1>
              <p className="text-slate-500 font-extrabold mt-0.5 text-xs tracking-wider text-indigo-600 uppercase">
                System Active // Interface initialized with light hyper-gradients
              </p>
            </div>
            
            {/* Child content application rendering slot */}
            <div className="border border-slate-200/80 shadow-inner rounded-2xl p-6 bg-white/60 backdrop-blur-sm min-h-[400px]">
              {children || (
                <div className="text-center text-slate-400 font-bold pt-24">
                  Insert primary dashboard charts and modules here.
                </div>
              )}
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
}
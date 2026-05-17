export const metadata = {
  title: "Settings | Admin",
};

export default function SettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 mt-1">Manage site configuration</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
        <p className="text-slate-300">Settings page coming soon. Here you can manage:</p>
        <ul className="list-disc list-inside text-slate-400 mt-4 space-y-2">
          <li>Site name and description</li>
          <li>Admin users and roles</li>
          <li>Email settings</li>
          <li>Social media links</li>
        </ul>
      </div>
    </div>
  );
}

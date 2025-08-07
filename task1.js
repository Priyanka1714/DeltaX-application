import React, { useState } from 'react';

const leadsData = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    source: 'Facebook',
    status: 'New',
    assignedTo: 'Alice Johnson',
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    source: 'Website',
    status: 'Contacted',
    assignedTo: 'Bob Brown',
  },
  {
    name: 'Michael Johnson',
    email: 'michael.johnson@example.com',
    source: 'Offline',
    status: 'Interested',
    assignedTo: 'Alice Johnson',
  },
];

const statusColors = {
  New: 'bg-blue-500 text-white',
  Contacted: 'bg-gray-200 text-gray-800',
  Interested: 'bg-green-500 text-white',
};

export default function App() {
  const [leads, setLeads] = useState(leadsData);
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter ? lead.status === statusFilter : true;
    const matchesSource = sourceFilter ? lead.source === sourceFilter : true;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSource && matchesSearch;
  });

  return (
    <div className="flex h-screen font-sans bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#15213b] text-white p-6">
        <h1 className="text-xl font-semibold mb-10">DriveCRM</h1>
        <nav className="flex flex-col gap-3">
          <button className="bg-[#2d3b5a] py-2 px-4 rounded text-left font-medium">
            🧾 Leads
          </button>
          <button className="text-left py-2 px-4 hover:bg-[#2d3b5a] rounded">
            📊 Dashboard
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Lead Listing</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            New Lead
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Interested">Interested</option>
          </select>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Sources</option>
            <option value="Facebook">Facebook</option>
            <option value="Website">Website</option>
            <option value="Offline">Offline</option>
          </select>

          <input
            type="text"
            placeholder="Search"
            className="border p-2 rounded flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Source</th>
                <th className="p-3">Status</th>
                <th className="p-3">Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{lead.name}</td>
                  <td className="p-3">{lead.email}</td>
                  <td className="p-3">{lead.source}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        statusColors[lead.status]
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-3">{lead.assignedTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
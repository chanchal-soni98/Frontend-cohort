import './App.css';
import { DataTable } from './Component/DataTable';

function App() {
  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' }
  ];

  const data = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: ['Admin', 'Editor', 'Viewer'][i % 3]
  }));
  return (
    <div className="App">
      <DataTable columns={columns} data={data}/>
    </div>
  );
}

export default App;

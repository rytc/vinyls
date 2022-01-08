import Records from './components/Records.js'
import SearchRecords from './components/SearchRecords.js';

function Admin() {
  return (
    <>
      <h1>Admin</h1>

      <h2>Add a new record</h2>

        <SearchRecords />

      <h2>Record List</h2>
      <Records />
    </>
  );
}

export default Admin;
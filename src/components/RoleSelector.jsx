function RoleSelector({ role, setRole }) {
  return (
    <select value={role} onChange={(e) => setRole(e.target.value)} required>
      <option value="">Select Role</option>
      <option value="student">Student</option>
      <option value="faculty">Faculty</option>
      <option value="admin">Admin</option>
    </select>
  );
}

export default RoleSelector;

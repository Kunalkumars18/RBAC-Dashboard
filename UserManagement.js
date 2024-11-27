import { Cancel, Delete, Edit, Save } from "@mui/icons-material";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { addUser, deleteUser, fetchUsers, updateUser } from "../services/api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "", active: true });
  const [editingUser, setEditingUser] = useState(null);
  const [open, setOpen] = useState(false);

  // Fetch users from the backend
  useEffect(() => {
    fetchUsers().then((res) => setUsers(res.data));
  }, []);

  // Add a new user
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      alert("All fields are required!");
      return;
    }
    addUser(newUser).then(() => {
      fetchUsers().then((res) => setUsers(res.data));
      setNewUser({ name: "", email: "", role: "", active: true });
      setOpen(false);
    });
  };

  // Start editing a user
  const startEditing = (user) => {
    setEditingUser(user);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingUser(null);
  };

  // Save updated user details
  const handleSaveUser = () => {
    if (!editingUser.name || !editingUser.email || !editingUser.role) {
      alert("All fields are required!");
      return;
    }
    updateUser(editingUser._id, editingUser).then(() => {
      fetchUsers().then((res) => setUsers(res.data));
      setEditingUser(null);
    });
  };

  // Toggle active status
  const handleToggleStatus = (user) => {
    const updatedUser = { ...user, active: !user.active };
    updateUser(user._id, updatedUser).then(() => {
      fetchUsers().then((res) => setUsers(res.data));
    });
  };

  // Delete a user
  const handleDeleteUser = (id) => {
    deleteUser(id).then(() => {
      setUsers(users.filter((user) => user._id !== id));
    });
  };

  return (
    <Box p={3}>
      <h1>User Management</h1>

      {/* Add User Dialog */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        style={{ marginBottom: "1rem" }}
      >
        Add User
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <TextField
            label="Role"
            fullWidth
            margin="dense"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddUser} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* User Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  {editingUser && editingUser._id === user._id ? (
                    <TextField
                      value={editingUser.name}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, name: e.target.value })
                      }
                      fullWidth
                    />
                  ) : (
                    user.name
                  )}
                </TableCell>
                <TableCell>
                  {editingUser && editingUser._id === user._id ? (
                    <TextField
                      value={editingUser.email}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, email: e.target.value })
                      }
                      fullWidth
                    />
                  ) : (
                    user.email
                  )}
                </TableCell>
                <TableCell>
                  {editingUser && editingUser._id === user._id ? (
                    <TextField
                      value={editingUser.role}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, role: e.target.value })
                      }
                      fullWidth
                    />
                  ) : (
                    user.role
                  )}
                </TableCell>
                <TableCell align="center">
                  <Switch
                    checked={user.active}
                    onChange={() => handleToggleStatus(user)}
                    color="primary"
                  />
                  {user.active ? "Active" : "Inactive"}
                </TableCell>
                <TableCell align="center">
                  {editingUser && editingUser._id === user._id ? (
                    <>
                      <IconButton onClick={handleSaveUser} color="primary">
                        <Save />
                      </IconButton>
                      <IconButton onClick={cancelEditing} color="secondary">
                        <Cancel />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        onClick={() => startEditing(user)}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteUser(user._id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserManagement;

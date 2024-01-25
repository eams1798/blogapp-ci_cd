import { Table } from "react-bootstrap";
import { IUser } from "../interfaces/user";
import { Link } from "react-router-dom";

interface IUserListProps {
  users: IUser[];
}


const UserList = ({ users }: IUserListProps) => {
  return (
    <div id="user-list">
      <h2>Users</h2>
      <Table striped bordered hover responsive="md">
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs!.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
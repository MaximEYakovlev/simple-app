import styles from './styles.module.css';
import { v4 as uuidv4 } from 'uuid';

export const UserList = ({ users }) => {
    const userList = users.map((user) => (
        <tr key={uuidv4()}>
            <td>{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>
                {new Intl.NumberFormat('ru-RU').format(
                    user.Account.accountNumber
                )}
            </td>
        </tr>
    ));

    return (
        <div className={styles.users}>
            <h3>User list</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Account number</th>
                    </tr>
                </thead>
                <tbody>{userList}</tbody>
            </table>
        </div>
    );
};

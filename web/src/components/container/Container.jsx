import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import { NewUserForm } from '../newUserForm/NewUserForm';
import { UserList } from '../userList/UserList';
import { UserOperationsForm } from '../userOperationsForm/UserOperationsForm';
import { UserBalance } from '../userBalance/UserBalance';

export const Container = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8080/user');
            setUsers(response.data);
        } catch (error) {
            console.error('Error loading users:', error);
        }
    };

    const addUserToList = (newUser) => {
        setUsers((users) => {
            return [...users, newUser];
        });
    };

    return (
        <div className={styles.container}>
            <NewUserForm addUserToList={addUserToList} />
            <UserList users={users} />
            <UserOperationsForm />
            <UserBalance />
        </div>
    );
};

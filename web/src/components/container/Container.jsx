import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import { NewUserForm } from '../newUserForm/NewUserForm';
import { UserListTable } from '../userListTable/UserListTable';
import { UserTransactionsForm } from '../userTransactionsForm/UserTransactionsForm';
import { UserBalanceForm } from '../userBalanceForm/UserBalanceForm';

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
            <UserListTable users={users} />
            <UserTransactionsForm />
            <UserBalanceForm />
        </div>
    );
};

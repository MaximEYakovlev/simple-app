import { useState } from 'react';
import styles from './styles.module.css';
import { updateBalance } from './helpers';

export const UserOperationsForm = () => {
    const [replenishUserId, setReplenishUserId] = useState('');
    const [replenishAmount, setReplenishAmount] = useState('');

    const [withdrawUserId, setWithdrawUserId] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');

    const [transferUserId, setTransferUserId] = useState('');
    const [recipientId, setRecipientId] = useState('');
    const [transferAmount, setTransferAmount] = useState('');

    const handleClick = async (userId, amount, action) => {
        switch (action.type) {
            case 'replenish':
                await updateBalance(userId, amount, action);
                setReplenishUserId('');
                setReplenishAmount('');
                break;
            case 'withdraw':
                await updateBalance(userId, amount, action);
                setWithdrawUserId('');
                setWithdrawAmount('');
                break;
            case 'transfer':
                await updateBalance(userId, amount, action);
                setTransferUserId('');
                setRecipientId('');
                setTransferAmount('');
                break;
            default:
                console.log('there is no such action type');
        }
    };

    return (
        <div className={styles.form}>
            <h3>Balance operations</h3>
            <div>
                <div>
                    <h4>Withdraw</h4>
                    <label>User ID:</label>
                    <input
                        type="text"
                        name="withdrawUserId"
                        value={withdrawUserId}
                        onChange={(e) => setWithdrawUserId(e.target.value)}
                        placeholder="user ID"
                    />
                    <label>Amount:</label>
                    <input
                        type="text"
                        name="withdrawAmount"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        placeholder="amount"
                    />
                    <button
                        onClick={() =>
                            handleClick(withdrawUserId, withdrawAmount, {
                                type: 'withdraw',
                            })
                        }
                    >
                        Withdraw
                    </button>
                </div>
                <div>
                    <h4>Replenish</h4>
                    <label>User ID:</label>
                    <input
                        type="text"
                        name="replenishUserId"
                        value={replenishUserId}
                        onChange={(e) => setReplenishUserId(e.target.value)}
                        placeholder="user ID"
                    />
                    <label>Amount:</label>
                    <input
                        type="text"
                        name="replenishAmount"
                        value={replenishAmount}
                        onChange={(e) => setReplenishAmount(e.target.value)}
                        placeholder="amount"
                    />
                    <button
                        onClick={() =>
                            handleClick(replenishUserId, replenishAmount, {
                                type: 'replenish',
                            })
                        }
                    >
                        Replenish
                    </button>
                </div>
                <div>
                    <h4>Transfer</h4>
                    <label>Sender ID:</label>
                    <input
                        type="text"
                        name="transferUserId"
                        value={transferUserId}
                        onChange={(e) => setTransferUserId(e.target.value)}
                        placeholder="sender ID"
                    />
                    <label>Recipient ID:</label>
                    <input
                        type="text"
                        name="recipientId"
                        value={recipientId}
                        onChange={(e) => setRecipientId(e.target.value)}
                        placeholder="recipient ID"
                    />
                    <label>Amount:</label>
                    <input
                        type="text"
                        name="transferAmount"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        placeholder="amount"
                    />
                    <button
                        onClick={() =>
                            handleClick(transferUserId, transferAmount, {
                                type: 'transfer',
                                recipientId,
                            })
                        }
                    >
                        Transfer
                    </button>
                </div>
            </div>
        </div>
    );
};

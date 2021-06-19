import React from 'react';
import stylesTable from './Table.module.css';

const Table = ({ data, onRemoveContact }) => {
    return (
        <div className={stylesTable.wrapper}>
            <table className={stylesTable['transaction-history']} cellSpacing="1" border="1" cellPadding="5" width="300">
                <thead className={stylesTable.thead}>
                    <tr className={stylesTable.row}>
                        <th className={stylesTable.head}>ID</th>
                        <th className={stylesTable.head}>Name</th>
                        <th className={stylesTable.head}>Email</th>
                        <th className={stylesTable.head}>Registration date</th>
                        <th className={stylesTable.head}>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {data && data.length > 0 && data.map(item => (
                        <tr className={stylesTable.row} key={item.ID}>
                            <td className={stylesTable.data}>{item.ID}</td>
                            <td className={stylesTable.data}>{item.Name}</td>
                            <td className={stylesTable.data}>{item.Email}</td>
                            <td className={stylesTable.data}>{
                                item.CreatedAt.substring(0, 10)
                            }</td>
                            <td className={stylesTable.data}>
                                <button
                                    className={stylesTable.buttonDelete}
                                    id={item.ID}
                                    onClick={() => onRemoveContact(item.ID)}>x
                                    </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;
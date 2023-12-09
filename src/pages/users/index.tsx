import React from 'react';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Title from 'antd/es/typography/Title';
import { Button, Modal } from 'antd/lib';
import "./style.scss"
import { ExclamationCircleFilled } from '@ant-design/icons';
const { confirm } = Modal;
interface User {
    id: number;
    name: string;
    email: string;
}

const UsersPage: React.FC = () => {

    // const mock: User[] = [
    //     { id: 1, name: 'John Doe', email: 'john@example.com' },
    // ];

    // const columns = [
    //     { title: 'İsim', dataIndex: 'name', key: 'name' },
    //     { title: 'Email', dataIndex: 'email', key: 'email' },
    // ];

    // const actions: TableAction<User>[] = [
    //     {
    //         type: 'default',
    //         icon: faPen,
    //         label: "Düzenle",
    //         onClick: (record) => {
    //         },
    //     },
    //     {
    //         type: 'primary',
    //         icon: faTrash,
    //         label: "Sil",
    //         danger: true,
    //         onClick: (record) => {
    //             confirm({
    //                 title: `${record.name} kullanıcısını silmek istediğinize emin misiniz?`,
    //                 icon: <ExclamationCircleFilled />,
    //                 okText: 'Evet',
    //                 okType: 'danger',
    //                 cancelText: 'Hayır',
    //                 onOk() {
    //                 },
    //             });
    //         },
    //     },
    // ];

    return (
        <div className='users-page-container'>
            {/* <div className="users-page-container-header">
                <Title level={2}>Kullanıcılar</Title>
                <div className="actions">
                    <Button type='primary'>
                        Kullanıcı Ekle
                    </Button>
                </div>
            </div>
            <GeneralTable dataSource={mock} columns={columns} actions={actions} /> */}
        </div>
    );
};

export default UsersPage;

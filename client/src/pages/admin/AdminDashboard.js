import { Breadcrumb } from 'antd';
import React from 'react'

const AdminDashboard = () => {
    return (
        <>
            <div>
                <Breadcrumb style={{paddingRight: '10px'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>
                    <a href="">Application Center</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                    <a href="">Application List</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>An Application</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    Dashboard Admin
                </div>
            </div>
            
        </>
    )
}

export default AdminDashboard;

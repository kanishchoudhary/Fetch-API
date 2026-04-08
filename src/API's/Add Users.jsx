import { NavLink, useNavigate } from "react-router"
import { Button, Form, Input } from "antd"
import { useState } from "react";

function AddUsers() {

    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [position, setPosition] = useState('')
    const [department, setDepartment] = useState('')
    const [salary, setSalary] = useState('')

    const CreateUser = async () => {
        const url = "http://localhost:3000/employees";
        let data = await fetch(url, {
            method: 'post',
            body: JSON.stringify({ name, age, position, department, salary })
        });
        data = await data.json();
        if (data) {
            alert("User Added")
            navigate("/", { state: data });
        }
    }

    const onFinish = (values) => {
        CreateUser(values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <NavLink className="adduser-link" to="/">Back</NavLink>
            <div style={{ textAlign: "center" }}>
                <h1>Add New Users</h1>
                <Form
                    style={{ maxWidth: "300px", marginLeft: "580px" }}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label='Name'
                        name="name"
                        rules={[{ required: true, message: 'Please enter your name' }]}
                    > <Input onChange={(e) => setName(e.target.value)} /></Form.Item>
                    <Form.Item
                        label='Age'
                        name="age"
                        rules={[{ required: true, message: 'Please enter your age' }]}
                    > <Input onChange={(e) => setAge(e.target.value)} /></Form.Item>
                    <Form.Item
                        label='Position'
                        name="position"
                        rules={[{ required: true, message: 'Please enter your position' }]}
                    > <Input onChange={(e) => setPosition(e.target.value)} /></Form.Item>
                    <Form.Item
                        label='Department'
                        name="department"
                        rules={[{ required: true, message: 'Please enter your department' }]}
                    > <Input onChange={(e) => setDepartment(e.target.value)} /></Form.Item>
                    <Form.Item
                        label='Salary'
                        name="salary"
                        rules={[{ required: true, message: 'Please enter your salary' }]}
                    > <Input onChange={(e) => setSalary(e.target.value)} /></Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Add User
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
    )
}

export default AddUsers
import { NavLink, useNavigate, useParams } from "react-router"
import { Button, Form, Input } from "antd"
import { useState, useEffect } from "react";

function EditUser() {
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [position, setPosition] = useState('')
    const [department, setDepartment] = useState('')
    const [salary, setSalary] = useState('')
    const { id } = useParams();
    const url = "http://localhost:3000/employees/" + id;
    const navigate = useNavigate();

    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = async () => {
        let data = await fetch(url);
        data = await data.json();

        setName(data.name)
        setAge(data.age)
        setPosition(data.position)
        setDepartment(data.department)
        setSalary(data.salary)
    }

    const updateUserData = async () => {
        let data = await fetch(url, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, age, position, department, salary })
        });
        data = await data.json();
        if (data) {
            navigate("/")
        }
    }

    const onFinish = (values) => {
        updateUserData(values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <NavLink className="adduser-link" to="/">Back</NavLink>
            <div style={{ textAlign: "center" }}>
                <h1>Edit Users</h1>

                <Form
                    key={name}
                    style={{ maxWidth: "300px", marginLeft: "580px" }}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    // initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label='Name'
                        name="name"
                        rules={[{ required: true, message: 'Please enter your name' }]}
                    > <Input value={name} onChange={(e) => setName(e.target.value)} /></Form.Item>
                    <Form.Item
                        label='Age'
                        name="age"
                        rules={[{ required: true, message: 'Please enter your age' }]}
                    > <Input value={age} onChange={(e) => setAge(e.target.value)} /></Form.Item>
                    <Form.Item
                        label='Position'
                        name="position"
                        rules={[{ required: true, message: 'Please enter your position' }]}
                    > <Input value={position} onChange={(e) => setPosition(e.target.value)} /></Form.Item>
                    <Form.Item
                        label='Department'
                        name="department"
                        rules={[{ required: true, message: 'Please enter your department' }]}
                    > <Input value={department} onChange={(e) => setDepartment(e.target.value)} /></Form.Item>
                    <Form.Item
                        label='Salary'
                        name="salary"
                        rules={[{ required: true, message: 'Please enter your salary' }]}
                    > <Input value={salary} onChange={(e) => setSalary(e.target.value)} /></Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Update User
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
    )
}

export default EditUser

{/* <input type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Name" />
                <br /><br />
                <input type="number" value={age} onChange={(event) => setAge(event.target.value)} placeholder="Age" />
                <br /><br />
                <input type="text" value={position} onChange={(event) => setPosition(event.target.value)} placeholder="Position" />
                <br /><br />
                <input type="text" value={department} onChange={(event) => setDepartment(event.target.value)} placeholder="Department" />
                <br /><br />
                <input type="number" value={salary} onChange={(event) => setSalary(event.target.value)} placeholder="Salary" />
                <br /><br />
                <Button onClick={updateUserData }>Update User</Button> */}
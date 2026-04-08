import { NavLink, useNavigate, useParams } from "react-router"
import { Button, Form, Input } from "antd"
import { useState, useEffect } from "react";
import Popup from "reactjs-popup";

function UserForm({ editForm }) {
    // const [name, setName] = useState('')
    // const [age, setAge] = useState('')
    // const [position, setPosition] = useState('')
    // const [department, setDepartment] = useState('')
    // const [salary, setSalary] = useState('')
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const { id } = useParams();
    const baseurl = "http://localhost:3000/employees";
    const navigate = useNavigate();
    const [form] = Form.useForm();

    // useEffect(() => {
    //     if (editForm && userData) {
    //         form.setFieldValue({
    //             name: userData.name,
    //             age: userData.age,
    //             position: userData.position,
    //             department: userData.department,
    //             salary: userData.salary,
    //         });
    //         console.log(userData);

    //     }
    // }, [editForm, userData]);

    useEffect(() => {
        if (editForm && id) {
            fetch(`${baseurl}/${id}`)
                .then(res => res.json())
                .then(data => {
                    form.setFieldsValue({
                        name: data.name,
                        age: data.age,
                        position: data.position,
                        department: data.department,
                        salary: data.salary
                    });
                });
        }
    }, [editForm, id, form]);

    const handleSubmit = async (values) => {
        const url = editForm ? `${baseurl}/${id}` : baseurl;
        const method = editForm ? "PUT" : "POST";

        let response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        });

        let data = await response.json();

        if (data) {
            setMessage(editForm ? "User Updated Successfully!" : "User Added Successfully!")
            setOpen(true);
            setTimeout(() => {
                // setOpen(false);
                navigate("/");
            }, 2000)
        }
    };

    const onFinish = (values) => {
        handleSubmit(values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <NavLink className="adduser-link" to="/">⬅ Back</NavLink>
            <Popup open={open} closeOnDocumentClick={false} className="top-right-popup">
                <div className="popup-box">
                    <h3>{message}</h3>
                    <div className="progress-bar"></div>
                </div>
            </Popup>

            <div style={{ textAlign: "center" }}>
                <h1>{editForm ? "Edit User" : "Add New User"}</h1>
                <Form
                    key={id}
                    style={{ maxWidth: "300px", marginLeft: "580px" }}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label='Name'
                        name="name"
                        rules={[{ required: true, min: 3, message: 'Please enter your name' }]}
                    > <Input /></Form.Item>
                    <Form.Item
                        label='Age'
                        name="age"
                        rules={[
                            { required: true, message: 'Please enter your age' },
                            {
                                validator: (_, value) => {
                                    // if (!value) return Promise.reject('Please enter your age');

                                    const age = Number(value);

                                    if (isNaN(age)) {
                                        return Promise.reject('Age must be a number');
                                    }

                                    if (age < 18) {
                                        return Promise.reject('Age must be above 18');
                                    }

                                    if (age > 99) {
                                        return Promise.reject('Age must be below 99');
                                    }

                                    return Promise.resolve();
                                }
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Position'
                        name="position"
                        rules={[{ required: true, min: 3, message: 'Please enter your position' }]}
                    > <Input /></Form.Item>
                    <Form.Item
                        label='Department'
                        name="department"
                        rules={[{ required: true, min: 3, message: 'Please enter your department' }]}
                    > <Input /></Form.Item>
                    <Form.Item
                        label='Salary'
                        name="salary"
                        rules={[{ required: true, message: 'Please enter your salary' }]}
                    > <Input type="number" /></Form.Item>

                    <Form.Item shouldUpdate label={null}>
                        {() => (
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="submit-btn"
                                disabled={
                                    !form.isFieldsTouched(true) ||
                                    form.getFieldsError().some(({ errors }) => errors.length)
                                }
                                block
                            >
                                {editForm ? "Update User" : "Add User"}
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default UserForm

// const getUserData = async () => {
//     let data = await fetch(`${baseurl}/${id}`);
//     data = await data.json();

//     setName(data.name)
//     setAge(data.age)
//     setPosition(data.position)
//     setDepartment(data.department)
//     setSalary(data.salary)
// }

{/* <Form.Item
                        label='Age'
                        name="age"
                        rules={[{ required: true, message: 'Please enter your age' },
                        { type: 'number', message: 'Age must be number' },
                        { min: 18, message: 'Age must be above 18' },
                        { max: 99, message: 'Age must be below 99' },]}
                    > <Input type="number" /></Form.Item> */}

{/* <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            {editForm ? "Update User" : "Add User"}
                        </Button>
                    </Form.Item> */}
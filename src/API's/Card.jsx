import { Card, Pagination, Button } from "antd"
import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router";

function CardData() {
    const [cardData, setcardData] = useState([])
    const [search, setSearch] = useState("");
    const url = "http://localhost:3000/employees";
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    useEffect(() => {
        getCardData();
    }, [])

    async function getCardData() {
        let data = await fetch(url);
        data = await data.json();
        data.sort((a, b) => a.name.localeCompare(b.name));
        setcardData(data);
        //console.log(data.employees);
    }

    const filteredData = cardData.filter((item) => {
        return (item.name || "")
            .toLowerCase()
            .includes(search.toLowerCase());
    });

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

    const deleteUser = async (id) => {
        let data = await fetch(url + "/" + id, {
            method: 'delete'
        });
        data = await data.json()
        console.log(data);
        getCardData()
    }

    const editUser = (user) => {
        navigate("/edit/" + user.id, { state: user });
    }

    return (
        <div style={{ marginRight: "20px" }}>
            <h1>Display data of API as card</h1>
            <NavLink className="card-link" to="/addusers">Add Users</NavLink>

            <input
                type="text"
                placeholder="Search by Name"
                onChange={(e) => {
                    setSearch(e.target.value)
                }}
            /><br /><br />
            <div style={{ display: 'flex', flexWrap: "wrap", gap: "15px" }}>
                {
                    paginatedData.map((data) => {
                        return (
                            <Card
                                key={data.id}
                                hoverable
                                style={{ width: "250px", height: "200px" }}
                            >
                                {data.name}<br />
                                {data.age}<br />
                                {data.position}<br />
                                {data.department}<br />
                                {data.salary}<br />
                                <Button className="button" onClick={() => deleteUser(data.id)}>🗑️</Button>
                                <Button className="button1" onClick={() => editUser(data)}>✎</Button>
                            </Card>
                        )
                    })
                }
                <Pagination
                    pageSize={pageSize}
                    total={filteredData.length}
                    // showSizeChanger={true}
                    // pageSizeOptions={['5', '10', '15', '20']}
                    onChange={(page) => setCurrentPage(page)}
                    style={{ marginTop: "20px", marginLeft: "1000px" }}
                />
            </div>
        </div>
    )
}

export default CardData
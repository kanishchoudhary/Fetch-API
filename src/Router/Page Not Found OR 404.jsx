import { Link } from "react-router"

function PageNotFound() {
    return (
        <div style={{textAlign:'center'}}>
            <h1>Page Not Found</h1>
            <div>
                <Link to="/">Go to Home Page</Link>
            </div>
            <img src="https://www.shutterstock.com/image-vector/404-error-icon-vector-symbol-260nw-1545236357.jpg" alt="" />
        </div>
    )
}

export default PageNotFound
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../actions/userActions";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

function Header() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user, isAuthenticated } = useSelector(
		(state) => state.persistedReducer.user
	);
	const [admin, setAdmin] = useState("none");
	const [userPanel, setUserPanel] = useState("none");
	const [loginRegister, setLoginRegister] = useState("inline-block");
	const [logout, setLogout] = useState("none");
	const LogoutHandler = () => {
		dispatch(logoutUser());
		navigate("/");
		toast.success("logged out successfully");
	};

	useEffect(() => {
		if (isAuthenticated && user && user.isAdmin === true) {
			setAdmin("inline-block");
			setUserPanel("none");
			setLoginRegister("none");
			setLogout("inline-block");
		} else if (isAuthenticated && user && user.isAdmin === false) {
			setAdmin("none");
			setUserPanel("inline-block");
			setLoginRegister("none");
			setLogout("inline-block");
		} else {
			setAdmin("none");
			setUserPanel("none");
			setLoginRegister("inline-block");
			setLogout("none");
		}
	}, [isAuthenticated, user]);

	return (
		<>
			<Navbar bg="dark" variant="dark">
				<Container>
					<Navbar.Brand>DEMO INVESTMENTS</Navbar.Brand>
					<Nav className="me-auto">
						<LinkContainer to={"/home"} style={{ display: userPanel }}>
							<Nav.Link>Home</Nav.Link>
						</LinkContainer>
						<LinkContainer to={"/invest"} style={{ display: userPanel }}>
							<Nav.Link>Invest</Nav.Link>
						</LinkContainer>
						<LinkContainer to={"/user"} style={{ display: userPanel }}>
							<Nav.Link>{user && user.firstName}</Nav.Link>
						</LinkContainer>
						<LinkContainer to={"/Admin"} style={{ display: admin }}>
							<Nav.Link>Admin</Nav.Link>
						</LinkContainer>
						<LinkContainer to={"/Register"} style={{ display: loginRegister }}>
							<Nav.Link>Register</Nav.Link>
						</LinkContainer>

						<Nav.Link
							href=""
							onClick={LogoutHandler}
							style={{ display: logout }}
						>
							Logout
						</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
		</>
	);
}

export default Header;

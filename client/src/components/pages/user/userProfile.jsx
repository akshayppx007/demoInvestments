import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	getUserProfile,
	updateUserProfile,
	clearErrors,
} from "../../../actions/userActions";
import { useEffect } from "react";
import { UPDATE_PROFILE_RESET } from "../../../constants/userconstants";
import Loader from "../../layouts/loader";
import { toast } from "react-toastify";

function UserProfile() {
	const [validated, setValidated] = useState(false);
	const { user } = useSelector((state) => state.persistedReducer.user);
	const { loading, isUpdated, error } = useSelector(
		(state) => state.updateUser
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState(user ? user.firstName : "");
	const [lastName, setLastName] = useState(user ? user.lastName : "");
	const [address, setAddress] = useState(user ? user.address : "");
	const [phoneNumber, setPhoneNumber] = useState(user ? user.phoneNumber : "");



	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			const formData = new FormData();
			formData.set("firstName", firstName);
			formData.set("lastName", lastName);
			formData.set("address", address);
			formData.set("phoneNumber", phoneNumber);
		dispatch(updateUserProfile(formData));
		}
		setValidated(true);
	};

	useEffect(() => {
		if (isUpdated) {
			toast.success("Profile updated successfully, please login again to see changes");
			navigate("/home");

			dispatch({ type: UPDATE_PROFILE_RESET });
		}
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, error, isUpdated, navigate]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<Form
					noValidate
					validated={validated}
					onSubmit={handleSubmit}
					encType="application/json"
				>
					<Row className="mt-5 justify-content-md-center">
						<Col md={6}>
							<h1>Profile</h1>
							<Form.Group controlId="validationCustom01" className="mt-3">
								<Form.Label>First Name</Form.Label>
								<Form.Control
									type="text"
									defaultValue={firstName}
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</Form.Group>

							<Form.Group controlId="validationCustom02" className="mt-3">
								<Form.Label>Last Name</Form.Label>
								<Form.Control
									type="text"
									defaultValue={lastName}
									onChange={(e) => setLastName(e.target.value)}
								/>
							</Form.Group>
							<Form.Group controlId="validationCustom03" className="mt-3">
								<Form.Label>Address</Form.Label>
								<Form.Control
									type="text"
									defaultValue={address}
									onChange={(e) => setAddress(e.target.value)}
								/>
							</Form.Group>
							<Form.Group controlId="validationCustom03" className="mt-3">
								<Form.Label>Phone Number</Form.Label>
								<Form.Control
									type="text"
									defaultValue={phoneNumber}
									onChange={(e) => setPhoneNumber(e.target.value)}
								/>
							</Form.Group>

							<Button type="submit" className="mt-4">
								Update
							</Button>
						</Col>
					</Row>
				</Form>
			)}
		</>
	);
}

export default UserProfile;

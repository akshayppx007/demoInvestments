import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearErrors, withdrawInterest } from "../../../actions/investmentActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../layouts/loader";
import { INTEREST_WITHDRAWAL_RESET } from "../../../constants/investmentConstants";

function WithdrawInterest() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const [validated, setValidated] = useState(false);
	const [amount, setAmount] = useState();
	const { loading, success, error } = useSelector(
		(state) => state.interestWithdraw
	);
	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			const formData = new FormData();
			formData.append("interestPaid", parseInt(amount));
			dispatch(withdrawInterest(id, formData));
		}

		setValidated(true);
	};
	useEffect(() => {
		if (success === true) {
			navigate("/home");
			toast.success("Interest Withdrawn");
			dispatch({ type: INTEREST_WITHDRAWAL_RESET });
		}
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
	}, [success, error, navigate, dispatch]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<Container>
					<Row className="mt-5 justify-content-md-center">
						<Col md={6}>
							<h1>Withdraw Interest</h1>
							<Form noValidate validated={validated} onSubmit={handleSubmit}>
								<Form.Group controlId="validation0999" className="mt-2">
									<Form.Label>Amount</Form.Label>
									<Form.Control
										required
										name="Amount"
										type="number"
										placeholder="plaese enter the amount to withdraw"
										onChange={(e) => setAmount(e.target.value)}
									/>
								</Form.Group>
								<Button type="submit" className="mt-3">
									Withdraw
								</Button>
							</Form>
						</Col>
					</Row>
				</Container>
			)}
		</>
	);
}

export default WithdrawInterest;

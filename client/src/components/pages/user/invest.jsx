import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createInvestment } from "../../../actions/investmentActions";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Invest() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error, investment, success } = useSelector(
		(state) => state.investment
	);
	const [validated, setValidated] = useState(false);
	const [ageOfInvestment, setAgeOfInvestment] = useState(1);
	const interestPaid = investment?.interestPaid || 0;
	const currentTime = Date.now();
	const investmentTime = investment?.investmentTime || new Date(currentTime).toISOString();
	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.stopPropagation();
		} else {
			const formData = new FormData();
			formData.set(
				"investmentAmount",
				parseInt(event.target.InvestmentAmount.value)
			);
			formData.set("ageOfInvestment", parseInt(ageOfInvestment));
			formData.set("interestPaid", parseInt(interestPaid));
			formData.set("investmentTime", investmentTime);
			dispatch(createInvestment(formData));
			navigate("/home");
		}

		setValidated(true);
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
		}
	}, [error]);

	return (
		<Container>
			<Row className="mt-5 justify-content-md-center">
				<Col md={6}>
					<h1>Make Investment</h1>
					<Form
						noValidate
						validated={validated}
						onSubmit={handleSubmit}
						encType="application/json"
					>
						<Form.Group controlId="validationCustom0116" className="mt-3">
							<Form.Label>Investment Amount</Form.Label>
							<Form.Control
								name="InvestmentAmount"
								required
								type="number"
								placeholder=""
							/>
							<Form.Control.Feedback type="invalid">
								Please enter the amount to invest
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="validationCustom238" className="mt-3">
							<Form.Label>Age Of Investment</Form.Label>
							<Form.Select
								name="ageOfInvestment"
								type="number"
								onChange={(e) => setAgeOfInvestment(e.target.value)}
								value={ageOfInvestment}
							>
								<option value={1}>1 year</option>
								<option value={2}>2 years</option>
								<option value={3}>3 years</option>
							</Form.Select>
						</Form.Group>
						<Button type="submit" className="mt-3">
							Invest
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}

export default Invest;

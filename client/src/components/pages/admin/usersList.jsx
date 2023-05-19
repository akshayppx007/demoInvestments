import { useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Loader from "../../layouts/loader";
import { getAllInvestments } from "../../../actions/investmentActions";

function UserInvestments() {
	const dispatch = useDispatch();
	const { investments, loading } = useSelector(
		(state) => state.adminInvestments
	);
	useEffect(() => {
		dispatch(getAllInvestments());
	}, [dispatch]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<Container>
					<Row className="mt-4">
						<Col md={12}>
							<h1>User Investments</h1>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>#</th>
										<th>Name</th>
										<th>Investment Amount</th>
										<th>Age Of Investment</th>
										<th>Age Of Interest(in months)</th>
										<th>Interest Earned</th>
										<th>Interest Paid</th>
										<th>Interest Pending</th>
										<th>Total Returns</th>
										<th>status</th>
									</tr>
								</thead>
								<tbody>
									{investments &&
										investments.map((investment, index) => (
											<tr key={index}>
												<td>{index + 1}</td>
												<td>{investment && investment.user && investment.user.firstName}</td>
												<td>{investment.investmentAmount}</td>
												<td>{investment.investmentPeriod}</td>
												<td>{investment.ageOfInterest}</td>
												<td>{investment.interestEarned}</td>
												<td>{investment.interestPaid}</td>
												<td>{investment.interestPending}</td>
												<td>{investment.totalReturn}</td>
												<td>{investment.status}</td>
											</tr>
										))}
								</tbody>
							</Table>
						</Col>
					</Row>
				</Container>
			)}
		</>
	);
}

export default UserInvestments;

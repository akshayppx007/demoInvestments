import { Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserInvestments } from "../../../actions/investmentActions";
import Loader from "../../layouts/loader";
import { useNavigate } from "react-router-dom";

function UserHome() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { investments, loading } = useSelector((state) => state.userInvestments);

	useEffect(() => {
		dispatch(getUserInvestments());
	}, [dispatch, navigate]);

	return (
		<>
		{loading ? <Loader /> :
			<Container>
				<Row className="mt-4">
					<Col md={12}>
						<h1>Investments</h1>
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
                                    <th>Withdraw</th>
								</tr>
							</thead>
							<tbody>
							{investments && investments.map((investment, index) => (
                                <tr key={index}>
									<td>{index+1}</td>
									<td>{"me"}</td>
									<td>{investment.investmentAmount}</td>
									<td>{investment.investmentPeriod}</td>
									<td>{investment.ageOfInterest}</td>
									<td>{investment.interestEarned}</td>
									<td>{investment.interestPaid}</td>
									<td>{investment.interestPending}</td>
									<td>{investment.totalReturn}</td>
                                    <td><Link to={`/user/${investment._id}/withdraw/interest`}>
                                    <button className="btn btn-warning"><i className="bi bi-arrow-down"></i></button>
                                    </Link>
                                    </td>
								</tr>
							))}
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>
		}
		</>
	);
}

export default UserHome;
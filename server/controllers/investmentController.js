const Investment = require("../models/investmentModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../utils/catchAsyncErrors");

// create investment
exports.createInvestment = catchAsyncErrors(async (req, res, next) => {
	const { investmentAmount, ageOfInvestment, interestPaid, investmentTime } =
		req.body;

	if (!investmentAmount || !ageOfInvestment) {
		return next(new ErrorHandler("Please enter all fields", 400));
	}


	const interest = 3;
	let ageOfInterestInMonths = calculateAgeOfInterest();

	// Function to calculate the age of interest
	function calculateAgeOfInterest() {
		const currentDate = new Date();
		return (
			(currentDate.getFullYear() - new Date(investmentTime).getFullYear()) *
				12 +
			(currentDate.getMonth() - new Date(investmentTime).getMonth())
		);
	}

	// Update the age of interest every 16 days
	const thirtyOneDaysInterval = 16 * 24 * 60 * 60 * 1000;
	setInterval(() => {
		ageOfInterestInMonths = calculateAgeOfInterest();
	}, thirtyOneDaysInterval);

	let interestAmount =
		((investmentAmount * interest) / 100) * ageOfInterestInMonths;
	let remainingInterest = interestAmount - interestPaid;
	let totalAmountRemaining = investmentAmount + remainingInterest;
	let interestStatus = "";
	if (remainingInterest === 0) {
		interestStatus = "Completed";
	} else {
		interestStatus = "Pending";
	}

	const investment = await Investment.create({
		user: req.user.id,
		investmentAmount,
		investmentPeriod: ageOfInvestment,
		ageOfInterest: ageOfInterestInMonths,
		interestEarned: interestAmount,
		interestPaid,
		interestPending: remainingInterest,
		totalReturn: totalAmountRemaining,
		status: interestStatus,
		investmentTime,
	});

	res.status(201).json({
		success: true,
		investment,
	});
});

// withdraw interest
exports.withdrawInterest = catchAsyncErrors(async (req, res, next) => {
	const { interestPaid } = req.body;

	const investment = await Investment.findById(req.params.id);

	if (!investment) {
		return next(new ErrorHandler("Investment not found", 404));
	}

	let remainingInterest =  parseInt(investment.interestPending) - parseInt(interestPaid);
	if (remainingInterest < 0) {
		return next(
			new ErrorHandler("You can't withdraw more than your interest", 400)
		);
	}
	const totalAmountRemaining = investment.investmentAmount + remainingInterest;
	let interestStatus = "";
	if (remainingInterest === 0) {
		interestStatus = "Completed";
	} else {
		interestStatus = "Pending";
	}

	let interestAmount = parseInt(investment.interestPaid) + parseInt(interestPaid);

	const updatedInvestment = await Investment.findByIdAndUpdate(req.params.id,
		{
			interestPaid: interestAmount,
			interestPending: remainingInterest,
			totalReturn: totalAmountRemaining,
			status: interestStatus,
		},
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(200).json({
		success: true,
		updatedInvestment,
	});
});

// get user investments
exports.getUserInvestment = catchAsyncErrors(async (req, res, next) => {
	const investments = await Investment.find({ user: req.user.id });

	if (!investments) {
		return next(new ErrorHandler("Investment not found", 404));
	}

	res.status(200).json({
		success: true,
		investments,
	});
});

// admin
// get all investments
exports.getAllInvestments = catchAsyncErrors(async (req, res, next) => {
	const investments = await Investment.find().populate("user");

	res.status(200).json({
		success: true,
		investments,
	});
});

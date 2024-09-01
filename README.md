admin
	-- signin
	signout
	-- create doctor
	delete doctor
	-- create insurance compoany
	delete insurance co0mpany
	-- fetch all doctors
	-- fetch all insurances
	
common
	fetch patient profile
	fetch wallet addresses
	fetch authorized hospitals
	fetch authorized insurances
	fetch patient reports
	fetch unused addresses
	
doctor
	-- signin
	signout
	fetch profile
	create patient
	update patient report
	authorize doctor
	authorize insurance company
	fetch unauthorized doctors
	fetch unauthorized insurances
	fetch authorized patients
	
insurance
	-- signin
	signout
	fetch profile
	fetch authorized patients
	
patient
	signin
	signouit
	view profile
	view report
	generate report pdf
	
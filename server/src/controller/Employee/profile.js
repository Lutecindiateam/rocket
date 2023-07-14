const { validationResult } = require('express-validator');
const Employer = require('../../models/Employer/register');



exports.getEmployerProfile = async (req, res) => {
    try {
        // if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        const profile = await Employer.findById(req.params.id);

        if (!profile) {
            return res.status(400).json({ message: "Candidate Not Found" })
        }

        return res.status(200).json({
            code: 200,
            data: profile,
            message: "Employer details found",
            status: "success"
        })

    } catch (error) {
        console.log(error.message);
    }
}

exports.updateEmployerprofile = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array()[0].msg });
        }

        const {
            name,
            state,
            city,
            authorized_person,
            industry,
            authorized_mobile,
            address,
            website,
            email
        } = req.body

        const update = await Employer.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    name: name || Employer.name,
                    email: email || Employer.email,
                    state: state.name || Employer.state.name,
                    city: city.name || Employer.city.name,
                    website: website || Employer.website,
                    authorized_person: authorized_person || Employer.authorized_person,
                    authorized_mobile: authorized_mobile || Employer.authorized_mobile,
                    industry: industry || Employer.industry,
                    address: address || Employer.address
                },
            },
            { new: true }
        )

        if (!update) {
            return res.status(404)({ error: "Employer Not Found" })
        }
        // console.log(Employer);

        return res.status(200).json({
            code: 200,
            message: "Employer Profile Detail updated!!",
            status: "success"
        })
    } catch (error) {
        console.log(error.message);
    }
}
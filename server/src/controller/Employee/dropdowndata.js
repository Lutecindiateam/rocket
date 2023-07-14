const dropdown = require("../../models/Employer/dropdownlist");

exports.createCategoryDropdownList = async (req, res) => {
    try {
        const data = req.body; // Assuming req.body contains the array of data

        const documents = await dropdown.create({ category: data });

        return res.status(200).json({ documents });
    } catch (error) {

        console.log(error.message);
    }
}

exports.createEducationalDropdownList = async (req, res) => {
    // console.log(req);
    try {
        const data = req.body; // Assuming req.body contains the array of data

        const documents = await dropdown.create({ educationLevel: data });
        return res.status(200).json({ documents });
    } catch (error) {

        console.log(error.message);
    }
}
exports.createCourseDropdownList = async (req, res) => {
    // console.log(req.body);
    try {
        const data = req.body; // Assuming req.body contains the array of data
        if (data.educationOptions) {
            const documents = await dropdown.create({ educationOptions: data });
            return res.status(200).json({ documents });
        } else if(data.notice_period) {
            const documents = await dropdown.create({ notice_period: data.notice_period });
            return res.status(200).json({ documents });
        }else{
            const documents = await dropdown.create({ expiry_date: data.expiry_date });
            return res.status(200).json({ documents });
        }
    } catch (error) {

        console.log(error.message);
    }
}


exports.getAllformdetails = async (req, res) => {
    // console.log("req", req.body);

    try {
        const list = await dropdown.find();
        // console.log(list);
        return res.status(200).json({
            code: 200,
            data: { categories: list },
            message: "Job form fields found",
            status: "success"

        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "error" })
    }
}
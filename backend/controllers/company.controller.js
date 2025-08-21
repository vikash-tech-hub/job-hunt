import Company from '../models/company.model.js';

// REGISTER COMPANY
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false,
            });
        }

        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You cannot register the same company twice",
                success: false,
            });
        }

        company = await Company.create({
            name: companyName,
            userId: req.id,
        });

        return res.status(201).json({
            message: "Company registered successfully",
            success: true,
            company,
        });

    } catch (error) {
        console.log(error);
    }
};

// GET COMPANIES BY USER
export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId });
        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Companies found",
            success: true,
            companies,
        });
    } catch (error) {
        console.log(error);
    }
};

// GET COMPANY BY ID
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Company found",
            success: true,
            company,
        });
    } catch (error) {
        console.log(error);
    }
};

// UPDATE COMPANY
export const updateCompanyById = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;
        // cloudinary upload logic (optional)

        const updatedData = { name, description, website, location };
        const company = await Company.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Company information updated successfully",
            success: true,
            company,
        });
    } catch (error) {
        console.log(error);
    }
};

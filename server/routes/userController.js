export const registerUser = (req, res) => {
    res.json({ message: "User registered successfully", data: req.body });
};

export const loginUser = (req, res) => {
    res.json({ message: "User logged in successfully" });
};

export const getUserProfile = (req, res) => {
    res.json({ message: "User profile data" });
};

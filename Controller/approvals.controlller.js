exports.companyStatus = async (req, res) => {
  try {
    req.company.verified = req.body.status;

    await req.company.save();
    return res
      .status(204)
      .send(
        `Successfully chaneg the verification status to ${req.body.status}`
      );
  } catch (err) {
    console.log(err);
    return res.status(500).send(`Internal server error`);
  }
};

exports.userStatus = async (req, res) => {
  try {
    // we get from middleware
    req.existingUser.userStatus = req.body.status;
    await req.existingUser.save();
    return res
      .status(204)
      .send(
        `Successfully chaneg the userStatus to ${req.existingUser.userStatus}`
      );
  } catch (err) {
    console.log(err);
    return res.status(500).send(`Internal server error`);
  }
};

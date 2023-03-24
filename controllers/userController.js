import User from "../models/users.js";
import asyncHandler from "../middleware/errorHandler.js";
export const addUser = asyncHandler(async (req, res) => {
  try {
    const { name, cash, credit } = req.body;
    const newUser = await User.create({ name, cash, credit });
    return res.status(201).send(newUser);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({
      success: true,
      data: allUsers,
    });
  } catch (error) {
    res.status(404).send("error" + error);
  }
});

//user //id
export const getUser = asyncHandler(async (req, res, next) => {
  const shop = await User.findById(req.params.id);

  if (!shop) {
    return next(
      new Error(`Shop that end with '${req.params.id.slice(-6)}' not found`)
    );
  }

  res.status(200).json({
    success: true,
    data: shop,
  });
});

// export const updateById = asyncHandler(async (req, res) => {
//   try {
//     const User = await updateUserFromMongoose(req.body);
//     res.status(200).send(User);
//   } catch (error) {
//     res.status(404).send("error" + error);
//   }
// });
export const updateById = asyncHandler(async (req, res, next) => {
  const shop = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!shop) {
    return next(
      new Error(`Shop that end with '${req.params.id.slice(-6)}' not found`)
    );
  }

  res.status(200).json({
    success: true,
    data: shop,
  });
});
export const deletebyId = asyncHandler(async (req, res) => {
  const delteById = await User.findById(req.params.id);

  if (!delteById) {
    return next(
      new ErrorResponse(
        `Shop that ends with '${req.params.id.slice(-6)}' was not found`,
        404
      )
    );
  }

  delteById.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
// @desc    withdraw money from User
// @route   PUT /api/v1/users/withdraw/:id/:cash
// @access  Private
export const depositeUser = asyncHandler(async (req, res, next) => {
  const specificUser = await User.findById(req.params.id);

  specificUser.cash = Number(specificUser.cash) + Number(req.params.cash);
  const user = await User.findByIdAndUpdate(req.params.id, specificUser, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(
      new Error(`User that end with '${req.params.id.slice(-6)}' not found`)
    );
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

export const withdrawUser = asyncHandler(async (req, res, next) => {
  const specificUser = await User.findById(req.params.id);

  specificUser.cash = Number(specificUser.cash) - Number(req.params.cash);
  const user = await User.findByIdAndUpdate(req.params.id, specificUser, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(
      new Error(`User that end with '${req.params.id.slice(-6)}' not found`)
    );
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Transfer money from User1 to User2
// @route   PUT /api/v1/users/transfer/:id_from/:id_to/:cash
// @access  Private
export const transferUser = asyncHandler(async (req, res, next) => {
  const userFrom = await User.findById(req.params.id_from);
  const userTo = await User.findById(req.params.id_to);

  if (!userFrom) {
    return next(new Error(`User that ends with '${req.params.id_from.slice(-6)}' not found`));
  }

  if (!userTo) {
    return next(new Error(`User that ends with '${req.params.id_to.slice(-6)}' not found`));
  }

  const transferAmount = Number(req.params.cash);

  if (userFrom.cash < transferAmount) {
    return next(new Error('Insufficient funds'));
  }

  userFrom.cash -= transferAmount;
  userTo.cash += transferAmount;

  const updatedUserFrom = await User.findByIdAndUpdate(userFrom._id, userFrom, {
    new: true,
    runValidators: true,
  });

  const updatedUserTo = await User.findByIdAndUpdate(userTo._id, userTo, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: { updatedUserFrom, updatedUserTo }
  });
});
export const getUsersByCashAmount = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find();

    // Filter users based on cash amount
    const filteredUsers = users.filter(user => user.cash < 0);

    res.status(200).json({
      success: true,
      data: filteredUsers,
    });
  } catch (error) {
    res.status(404).send("error" + error);
  }
});

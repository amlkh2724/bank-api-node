// // import { Account } from "../models/accountModel.js";

// // export const updateAccount = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const { cash, credit } = req.body;
    
// //     const account = await Account.findOneAndUpdate(
// //       { _id: id },
// //       { cash, credit },
// //       { new: true } // Return the updated document
// //     );

// //     if (!account) {
// //       return res.status(404).json({ error: "Account not found" });
// //     }

// //     res.json(account);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // };



// import User from "../models/users.js";
// import Account from "../models/account.js";

// const updateAccount = async (req, res) => {
//   try {
//     const { accountId } = req.params;
//     const { cash, credit } = req.body;

//     // update account in db
//     const account = await Account.findByIdAndUpdate(
//       accountId,
//       {
//         cash,
//         credit,
//       },
//       { new: true }
//     );

//     // return error if account not found
//     if (!account) {
//       return res.status(404).json({
//         success: false,
//         message: "Account not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: account,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export default updateAccount;

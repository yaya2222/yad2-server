const userController = require("../DL/controllers/userController");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const createToken = (email) => {
  return jwt.sign({ email }, secret, { expiresIn: "1h" });
};

async function register({ name, email, password, tel}) {
  if (!name || !email || !password || !tel) throw new Error(`Missing data`);
  const salt = bcryptjs.genSaltSync(10);
  password = bcryptjs.hashSync(password + process.env.PASSWORD, salt);
  const newUser = await userController.create({
    name,
    email,
    password,
    tel,
  });
  if (!newUser) throw new Error("Creation failed");
  const token = createToken(newUser.email);
  return token;
}

async function login({ email, password }) {
  if (!email || !password) throw new Error("Missing data");
  const user = await userController.readOneByEmail(email).select("+password");
  if (
    !user ||
    !bcryptjs.compareSync(password + process.env.PASSWORD, user.password)
  )
    throw new Error("Email or password invalid");
  // if(!bcryptjs.compareSync(password+process.env.PASSWORD,user.password)) throw 'email or password invalid'
  const updateUser = await userController.updateByid(user._id, {
    lastConnection: new Date(),
  });
  const token = createToken(user.email);
  return token;
}

async function getDetailsAboutUserByEmail(email,isProduct) {
  if(!email) throw new Error("Missing data")
  let user
  if(isProduct){
     user = await userController.readOneByEmail(email).populate("idProducts");
  }else{
     user = await userController.readOneByEmail(email);
  }
  if (!user) throw new Error("This email is not exsit");
  return user;
}

async function readAll(filter) {
  const allUsers = await userController
    .readAll(filter)
    .select("+lastConnection +firstConnection");
  if (allUsers.length == 0) throw new Error("Not found users");
  return allUsers;
}

async function upDateUserByEmail(user, newData) {
  if ( newData.isAdmin === undefined) throw new Error("Not permission");
  const upDateUser = await userController.updateByid(user._id, newData);
  if (!upDateUser) throw new Error("The update failed");
  return upDateUser;
}

async function upDateUserForAdmin({ email, isAdmin }) {
    const user=await getDetailsAboutUserByEmail(email)
  const upDateUser = await userController.updateByid(user._id, {isAdmin});
  if (!upDateUser) throw new Error("The update failed");
  return upDateUser
}


module.exports = {
  register,
  login,
  getDetailsAboutUserByEmail,
  readAll,
  upDateUserByEmail,
  upDateUserForAdmin,
};

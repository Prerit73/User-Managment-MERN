import User from "../schema/user-schema.js";

export const addUser = async (request, response) => {
  const user = request.body;
  const newUser = new User(user);
  newUser.Active = true;

  try {
    await newUser.save();
    response.status(201).json(newUser);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

export const getUsers = async (request, response) => {
  try {
    const users = await User.find({Active:true}).limit(5).skip(request.params.count*5); //find all users which are active
    response.status(200).json(users);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getUser = async (request, response) => {
  try {
    //const user = await User.find({_id:request.params.id}); //find particular users
    const user = await User.findById(request.params.id);
    response.status(200).json(user);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

// export const adityaController = async (request, response) => {

//   try {
//     const user = UserDetails.fetchUser(request.param.id);
//     response.status(200).json(user);
//   }
// }

export const editUser = async (request, response) => {
  let user = request.body;
  const editUser = new User(user);

  try {
    await User.updateOne({ _id: request.params.id }, editUser);
    response.status(201).json(editUser);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

export const deleteUser = async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    await user.updateOne({ Active: false });
    response.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

export const getSearchUsers = async (request, response) => {
  try {
    const val = request.params.value;
    const users = await User.find({ name: { $regex: val, $options: "i" } }); //find all users
    response.status(200).json(users);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getSortedUsers = async (request, response) => {
  try {
    const val = request.params.value;
    const toggleCheck = await request.params.toggle;
    if (toggleCheck === "true") {
      const users = await User.find({ Active:true }).sort({[val]: 1}).limit(5).skip(request.params.count*5);
      response.status(200).json(users);
    } else {
      const users = await User.find({ Active:true }).sort({[val]: -1 }).limit(5).skip(request.params.count*5);
      response.status(200).json(users);
    }
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const registerUser = async (request, response) => {
  try {
    const user=await User.find({"check._username":request.body._username});
    if (user.length === 0) {
      const newRegisterUser = await User.create({
        check: request.body,
      });
      await newRegisterUser.save();
      response.status(201).json(newRegisterUser);
    } else {
      response.status(201).json([]);
    }
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

export const loginUser = async (request, response) => {
  try {
    const user = await User.find({
      check: {
        _username: request.params.username,
        password: request.params.password,
      },
    }); //find particular users
    if(user.length!==0){
      response.status(200).json(user[0].check._username);
    }else{
      response.status(200).json('');
    }
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

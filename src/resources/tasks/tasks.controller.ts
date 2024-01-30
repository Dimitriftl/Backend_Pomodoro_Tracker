const taskModel = require("./tasks.model");
const userModel = require("../users/users.model")

module.exports = {

async createTask(req: any, res: any) {
    const { userId } = req.body;
    
    try {
        const user = await userModel.findById(userId);
        
    }
},

  async getTasks(req: any, res: any) {
    const { userId } = req.body;

    try {
      const user = await userModel.findById(userId);
      return res.status(200).json({ ok: true, data: user.tasks });
    } catch (error) {
      return res.status(500).json({ ok: false, data: error });
    }
  },



  async updateTask(req: any, res:any) {
    const { userId, id } = req.body;

    const user = await userModel.findById(userId);
    const task = await taskModel.findByIdAndUpdate(id)

    try {
        const task = await taskModel.findByIdAndUpdate(id, req.body, {
            new: true
        })

    }



  }
};

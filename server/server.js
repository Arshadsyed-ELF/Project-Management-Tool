const express=require('express')
require('./db/config')
const admin=require('./db/Admin')
const Usermodel=require('./db/User')
const Project=require('./db/project')
const cors = require('cors');
const project = require('./db/project');
const Task=require('./db/task')

const app = express();
app.use(express.json())
// app.use(cors())  
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods: ["POST", "GET", "DELETE", "PUT"],
        credentials: true
    }
))
    // Admin //
    // Login api
app.post('/alogin', (req, resp) => {  
    const { email, password } = req.body;   
    admin.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    return resp.json({ Status: "Success", user: { id:user.id,name: user.name, email: user.email } })

                    // Jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{
                    //     if(err){
                    //         resp.send({result:" something went wrong"})
                    //     }
                    //     resp.send({user, auth:token})
                    // })
                } else {
                    resp.json("login fail")
                }
            } else {
                resp.json("no user")
            }
        })
})

// Register Api
app.post('/aregister', (req, resp) => {
    const { name, email, password } = req.body;
    admin.findOne({ email: email })
        .then(user => {
            if (user) {
                resp.json("Already have an account")
            } else {
                admin.create({ email: email, name: name, password: password })
                    .then(result => resp.json("  Account Created"))
                    .catch(err => resp.json(err))
            }
        }).catch(err => resp.json("failed to create"))
})
app.get('/users', async(req,resp)=>{
  let projects =await Usermodel.find()
  if(projects.length>0)
  {
   resp.send(projects)
  }
  else{
   resp.send("no result")
  }
})
app.get('/user/:id', async (req, res) => {
  const id = req.params.id;
  try {
      const event = await Usermodel.findById({_id: id });
      res.json(event);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

app.put('/user/edit/:id', (req, res) => {
  const id = req.params.id;
  Usermodel.findByIdAndUpdate({ _id: id }, {
      name: req.body.name,
     email: req.body.email,
      
  })
      .then(users => res.json(users))
      .catch(err => res.json(err))
})

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Usermodel.findByIdAndDelete(id);   
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});









            // user  //
//Login api
app.post('/login', (req, resp) => {  
    const { email, password } = req.body;   
    Usermodel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    return resp.json({ Status: "Success", user: { id:user.id,name: user.name, email: user.email } })

                    // Jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{
                    //     if(err){
                    //         resp.send({result:" something went wrong"})
                    //     }
                    //     resp.send({user, auth:token})
                    // })
                } else {
                    resp.json("login fail")
                }
            } else {
                resp.json("no user")
            }
        })
})



// Register Api
app.post('/register', (req, resp) => {
    const { name, email, password } = req.body;
    Usermodel.findOne({ email: email })
        .then(user => {
            if (user) {
                resp.json("Already have an account")
            } else {
                Usermodel.create({ email: email, name: name, password: password })
                    .then(result => resp.json("  Account Created"))
                    .catch(err => resp.json(err))
            }
        }).catch(err => resp.json("failed to create"))
})
   









app.put('/api/tasks/:taskId/subtasks/:subtaskIndex', (req, res) => {
  const { taskId, subtaskIndex } = req.params;
  const { userId } = req.body;

  // Find the task by taskId
  const task = Task.find(task => task._id === taskId);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  // Find the subtask by subtaskIndex
  const subtask = task.subtasks[subtaskIndex];

  if (!subtask) {
    return res.status(404).json({ message: 'Subtask not found' });
  }

  // Assign the subtask to the specified user
  subtask.userId = userId;

  // Update the database or perform any necessary operations
  // (In a real application, you'd typically update a database)

  res.json({ message: 'Subtask assigned successfully' });
});







// tasks api   //


app.get('/status', async (req, resp) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks from the database

    // Initialize counters for different task statuses
    let todoCount = 0;
    let inProgressCount = 0;
    let completedCount = 0;

    // Iterate through tasks and categorize them
    tasks.forEach((task) => {
      switch (task.status) {
        case 'Todo':
          todoCount++;
          break;
        case 'In Progress':
          inProgressCount++;
          break;
        case 'Completed':
          completedCount++;
          break;
        default:
          // Handle other statuses if necessary
          break;
      }
    });

    // Create an object to represent the categorized task counts
    const taskCounts = {
      todo: todoCount,
      inProgress: inProgressCount,
      completed: completedCount,
    };

    resp.json(taskCounts);
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: 'Internal server error' });
  }
});





app.get('/api/tasks', async(req,resp)=>{
  let projects =await Task.find()
  if(projects.length>0)
  {
   resp.send(projects)
  }
  else{
   resp.send("no result")
  }
})
app.get('/tasks/:id', async (req, res) => {
  const id = req.params.id;
  try {
      const event = await Task.findById({_id: id });
      res.json(event);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});
app.get('/api/tasks/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const tasks = await Task.find({userId}).sort('position');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

  app.post('/api/tasks', async (req, res) => {
    const { title, status, subtasks,userId,userName,description,date,assigneduser } = req.body;

    try {
      const task = new Task({ title, status, subtasks,userId,userName,description,date,assigneduser,  });
      await task.save();
      res.status(201).json(task);
    } catch (err) {
      res.status(400).json({ error: 'Failed to create task' });
    }
  });

// app.post('/api/tasks', async (req, res) => {
//   const { title, status, subtasks,userId,userName,date } = req.body;
//   try {
//     const newTask = await Task.create({ title, status, subtasks,userId,userName,description,date });
//     res.json(newTask);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server errords' });
//   }
// });
app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { status, subtasks } = req.body;
  try {
    await Task.findByIdAndUpdate(id, { status, subtasks });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/tasks/edit1/:id', (req, res) => {
  const id = req.params.id;
  Task.findByIdAndUpdate({ _id: id }, {
    userName:req.body.userName,
      title: req.body.title,
      date: req.body.date,
      status: req.body.status,
      
  })
      .then(users => res.json(users))
      .catch(err => res.json(err))
})
app.put('/api/tasks/edit/:id', (req, res) => {
  const id = req.params.id;
  Task.findByIdAndUpdate({ _id: id }, {
      title: req.body.title,
      date: req.body.date,
      status: req.body.status,
      
  })
      .then(users => res.json(users))
      .catch(err => res.json(err))
})

app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
//   app.put('/api/tasks/:id', async (req, res) => {
//     const { status } = req.body;

//     try {
//       await Task.findByIdAndUpdate(req.params.id, { status });
//       res.sendStatus(200);
//     } catch (err) {
//       res.status(400).json({ error: 'Failed to update task' });
//     }
//   });

//   app.delete('/api/tasks/:id', async (req, res) => {
//     let data = await Task.deleteOne(
//         { _id: req.params.id }
//     )
//     res.send(data)
// })


// app.post('/add-project',async (req,resp)=>{
//     let project= new Project(req.body)
//     let result= await project.save();
//     resp.send(result)
// })





//add-project Api
app.post('/add-project',(req,resp)=>{
        Project.create({
            title:req.body.title,
            description:req.body.description,
            userId:req.body.userId
        }).then(result=>{
           return resp.json(result)  
        }).catch(err => resp.json("failed to create"))
})
//get-project Api
app.get('/projects', async(req,resp)=>{
       let projects =await Project.find()
       if(projects.length>0)
       {
        resp.send(projects)
       }
       else{
        resp.send("no result")
       }
})



app.get('/projects/:userId', async (req, resp) => {
    const userId = req.params.userId;
    try {
      const projects = await Project.find({ userId });
      if (projects.length > 0) {
        resp.send(projects);
      } else {
        resp.send("No projects found for this user.");
      }
    } catch (error) {
      resp.status(500).send("Failed to fetch projects.");
    }
  });
  

  
  


// app.post('/logout', (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             console.error("Error destroying session:", err);
//             res.status(500).json({ message: "Logout failed" });
//         } else {
//             res.status(200).json({ message: "Logout successful" });
//         }
//     });
// });



app.listen(7000, () => {
    console.log("listening at 7000")
})
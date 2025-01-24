const express = require('express');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt')
const userModel = require('./models/users')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const recipeModel = require('./models/recipe')
const multer = require('multer');
const { ObjectId } = require('mongodb');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


function isLoggedIn(req, res, next) {
    const isUser = req.cookies.token ? true : false;
    if (!isUser) {
        return res.send("You must logged in first");
    }
    try {
        let data = jwt.verify(req.cookies.token, 'secret');
        req.user = data;
        next();
    } catch (error) {
        return res.send("invalid Access")
    }

}


function isRecipeMaker(req, res, next) {
    const isRcpMaker = req.user.role === 'recipeMaker' ? true : false;
    if (!req.user || !isRcpMaker) {
        return res.send('Invalid Recipe Maker');
    }
    next();
}

app.post('/register', async (req, res) => {
    try {
        let { username, email, password, role, conformPassword } = req.body;
        let user = await userModel.findOne({ email });
        if (user) return res.send("Email is already exist");

        bcrypt.genSalt(10, (ree, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                const createUser = await userModel.create({
                    username,
                    email,
                    password: hash,
                    conformPassword: hash,
                })
                let token = jwt.sign({ email, role: 'recipeMaker' }, 'secret')
                res.cookie('token', token);
                res.send(createUser);
            })
        })
    } catch (error) {
        console.log(error)
    }
})


app.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (!user) return res.send('Not found')
        const expiresInDays = 15;
        const expiresDate = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000);

        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    let token = jwt.sign({ email: user.email, role: user.role }, 'secret')
                    res.cookie('token', token, { expires: expiresDate, httpOnly: false, path: '/' });
                    res.send("You have logged in");
                } else {
                    res.send("Incorrect email or password");
                }
            })
        } else {
            return res.send("Email or Password is incorrect");
        }
    } catch (error) {
        console.log(error)
    }

})

app.get('/logout', (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            path: '/',
        })
        res.send("Cookie cleared")
    } catch (error) {
        console.log(error)
    }
})


app.get('/user', isLoggedIn, isRecipeMaker, async (req, res) => {
    try {
        let loggedUser = await userModel.findOne({ email: req.user.email })
        let profilePicOfseller = loggedUser.profilePic ? loggedUser.profilePic.toString('base64') : null;
        res.json({
            role: loggedUser.role,
            username: loggedUser.username,
            email: loggedUser.email,
            password: loggedUser.password,
            conformPassword: loggedUser.conformPassword,
            profilePic: profilePicOfseller,
            date: loggedUser.date,
            userRecipes: loggedUser.userRecipes
        });

    } catch (error) {
        console.log(error)
    }
})

app.post('/users-recipe-upload', isLoggedIn, isRecipeMaker, upload.single('image'), async (req, res) => {
    try {
        let userId = await userModel.findOne({ email: req.user.email })
        let { recipeName, description, steps, mealType, ingredients } = req.body;
        let uploadedRecipe = await recipeModel.create({
            recipeName,
            steps,
            mealType,
            description,
            ingredients,
            image: req.file.buffer,
            recipeMaker: userId._id
        })
        userId.userRecipes.push(uploadedRecipe._id);
        await userId.save();
        res.send(uploadedRecipe);
    } catch (error) {
        console.log(error)
    }

})

app.get('/users-recipe', isLoggedIn, isRecipeMaker, async (req, res) => {
    try {
        let loggedUser = await userModel.findOne({ email: req.user.email })
        const allRecipe = await recipeModel.find({ recipeMaker: loggedUser._id });
        const recipeWithImages = allRecipe.map((recipe) => {
            const imageRecipe = recipe.image ? recipe.image.toString('base64') : null;
            return {
                ...recipe.toObject(),
                image: imageRecipe
            };
        });
        res.json(recipeWithImages);

    } catch (error) {
        console.log(error)
    }
})

app.get('/users-recipe/:id', async (req, res) => {
    try {
        let recipe = await recipeModel.findOne({ _id: req.params.id })
        let recipeImage = recipe.image ? recipe.image.toString('base64') : null;

        res.json({
            _id: req.params.id,
            recipeName: recipe.recipeName,
            image: recipeImage,
            steps: recipe.steps,
            description: recipe.description,
            mealType: recipe.mealType,
            ingredients: recipe.ingredients,
            date: recipe.date
        });
    } catch (error) {
        console.log(error);
    }
})

app.put('/users-recipe/:id', isLoggedIn, isRecipeMaker, upload.single('image'), async (req, res) => {
    try {
        let recipeToUpdate = await recipeModel.findOne({ _id: req.params.id })
        let { recipeName, image, description, mealType, steps, ingredients, date } = req.body;

        let recipeUpdate = await recipeModel.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    recipeName: recipeName ? recipeName : recipeToUpdate.recipeName,
                    description: description ? description : recipeToUpdate.description,
                    mealType: mealType ? mealType : recipeToUpdate.mealType,
                    steps: steps ? steps : recipeToUpdate.steps,
                    ingredients: ingredients ? ingredients : recipeToUpdate.ingredients,
                    date,
                    image: req.file && req.file.buffer ? req.file.buffer : recipeToUpdate.image
                }
            },
            { new: true }
        )
        res.send(recipeUpdate);
    } catch (error) {
        console.log(error);
    }
})

app.delete('/users-recipe/:id', isLoggedIn, isRecipeMaker, async (req, res) => {
    try {
        let loggedUser = await userModel.findOne({ email: req.user.email })
        const recipeToRemove = new ObjectId(req.params.id);
        loggedUser.userRecipes = loggedUser.userRecipes.filter(item => !item.equals(recipeToRemove))
        await loggedUser.save();
        let deleteRecipe = await recipeModel.findOneAndDelete(
            { _id: req.params.id },
        )
        res.send(deleteRecipe);
    } catch (error) {
        console.log(error);
    }
})

app.get('/view-all-recipes', async (req, res) => {
    try {
        const recipeLists = await recipeModel.find();
        const recipeListsWithImage = recipeLists.map((recipe) => {
            const imageRecipe = recipe.image ? recipe.image.toString('base64') : null;
            return {
                ...recipe.toObject(),
                image: imageRecipe
            };
        })
        res.json(recipeListsWithImage);
    } catch (error) {

    }
})

app.post('/users/edit', isLoggedIn, isRecipeMaker, upload.single('image'), async (req, res) => {
    try {
        let loggedUser = await userModel.findOne({ email: req.user.email })
        let { username, password } = req.body;
        let updateUser = await userModel.updateOne(
            { email: loggedUser.email },
            {
                $set: {
                    username: username ? username : loggedUser.username,
                    password: password ? password : loggedUser.password,
                    profilePic: req.file && req.file.buffer ? req.file.buffer : loggedUser.profilePic
                }
            }
        )
        res.send({ updateUser, profilePic: req.file && req.file.buffer ? req.file.buffer : null });
    } catch (error) {
        console.log(error);
    }
})


app.get('/searchrecipe/:query', async (req, res) => {
    let searchedQuery = req.params.query
    if (searchedQuery === '') {
        return;
    }
    try {
        let searchedRecipe = await recipeModel.find({
            $or: [
                { recipeName: { $regex: searchedQuery, $options: 'i' } },
                { description: { $regex: searchedQuery, $options: 'i' } },
                { mealType: { $regex: searchedQuery, $options: 'i' } },
                { ingredients: { $regex: searchedQuery, $options: 'i' } },
                { steps: { $elemMatch: { instruction: { $regex: searchedQuery, $options: 'i' } } } }            ]
        })
        const recipeListsWithImage = searchedRecipe.map((recipe) => {
            const imageRecipe = recipe.image ? recipe.image.toString('base64') : null;
            return {
                ...recipe.toObject(),
                image: imageRecipe
            };
        })
        res.json(recipeListsWithImage)
    } catch (error) {
        console.log(error)
    }
})




app.listen(8080, (req, res) => {
    console.log("Server is running...")
})
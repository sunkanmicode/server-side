const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtgenerator');
const validEmail = require('../middleware/validEmail');
const auth = require('../middleware/auth')

router.post('/register', validEmail, async(req, res)=>{
    try {

        //1. desturcture{ name, email, password} from req.body
        const { name, email, password } = req.body;

        //2. check if the user is exist(if user exist throw error)
        const user = await pool.query
        ('SELECT * FROM users WHERE user_email = $1', [email])

        // res.json(user.rows)
        if(user.rows.length !== 0){
            return res.status(401).send("user already exist")
        }
        //3. Bcrypt  password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const bcryptPassword =  await bcrypt.hash(password, salt);

        //4. enter the newUser into database

        const newUser = await pool.query
        ('INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *', 
        [name, email, bcryptPassword]);
        // res.json(newUser.rows[0]);

        //5. generate Jwt Token

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({ token })

        
    } catch (err) {
        console.log(err.massage);
        res.status(500).send('server Error')
    }
});

router.post('/login', validEmail, async(req, res) => {
    try {

        //1. destructure req.body
        const { email, password } = req.body;

        //2. check if the user is  not exist (if not throw error)

        const user = await pool.query
        ('SELECT * FROM users WHERE user_email = $1', [email])
         
        if(user.rows.length === 0){
            res.status(401).json('Password and Email is Incorrect');
        }

        //3. check if the incomming password is same as user_password

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password)

        if(!validPassword){
            return res.status(401).json('Password and Email is Incorrect');
        };

        //4. get them token

        const token = jwtGenerator(user.rows[0].user_id);

        res.json({ token })

        
    } catch (err) {
        console.log(error.message);
        res.status(401).send("server Error")
    }
});


//verify token
router.get('/is-verify', auth, async(req, res)=>{
    try {

        res.json(true);
        
    } catch (err) {
        console.log(error.message);
        res.status(401).send("server Error")
    }
})


module.exports = router
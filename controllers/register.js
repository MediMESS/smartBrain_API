const handleRegister = (req, res, db, bcrypt) => {

    const {name, email, password} = req.body;
    bcrypt.hash(password, 10, function(err, hash) {
      const hashedPassword = hash;
      db('login').insert({
        email: email,
        hash: hashedPassword
      });
      db('users')
      .returning('*')
      .insert({
        name: name,
        email: email,
        joined: new Date()
      })
      .then(user =>{
        res.json(user[0])
      })
      .catch(err => {res.status(400).json("Error, Unable to register, account already exist")});

    });

}

module.exports = {
  handleRegister: handleRegister
};

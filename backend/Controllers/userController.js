const User = require('../models/User/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Contrôleur pour créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  try {
    // Récupérer les données de la requête
    const { username, email, password, firstname, name, address, number } = req.body

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10)

    // Créer un nouvel utilisateur
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      firstname,
      name,
      address,
      number
    })

    // Enregistrer l'utilisateur dans la base de données
    await newUser.save()

    // Retourner une réponse
    res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Contrôleur pour authentifier un utilisateur
exports.loginUser = async (req, res) => {
  try {
    // Récupérer les données de la requête
    const { username, password } = req.body

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Vérifier le mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password)
    console.log("le mot de passe ", password)
    console.log("le mot de passe ", passwordMatch)
    console.log("le mot de passe ", user.password)
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Générer un token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    // Retourner le token
    res.status(200).json({ token })
  } catch (error) {
    console.error('Error logging in user:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Contrôleur pour récupérer les détails d'un utilisateur
exports.getUserDetails = async (req, res) => {
  try {
    // Récupérer l'ID de l'utilisateur à partir du token JWT
    const userId = req.userId

    // Récupérer les détails de l'utilisateur depuis la base de données
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Retourner les détails de l'utilisateur
    res.status(200).json(user)
  } catch (error) {
    console.error('Error getting user details:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Contrôleur pour mettre à jour les informations de l'utilisateur
exports.updateUser = async (req, res) => {
  try {
    // Récupérer l'ID de l'utilisateur à partir du token JWT
    const userId = req.userId

    // Récupérer les données mises à jour de l'utilisateur depuis la requête
    const { username, email } = req.body

    // Mettre à jour les informations de l'utilisateur dans la base de données
    await User.findByIdAndUpdate(userId, { username, email })

    // Retourner une réponse
    res.status(200).json({ message: 'User updated successfully' })
  } catch (error) {
    console.error('Error updating user:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Contrôleur pour supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    // Récupérer l'ID de l'utilisateur à partir du token JWT
    const userId = req.userId

    // Supprimer l'utilisateur de la base de données
    await User.findByIdAndDelete(userId)

    // Retourner une réponse
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}



const Property = require('../models/Properties/propertyModel')

exports.createProperty = async (req, res) => {
  try {
    const propertyData = req.body

    const userId = req.user.id

    propertyData.user = userId

    const newProperty = new Property(propertyData)
    
    await newProperty.save()

    res.status(201).json({ message: 'Property created successfully', property: newProperty })
  } catch (error) {
    console.error('Error creating property:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

exports.getAllproperties = async (req, res) => {
  try {

    const properties = await Property.find()

    res.status(200).json(properties)
  } catch (error) {
    console.error('Error getting properties:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

exports.getPropertyDetails = async (req, res) => {
  try {
    const propertyId = req.params.id
    
    const property = await Property.findById(propertyId)
    if (!property) {
      return res.status(404).json({ message: 'Property not found' })
    }

    res.status(200).json(property)
  } catch (error) {
    console.error('Error getting property details:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

exports.updateProperty = async (req, res) => {
  try {
    // Récupérer l'ID de la propriété depuis la requête
    const propertyId = req.params.id

    // Récupérer les données mises à jour de la propriété depuis la requête
    const updatedPropertyData = req.body

    // Mettre à jour les informations de la propriété dans la base de données
    await Property.findByIdAndUpdate(propertyId, updatedPropertyData)

    // Retourner une réponse
    res.status(200).json({ message: 'Property updated successfully' })
  } catch (error) {
    console.error('Error updating property:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Contrôleur pour supprimer une propriété
exports.deleteProperty = async (req, res) => {
  try {
    // Récupérer l'ID de la propriété depuis la requête
    const propertyId = req.params.id

    // Supprimer la propriété de la base de données
    await Property.findByIdAndDelete(propertyId)

    // Retourner une réponse
    res.status(200).json({ message: 'Property deleted successfully' })
  } catch (error) {
    console.error('Error deleting property:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

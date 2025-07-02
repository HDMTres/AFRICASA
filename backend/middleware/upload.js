const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Créer le dossier uploads s'il n'existe pas
const uploadsDir = path.join(__dirname, '../uploads');
const profilePicturesDir = path.join(uploadsDir, 'profile-pictures');

[uploadsDir, profilePicturesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configuration du stockage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, profilePicturesDir);
  },
  filename: function (req, file, cb) {
    // Générer un nom unique avec l'ID utilisateur et timestamp
    const userId = req.userId;
    const timestamp = Date.now();
    const extension = path.extname(file.originalname);
    cb(null, `profile_${userId}_${timestamp}${extension}`);
  }
});

// Filtres pour les types de fichiers acceptés
const fileFilter = (req, file, cb) => {
  // Vérifier le type MIME
  if (file.mimetype.startsWith('image/')) {
    // Types d'images acceptés
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Type de fichier non supporté. Utilisez JPEG, PNG, GIF ou WebP.'), false);
    }
  } else {
    cb(new Error('Seules les images sont autorisées.'), false);
  }
};

// Configuration de multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
    files: 1 // Une seule image
  },
  fileFilter: fileFilter
});

// Middleware pour gérer l'upload de photo de profil
const uploadProfilePicture = upload.single('profilePhoto');

// Wrapper pour gérer les erreurs multer
const handleProfilePictureUpload = (req, res, next) => {
  uploadProfilePicture(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ 
          message: 'Fichier trop volumineux. Taille maximum : 5MB' 
        });
      } else if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({ 
          message: 'Trop de fichiers. Une seule image autorisée.' 
        });
      }
      return res.status(400).json({ 
        message: `Erreur d'upload: ${err.message}` 
      });
    } else if (err) {
      return res.status(400).json({ 
        message: err.message 
      });
    }
    next();
  });
};

// Fonction utilitaire pour supprimer l'ancienne photo
const deleteOldProfilePicture = (filename) => {
  if (filename) {
    const oldPath = path.join(profilePicturesDir, path.basename(filename));
    fs.unlink(oldPath, (err) => {
      if (err && err.code !== 'ENOENT') {
        console.error('Erreur lors de la suppression de l\'ancienne photo:', err);
      }
    });
  }
};

module.exports = {
  handleProfilePictureUpload,
  deleteOldProfilePicture,
  profilePicturesDir
};

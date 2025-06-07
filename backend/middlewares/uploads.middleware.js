import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    // console.log(`Uploading profile image: ${file.originalname}`);

    return {
      folder: 'profile_photos',
      allowed_formats: ['jpg', 'jpeg', 'png'],
      resource_type: 'image',
      transformation: [
        { width: 300, height: 300, crop: 'thumb', gravity: 'face' }, // crop to face for profile photo
        { quality: 'auto' }
      ],
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`
    };
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error('Invalid file type. Only JPG and PNG images are allowed for profile photos.');
    error.code = 'LIMIT_FILE_TYPE';
    return cb(error, false);
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
    files: 1
  },
  onError: (err, next) => {
    console.error('Multer error:', err);
    next(err);
  }
});

const uploadProfileImage = (req, res, next) => {
  const uploadSingle = upload.single('profilePic'); // field name must match frontend

  uploadSingle(req, res, (err) => {
    if (err) {
      console.error('Upload error:', err.message);

      if (err.code === 'LIMIT_FILE_TYPE') {
        return res.status(400).json({ 
          success: false,
          message: err.message
        });
      }

      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File too large. Maximum size is 5MB.'
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Profile photo upload failed',
      });
    }

    if (req.file) {
      console.log('Profile photo uploaded:', {
        originalname: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        cloudinaryUrl: req.file.path
      });
    }

    next();
  });
};

export default uploadProfileImage;

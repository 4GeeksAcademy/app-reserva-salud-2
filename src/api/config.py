import os
import cloudinary
import cloudinary.uploader
import cloudinary.api

cloudinary_name = os.getenv("CLOUDINARY_NAME")
cloudinary_api_key = os.getenv("CLOUDINARY_API_KEY")
cloudinary_secret = os.getenv("CLOUDINARY_SECRET")

# Configuration       
cloudinary.config( 
    cloud_name = cloudinary_name, 
    api_key = cloudinary_api_key, 
    api_secret = cloudinary_secret,
    secure=True
)
import React, { useState, useRef } from "react";
import { FiCamera, FiX } from "react-icons/fi";


const ProfilePhotoSelector = ({ onPhotoSelect }) => {
 const [selectedPhoto, setSelectedPhoto] = useState(null);
 const fileInputRef = useRef(null);


 const handlePhotoChange = (e) => {
   const file = e.target.files[0];
   if (file) {
     setSelectedPhoto(file);
     if (onPhotoSelect) {
       onPhotoSelect(file);
     }
   }
 };


 const handleRemovePhoto = () => {
   setSelectedPhoto(null);
   if (onPhotoSelect) {
     onPhotoSelect(null);
   }
   if (fileInputRef.current) {
     fileInputRef.current.value = "";
   }
 };


 const triggerFileInput = () => {
   fileInputRef.current.click();
 };


 return (
   <div className="mb-6 flex flex-col items-center justify-center">
     <label className="block text-xs text-gray-600 mb-2">
       Profile Picture {!selectedPhoto}
     </label>


     <div className="flex items-center gap-4">
       {/* Photo Preview with Camera Logo */}
       <div className="relative group">
         <div
           className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-300 cursor-pointer"
           onClick={triggerFileInput}
         >
           {selectedPhoto ? (
             <>
               <img
                 src={URL.createObjectURL(selectedPhoto)}
                 alt="Profile preview"
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <FiCamera className="text-white text-xl" />
               </div>
             </>
           ) : (
             <div className="flex flex-col items-center">
               <FiCamera className="text-gray-400 text-2xl mb-1" />
               <span className="text-xs text-gray-500">Add Photo</span>
             </div>
           )}
         </div>


         {/* Remove Button */}
         {selectedPhoto && (
           <button
             type="button"
             onClick={handleRemovePhoto}
             className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
             aria-label="Remove photo"
           >
             <FiX className="text-sm" />
           </button>
         )}
       </div>


       {/* Hidden file input */}
       <input
         type="file"
         accept="image/*"
         onChange={handlePhotoChange}
         className="hidden"
         ref={fileInputRef}
       />


       {/* File name display
       {selectedPhoto && (
         <span className="text-xs text-gray-500 ml-2 truncate max-w-[120px]">
           {selectedPhoto.name}
         </span>
       )} */}
     </div>
   </div>
 );
};


export default ProfilePhotoSelector;
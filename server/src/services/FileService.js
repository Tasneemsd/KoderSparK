// src/services/FileService.js
const path = require('path');
const fs = require('fs');

class FileService {
  static async saveFile(file, folderName) {
    const uploadDir = path.join(__dirname, '..', 'uploads', folderName);
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, file.name);
    await file.mv(filePath); // assuming file comes from express-fileupload
    return `/uploads/${folderName}/${file.name}`;
  }

  static async deleteFile(filePath) {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
  }
}

module.exports = FileService;

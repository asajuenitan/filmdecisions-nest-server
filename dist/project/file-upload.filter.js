"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
exports.fileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(docx|pdf)$/)) {
        return callback(new Error('The file formats accepted: .docx/.pdf'), false);
    }
    callback(null, true);
};
exports.editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = path_1.extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
//# sourceMappingURL=file-upload.filter.js.map
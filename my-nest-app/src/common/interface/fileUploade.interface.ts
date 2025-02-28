export interface FileUpload {
    filename: string
    mimetype: string
    encoding: string

    createReadStream: () => any
  }
  


















  //temprary folder me file uploade karna hai or bad me agar wo uploade karnna hai file
  //  ka path or uploade ka path same hua to tempare folder me uploade karana hai oe 3day me use nahi kiya
  //  to file se remove karna hai 
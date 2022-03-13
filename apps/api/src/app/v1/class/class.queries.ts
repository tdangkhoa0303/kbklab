export const importClass = async (req: Request) => {
  const form = new multiparty.Form();
  const errorFields: string[] = [];
  const user = req.user as IUser;
  form.parse(req, async (err, fields, files) => {
    if (err || !files) {
      return next(new AppError('Please upload a file', 400));
    }
    if (!fields.classCode) {
      return next(new AppError('Class need classCode when creating', 400));
    }
    if (!fields.lecturerId) {
      return next(new AppError('Class need lecturer when creating', 400));
    }
    if (!files.file) {
      return next(new AppError('Class need file students when creating', 400));
    }
    const code = fields.classCode[0];
    const lecturerId = user.role === UserRole.lecturer ? user.id : fields.lecturerId[0];
    const lecturer = await User.findById(lecturerId);
    const filePath = files.file[0].path;
    try {
      const fileClass = reader.readFile(filePath);
      const listUserClass = reader.utils.sheet_to_json<ImportStudentDTO>(
        fileClass.Sheets[fileClass.SheetNames[0]],
      );
      const students: IUser[] = [];
      for (let index = 0; index < listUserClass.length; index++) {
        const student = listUserClass[index];
        const newStudent = await createUser(student.email, student.fullName, UserRole.student);
        if (typeof newStudent !== 'string') {
          students.push(newStudent);
        } else {
          errorFields.push(newStudent);
        }
      }
      const newClass: IClass = await Class.create({
        lecturer: lecturer,
        students: students,
        code: code,
        classLabs: [],
      });

      logger.info(req.user ? req.user.id : 'Anonymous' + ' ' + req.path + ' ' + req.method);

      res.status(200).json({
        errorFields,
        data: newClass,
      });
    } catch (err: any) {
      return next(new AppError('Duplicated classCode ' + err.keyValue.code, 400));
    }
  });
}

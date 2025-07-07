-- CreateTable
CREATE TABLE "StudentCourses" (
    "courseId" INTEGER NOT NULL,
    "studentEmail" TEXT NOT NULL,

    CONSTRAINT "StudentCourses_pkey" PRIMARY KEY ("courseId","studentEmail")
);

-- AddForeignKey
ALTER TABLE "StudentCourses" ADD CONSTRAINT "StudentCourses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCourses" ADD CONSTRAINT "StudentCourses_studentEmail_fkey" FOREIGN KEY ("studentEmail") REFERENCES "student"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

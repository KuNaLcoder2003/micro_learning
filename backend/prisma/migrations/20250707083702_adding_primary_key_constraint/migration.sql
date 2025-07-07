-- AlterTable
ALTER TABLE "Course" ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Video" ADD CONSTRAINT "Video_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Week" ADD CONSTRAINT "Week_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "student" ADD CONSTRAINT "student_pkey" PRIMARY KEY ("id");

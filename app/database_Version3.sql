CREATE DATABASE quran_center CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE quran_center;

CREATE TABLE teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    national_id VARCHAR(20) NOT NULL,
    registration_hijri VARCHAR(20),
    teacher_id INT,
    memorized_at_registration VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);

CREATE TABLE followups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    teacher_id INT,
    year_hijri VARCHAR(10),
    month_hijri VARCHAR(10),
    memorize_plan VARCHAR(100),
    from_surah VARCHAR(50),
    from_ayah VARCHAR(10),
    to_surah VARCHAR(50),
    to_ayah VARCHAR(10),
    memorize_faces INT,
    review_plan VARCHAR(100),
    review_faces INT,
    memorize_grade INT,
    tajweed_grade INT,
    result_grade INT,
    review_grade INT,
    review_tajweed_grade INT,
    review_result_grade INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);
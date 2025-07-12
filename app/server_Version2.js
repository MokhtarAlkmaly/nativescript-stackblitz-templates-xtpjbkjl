const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// إعداد الاتصال بقاعدة البيانات
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'quran_center'
});

// --- طلاب ---
app.get('/api/students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) return res.status(500).json({error: err});
        res.json(results);
    });
});

app.post('/api/students', (req, res) => {
    const { name, national_id, registration_hijri, teacher_id, memorized_at_registration } = req.body;
    db.query(
        'INSERT INTO students (name, national_id, registration_hijri, teacher_id, memorized_at_registration) VALUES (?, ?, ?, ?, ?)',
        [name, national_id, registration_hijri, teacher_id, memorized_at_registration],
        (err, result) => {
            if (err) return res.status(500).json({error: err});
            res.json({id: result.insertId, ...req.body});
        }
    );
});

// --- تعديل طالب ---
app.put('/api/students/:id', (req, res) => {
    const { name, national_id, registration_hijri, teacher_id, memorized_at_registration } = req.body;
    db.query(
        'UPDATE students SET name=?, national_id=?, registration_hijri=?, teacher_id=?, memorized_at_registration=? WHERE id=?',
        [name, national_id, registration_hijri, teacher_id, memorized_at_registration, req.params.id],
        (err, result) => {
            if (err) return res.status(500).json({error: err});
            res.json({id: req.params.id, ...req.body});
        }
    );
});

// --- حذف طالب ---
app.delete('/api/students/:id', (req, res) => {
    db.query('DELETE FROM students WHERE id=?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({error: err});
        res.json({success: true});
    });
});

// --- معلمين ---
app.get('/api/teachers', (req, res) => {
    db.query('SELECT * FROM teachers', (err, results) => {
        if (err) return res.status(500).json({error: err});
        res.json(results);
    });
});

// --- متابعات الطالب ---
app.get('/api/followups/:student_id', (req, res) => {
    db.query('SELECT * FROM followups WHERE student_id=?', [req.params.student_id], (err, results) => {
        if (err) return res.status(500).json({error: err});
        res.json(results);
    });
});

app.post('/api/followups', (req, res) => {
    const {
        student_id, teacher_id, year_hijri, month_hijri, memorize_plan, from_surah, from_ayah, to_surah, to_ayah,
        memorize_faces, review_plan, review_faces, memorize_grade, tajweed_grade, result_grade,
        review_grade, review_tajweed_grade, review_result_grade
    } = req.body;
    db.query(
        `INSERT INTO followups
        (student_id, teacher_id, year_hijri, month_hijri, memorize_plan, from_surah, from_ayah, to_surah, to_ayah,
        memorize_faces, review_plan, review_faces, memorize_grade, tajweed_grade, result_grade,
        review_grade, review_tajweed_grade, review_result_grade)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            student_id, teacher_id, year_hijri, month_hijri, memorize_plan, from_surah, from_ayah, to_surah, to_ayah,
            memorize_faces, review_plan, review_faces, memorize_grade, tajweed_grade, result_grade,
            review_grade, review_tajweed_grade, review_result_grade
        ],
        (err, result) => {
            if (err) return res.status(500).json({error: err});
            res.json({id: result.insertId, ...req.body});
        }
    );
});

// --- تعديل متابعة شهرية ---
app.put('/api/followups/:id', (req, res) => {
    const {
        student_id, teacher_id, year_hijri, month_hijri, memorize_plan, from_surah, from_ayah, to_surah, to_ayah,
        memorize_faces, review_plan, review_faces, memorize_grade, tajweed_grade, result_grade,
        review_grade, review_tajweed_grade, review_result_grade
    } = req.body;
    db.query(
        `UPDATE followups SET
        student_id=?, teacher_id=?, year_hijri=?, month_hijri=?, memorize_plan=?, from_surah=?, from_ayah=?, to_surah=?, to_ayah=?,
        memorize_faces=?, review_plan=?, review_faces=?, memorize_grade=?, tajweed_grade=?, result_grade=?,
        review_grade=?, review_tajweed_grade=?, review_result_grade=?
        WHERE id=?`,
        [
            student_id, teacher_id, year_hijri, month_hijri, memorize_plan, from_surah, from_ayah, to_surah, to_ayah,
            memorize_faces, review_plan, review_faces, memorize_grade, tajweed_grade, result_grade,
            review_grade, review_tajweed_grade, review_result_grade, req.params.id
        ],
        (err, result) => {
            if (err) return res.status(500).json({error: err});
            res.json({id: req.params.id, ...req.body});
        }
    );
});

// --- حذف متابعة شهرية ---
app.delete('/api/followups/:id', (req, res) => {
    db.query('DELETE FROM followups WHERE id=?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({error: err});
        res.json({success: true});
    });
});

app.listen(3000, () => {
    console.log('API server running on http://localhost:3000');
});
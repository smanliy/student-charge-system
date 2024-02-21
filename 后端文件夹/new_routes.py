from fastapi import APIRouter, HTTPException
from models import Student
import pymysql
from database import get_db_connection
from typing import List

router = APIRouter()

# 分配职位给学生
@router.post("/students/")
def create_student(student_account: int, student: Student):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO students (position) VALUES (%s)",
                   (student.name, student.age, student.position, student.awards, student.account, student.pwd, student.department, student.periodNum))
    cursor.close()
    conn.close()
    return {"message": "Student added successfully"}
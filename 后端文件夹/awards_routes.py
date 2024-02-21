from fastapi import APIRouter, HTTPException
from models import AwardsInfo, Student
import pymysql
from database import get_db_connection
from typing import List

router = APIRouter()

#获取学生的获奖信息
@router.get("/students/awards/", response_model=List[AwardsInfo])
def read_student_awards():
    conn = get_db_connection()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute("SELECT * FROM awards")
    awards = cursor.fetchall()
    cursor.close()
    conn.close()
    return awards

#添加获奖信息及经历
@router.post("/students/awards/")
def create_awards(Students_awards: AwardsInfo):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO students (id,name, awards, experience) VALUES (%s, %s, %s, %s)",
                   (Students_awards.id,Students_awards.name, Students_awards.awards, Students_awards.experience))
    cursor.close()
    conn.close()
    return {"message": "Student's awards added successfully"}

#更新获奖信息
@router.put("/students/awards/{student_id}")
def update_awards(student_id: int, Students_awards: AwardsInfo):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE students SET name = %s, experience = %s, awards = %s WHERE id = %s",
                   (Students_awards.name, Students_awards.experience, Students_awards.awards, student_id))
    updated = cursor.rowcount
    cursor.close()
    conn.close()
    if updated == 0:
        raise HTTPException(status_code=404, detail="Student not found")
    return {"message": "Student's awards updated successfully"}

#删除获奖经历
@router.delete("/students/awards/{student_id}")
def delete_awards(student_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM students_awards WHERE id = %s", (student_id,))
    deleted = cursor.rowcount
    cursor.close()
    conn.close()
    if deleted == 0:
        raise HTTPException(status_code=404, detail="Student's awards not found")
    return {"message": "Student's awards deleted successfully"}

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